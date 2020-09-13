/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import * as fb from '@/firebase'
import marked from "marked";
const state = {
    blogPosts: []
}


const getters = {
    getBlogPosts: state => {
        return state.blogPosts
    },

    getBlogPost: state => (blogID) => {
        return state.blogPosts.filter(blog => {
            return blog.id == blogID
        })[0];
    },

    getUserInitial: () => (userName) => {
        let userNameSplit = userName.split(' ')
        if (userNameSplit.length > 1) {
            return userNameSplit[0].charAt(0).toUpperCase() + userNameSplit[1].charAt(0).toUpperCase();
        }
        return userName.charAt(0).toUpperCase();
    },

    getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
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
    },

    getMDContent: () => (content) => {
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false
        });
        return marked(content)
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