<style lang="scss" scoped>
.highlight {
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
  .searchTitle {
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

  #highlighter {
    position: absolute;
    padding: 0px;
    width: 2vw;
    background: #208d20;
    border-radius: 50%;
    opacity: 0.9;

    & > button {
      color: white;
    }
  }

  span.highlighted {
    font-weight: bold;
    color: red;
    background: bisque;
  }
}
</style>

<template>
  <v-dialog
    content-class="highlight"
    overlay
    v-model="dialog"
    width="40%"
    persistent
  >
    <div>
      <div class="searchTitle">
        <!-- {{ searchText }} -->
        <h3>Search results for {{ searchText }}</h3>
        <v-spacer />
        <v-btn @click="$router.go(-1)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <v-divider />
      <div
        v-for="item in blogSearchContents"
        :key="item.id"
        @click="$router.push({ name: 'blog.oneBlog', params: { id: item.id } })"
      >
        <v-list-item>
          <v-list-item-content>
            <p v-html="item.meta"></p>
          </v-list-item-content>
          <user-avatar-text :author="item.author"></user-avatar-text>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </div>
  </v-dialog>
</template>

<script>
// import { mapGetters } from "vuex";
import UserAvatarText from "@/components/UserAvatarText.vue";
export default {
  components: {
    UserAvatarText: UserAvatarText
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: true
    };
  },
  computed: {
    blogSearchContents() {
      //   return [
      //     {
      //       id: "",
      //       meta:
      //         "lorem eipselfmskl fskefn sknskej fnsekfn sefn skfnsekfn sekfneskfnsefkjsenfksenfksefnefngns ksenfesknf <span class='highlighted'>text</span>",
      //       author: "me"
      //     },
      //     {
      //       id: "sefse",
      //       meta:
      //         "lorem eipselfmskl <span class='highlighted'>text</span> fskefn sknskej fnsekfn sefn skfnsekfn sekfneskfnsefkjsenfksenfksefnefngns ksenfesknf <span class='highlight'>text</span>",
      //       author: "me"
      //     }
      //   ];
      return this.$store.getters["blog/getSnippedContent"](this.searchText);
    }
  }
};
</script>
