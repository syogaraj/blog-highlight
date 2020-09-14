<style lang="scss" scoped>
.blog {
  & > div {
    background: white;
    // padding-left: 5px;
    padding: 1rem 2rem;
  }

  #blogTime {
    font-size: 12px;
    margin-left: 3vw;
    margin-top: -20px;
    color: #938e8e;
  }
  .blogTitle {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;
    opacity: 1;
    visibility: visible;

    h3 {
      margin-top: -10px;
    }

    .v-avatar {
      top: 5px;
      box-shadow: #e7e7e7 0px 0px 1px 3p;
    }

    button span {
      top: 5px;
      background-color: #e7e7e7;
      border-radius: 50%;
      padding: 5px;
    }

    button:before {
      position: unset;
    }
  }

  .blogContent {
    margin-top: 10px;
    padding: 15px;
    background: #f8f8f8;
    border: #f8f8f8 solid 1px;
    border-radius: 10px;
  }
}
</style>

<template>
  <v-dialog
    content-class="blog"
    overlay
    v-model="dialog"
    width="40%"
    persistent
  >
    <div>
      <div class="blogTitle">
        <user-avatar-text :author="blogDetail.author"></user-avatar-text>
        <h3>{{ blogDetail.title }}</h3>
        <v-spacer />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              @click="
                $router.push({
                  name: 'blog.edit',
                  params: { id: blogDetail.id }
                })
              "
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>Edit this post</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              @click="deleteBlogPost(blogDetail.id)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Delete this post</span>
        </v-tooltip>
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <p id="blogTime">
        {{ blogDetail.author }} wrote on
        {{ getFormattedTime(blogDetail.createdOn) }}
      </p>
      <v-divider />
      <div class="blogContent" v-html="getContent(blogDetail.content)"></div>
    </div>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import UserAvatarText from "@/components/UserAvatarText.vue";
// import marked from "marked";
export default {
  components: {
    UserAvatarText: UserAvatarText
  },
  data() {
    return {
      dialog: true,
      blogID: this.$route.params.id
    };
  },
  computed: {
    ...mapGetters("blog", {
      getBlog: "getBlogPost",
      getFormattedTime: "getFormattedTime",
      getContent: "getMDContent"
    }),
    blogDetail() {
      return this.$store.getters["blog/getBlogPost"](this.blogID);
    }
  },
  methods: {
    deleteBlogPost(blogID) {
      let self = this;
      this.$store.dispatch("blog/deleteBlogPost", blogID);
      this.$nextTick(() => {
        self.$router.push({ name: "blog" });
      });
    }
  }
};
</script>
