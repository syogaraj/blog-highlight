<template>
  <v-layout class="pa-10">
    <v-row dense style="max-width: 100%">
      <v-col cols="3" @click="$router.push({ name: 'blog.create' })">
        <v-card class="mx-auto mt-5" max-width="300" id="createBlogCard">
          <v-icon id="createBlogIcon">mdi-plus</v-icon>
          <v-subheader>Create a new post</v-subheader>
        </v-card>
      </v-col>
      <v-col
        cols="3"
        v-for="blog in blogPosts"
        :key="blog.id"
        @click="$router.push({ name: 'blog.oneBlog', params: { id: blog.id, details: blog } })"
      >
        <v-card hover class="mx-auto mt-5 blogPosts" max-width="300">
          <v-card-text>
            <p class="display-1 text--primary">{{ blog.title }}</p>
            <p>By {{ blog.author }}</p>
            <p>Posted on {{ postedTime(blog.createdOn) }}</p>
            <div>{{ ellipsed(blog.content) }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
/* eslint-disable prettier/prettier */
import { mapGetters } from "vuex";

export default {
    mounted() {
        this.$store.dispatch('blog/fetchBlogPosts');
    },
	computed: {
		...mapGetters("blog", {
			blogPosts: "getBlogPosts",
            ellipsed: "getEllipsedContent",
            postedTime: "getFormattedTime"
		})
	}
};
</script>

<style lang="scss" scoped>
#createBlogCard {
	background-color: aliceblue;

	#createBlogIcon {
		font-size: 12rem;
		display: flex;
	}

	.v-subheader {
		margin-left: 5rem;
		text-align: center;
	}
}

.blogPosts {
    min-height: calc(14rem + 5px);
    max-height: calc(14rem + 5px);
    text-overflow: ellipsis;
    // overflow: hidden;
    margin-top: 10px;
}
</style>
