<template>
  <create-blog
    @publish="createBlogPost(...arguments)"
    @discard="discardPost()"
  ></create-blog>
</template>

<script>
import CreateBlogPost from "@/components/CreateBlogPost.vue";
export default {
  components: {
    CreateBlog: CreateBlogPost
  },
  methods: {
    createBlogPost(blogPost) {
      this.$store.dispatch("blog/createBlogPost", blogPost);
      this.$nextTick(() => {
        this.$router.push({ name: "blog" });
      });
    },
    discardPost() {
      let confirmDiscard = confirm(
        "Are you sure you want to discard this post?"
      );
      if (confirmDiscard) {
        this.$router.push({ name: "blog" });
      }
    }
  }
};
</script>

<style></style>
