import Vue from "vue";
import Vuex from "vuex";
import BlogState from "./modules/blog";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    blog: BlogState
  }
});
