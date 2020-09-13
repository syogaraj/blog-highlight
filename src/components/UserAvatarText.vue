<template>
  <v-list-item-avatar :size="size" :color="color">
    <span class="white--text" id="userInitial">{{
      getUserInitial(author)
    }}</span>
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

<style lang="scss" scoped>
#userInitial {
  margin-left: 0.8rem;
}
</style>
