import Vue from "vue";
import VueRouter from "vue-router";
import EmptyRouterView from "../views/EmptyRouterView.vue";
import Blog from "../components/BlogPosts.vue";
import SingleBlogPost from "../components/SingleBlogPost.vue";
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
        path: ":id",
        name: "blog.oneBlog",
        components: {
          default: Blog,
          oneBlog: SingleBlogPost
        },
        props: true
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
