<template>
  <search-word :search-text="searchText"></search-word>
</template>

<script>
import SearchWord from "@/components/SearchWord.vue";
export default {
  components: {
    SearchWord: SearchWord
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  }
};
</script>

<style></style>
