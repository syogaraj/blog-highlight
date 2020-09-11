/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import * as fb from '@/firebase'
const state = {
    blogPosts: []
}


const getters = {
    getBlogPosts: state => {
        return state.blogPosts
    },

    getEllipsedContent: () => (content) => {
        console.log(content);
        content = content || "";
        let continuationSuffix = (content.length > 100) ? '...' : ""
        return content.substring(0, 100) + continuationSuffix;
    },

    getFormattedTime: () => (createdOn) => {
        let date = new Date(createdOn.seconds*1000);
        return date.toLocaleDateString();
    }

}

const actions = {
    async fetchBlogPosts({ commit }) {
        await fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
            let blogPosts = [];
            snapshot.forEach(blog => {
                let post = blog.data();
                post.id = blog.id;
                blogPosts.push(post);
            });
            commit('setBlogPosts', blogPosts);
        })
    },

    async createBlogPost({ state, dispatch, commit }, blogPost) {
        await fb.postsCollection.add({
            createdOn: new Date(),
            title: blogPost.title,
            author: blogPost.author,
            content: blogPost.content,
        })
        dispatch("fetchBlogPosts");
    }
}

const mutations = {
    setBlogPosts(state, blogPosts) {
        console.log(blogPosts);
        state.blogPosts = blogPosts;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}