<template>
  <div>
    
  </div>
</template>

<script>
/* eslint-disable prettier/prettier */
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("blog", {
        blogPosts: "getBlogPosts",
    })
  }
};
</script>

<style></style>
