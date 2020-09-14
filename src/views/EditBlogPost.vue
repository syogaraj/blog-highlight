<template>
  <div>
    <!-- {{edit}} -- {{blogID}} -->
    <create-blog-post
      :edit="edit"
      :blogID="blogID"
      @publish="updatePost(...arguments)"
      @discard="discardPost()"
    ></create-blog-post>
  </div>
</template>

<script>
import CreateBlogPost from "@/components/CreateBlogPost.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    CreateBlogPost: CreateBlogPost
  },
  data() {
    return {};
  },
  props: {
    blogID: {
      type: String,
      required: true
    },
    edit: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters("blog", {
      getBlog: "getBlogPost"
    })
  },
  methods: {
    updatePost(blogDetail) {
      console.log(blogDetail);
      this.$store
        .dispatch("blog/updateBlogPost", blogDetail)
        .then(() => {
          alert("Blog post updated"); // TODO: do this in a snackbar
        })
        .catch(() => {
          alert("Error! Blog post cannot be updated.");
        });
    },
    discardPost() {
      this.$store.dispatch("blog/fetchBlogPosts");
      this.$nextTick(function() {
        this.$router.push({ name: "blog" });
      });
    }
  },
  mounted() {
    console.log(this.blogID);
  }
};
</script>

<style></style>
