<template>
  <v-list-item-avatar :size="size" :color="color">
    <span class="white--text">{{ getUserInitial(author) }}</span>
  </v-list-item-avatar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    author: {
      type: String,
      required: true,
      default: ""
    },
    size: {
      type: Number,
      default: 40
    },
    color: {
      type: String,
      default: "#848484"
    }
  },
  computed: {
    ...mapGetters("blog", {
      getUserInitial: "getUserInitial"
    })
  }
};
</script>

<style></style>
