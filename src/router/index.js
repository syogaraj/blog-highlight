import Vue from "vue";
import VueRouter from "vue-router";
import EmptyRouterView from "../views/EmptyRouterView.vue";
import Blog from "../components/BlogPosts.vue";
import SingleBlogPost from "../components/SingleBlogPost.vue";
import NewBlogPost from "../views/NewBlogPost.vue";
import EditBlogPost from "../views/EditBlogPost.vue";
import BlogSearch from "../views/SearchHighlight.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/blog"
  },
  {
    path: "/blog",
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
          create: NewBlogPost
        }
      },
      {
        path: ":id",
        name: "blog.oneBlog",
        components: {
          default: Blog,
          oneBlog: SingleBlogPost
        }
      },
      {
        path: "edit/:id",
        name: "blog.edit",
        components: {
          default: Blog,
          edit: EditBlogPost
        },
        props: {
          default: {},
          edit: route => ({ edit: true, blogID: `${route.params.id}` })
        }
      },
      {
        path: "search/:text",
        name: "blog.search",
        components: {
          default: Blog,
          search: BlogSearch
        },
        props: {
          default: "",
          search: route => ({ searchText: `${route.params.text}`})
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
