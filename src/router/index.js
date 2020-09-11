import Vue from "vue";
import VueRouter from "vue-router";
import EmptyRouterView from "../views/EmptyRouterView.vue";
import Blog from "../components/BlogPosts.vue";
import CreateBlog from "../components/CreateBlogPost.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/blog"
  },
  {
    path: "/blog",
    // name: "Home",
    component: EmptyRouterView,
    children: [
      {
        path: "/",
        name: "blog",
        component: Blog
      },
      {
        path: "create",
        name: "blog.create",
        components: {
          default: Blog,
          create: CreateBlog
        }
      },
      {
        path: "blog/:id",
        name: "blog.oneBlog",
        component: Blog
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
