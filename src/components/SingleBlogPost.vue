<template>
  <v-dialog overlay v-model="dialog" width="40%" persistent>
    <!-- {{ blogID }} -->
    <!-- {{ blogDetail }} -->
    <div class="blog">
      <div class="blogTitle">
        <v-list-item-avatar size="40" :color="color">
          <span class="white--text">{{
            getUserInitial(blogDetail.author)
          }}</span>
        </v-list-item-avatar>
        <h3>{{ blogDetail.title }}</h3>
        <v-spacer />
        <v-btn icon @click="$router.back()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <p id="blogTime">
        {{ blogDetail.author }} wrote on
        {{ getFormattedTime(blogDetail.createdOn) }}
      </p>
      <v-divider />
      <div class="blogContent">
        <!-- {{ blogDetail.content }} -->
        <p>{{ blogDetail.content }}</p>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialog: true,
      blogID: this.$route.params.id
      //   blogDetail: this.getBlog(this.blogID)
    };
  },
  computed: {
    ...mapGetters("blog", {
      getBlog: "getBlogPost",
      color: "getRandomColor",
      getUserInitial: "getUserInitial",
      getFormattedTime: "getFormattedTime"
    }),
    blogDetail() {
      console.log(this.$store.getters["blog/getBlogPost"]);
      return this.$store.getters["blog/getBlogPost"](this.blogID);
    }
  }
};
</script>

<style lang="scss" scoped>
.blog {
  padding: 10px;
  padding: 1rem 2rem;
  background: white;

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
    display: flex;
    margin-top: 10px;
    padding: 15px;
    background: #f8f8f8;
    border: #f8f8f8 solid 1px;
    border-radius: 10px;
    pre {
      max-width: 100%;
      overflow: auto;
      padding: 10px;
    }
    p {
      word-break: break-word;
      text-align: justify;
    }
  }
}
// .v-dialog--active {
//   padding: 1rem 2rem;
// }
</style>
