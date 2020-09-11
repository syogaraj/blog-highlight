/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
const state = {
    blogPosts: []
}


const getters = {
    
}

const actions = {
    fetchBlogPosts({commit}) {

    },

    createBlog({state, dispatch, commit}, blog) {

    }
}

const mutations = {
    setBlogPosts(state, blogPosts) {
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