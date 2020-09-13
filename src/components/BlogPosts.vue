<template>
  <v-layout class="pa-10">
    <v-card class="mx-auto  elevation-5" tile id="blogList">
      <v-toolbar>
        <v-toolbar-title>Blog Posts</v-toolbar-title>
        <v-spacer></v-spacer>
        <div id="addBlog">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                @click="
                  $router.push({
                    name: 'blog.create'
                  })
                "
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-plus-circle</v-icon>
              </v-btn>
            </template>
            <span>Create a new blog post!</span>
          </v-tooltip>
          <!-- <v-icon>mdi-plus-circle</v-icon> -->
        </div>
      </v-toolbar>
      <v-divider></v-divider>
      <div id="listItem">
        <div
          v-for="blog in blogPosts"
          :key="blog.id"
          @click="
            $router.push({
              name: 'blog.oneBlog',
              params: { id: blog.id }
            })
          "
        >
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>
                <a>{{ blog.title }}</a></v-list-item-title
              >
              <v-list-item-subtitle>By {{ blog.author }}</v-list-item-subtitle>
            </v-list-item-content>
            <user-avatar-text :author="blog.author"></user-avatar-text>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </div>
    </v-card>

    <!-- <v-row dense style="max-width: 100%">
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
        @click="
          $router.push({
            name: 'blog.oneBlog',
            params: { id: blog.id, details: blog }
          })
        "
      >
        <v-card hover class="mx-auto mt-5 blogPosts" max-width="300">
          <v-card-text>
            <p class="display-1 text--primary">{{ blog.title }}</p>
            <p>By {{ blog.author }}</p>
            <p>Posted on {{ postedTime(blog.createdOn) }}</p>
            <div v-html="ellipsed(getContent(blog.content))"></div>
          </v-card-text>
        </v-card>
      </v-col>
		</v-row>-->
  </v-layout>
</template>

<script>
/* eslint-disable prettier/prettier */
import { mapGetters } from "vuex";
import UserAvatarText from "./UserAvatarText.vue";

export default {
	mounted() {
		this.$store.dispatch("blog/fetchBlogPosts");
    },
    components: {
        UserAvatarText: UserAvatarText
    },
	computed: {
		...mapGetters("blog", {
			blogPosts: "getBlogPosts",
			ellipsed: "getEllipsedContent",
			postedTime: "getFormattedTime",
			getContent: "getMDContent"
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

#blogList {
	width: 80%;

	.v-toolbar {
		box-shadow: none;
        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-weight: bolder;

        #addBlog {
            margin-right: 10px;

            i {
                color: #3c8b3c;
                // right: 20px;
                font-size:30px;
            }
        }
	}

    #listItem {
        max-height: 80vh;
        overflow: auto;
    }

	.v-list-item {
        font-family: 'Verdana', 'Geneva', 'Tahoma', 'sans-serif';
        
		&:hover {
			background: #f1f1f1;
			cursor: pointer;
            font-weight: bold;
            color: #353535;
		}

        .v-list-item__title {
            a {
                color: black;
                text-decoration: none; 
            }
        }
	}
}
</style>
