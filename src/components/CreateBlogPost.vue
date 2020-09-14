<style lang="scss" scoped>
.createDialog {
  &.v-dialog--active {
    background: white;
  }

  .v-toolbar {
    box-shadow: none;
    border-bottom: 1px solid #847e7e;
  }

  #form {
    background: white;
    padding: 1rem 2rem;
  }

  .ck-content {
    height: 45vh;
  }

  #editor {
    border: 1px solid #cfcfcf;
    border-radius: 5px;
    // margin-left: 1rem;
  }

  #blogPreview {
    border: 1px solid #cfcfcf;
    // max-height: 39vh;
    height: 91%;
    overflow: auto;
    margin-top: 10px;
    border-radius: 5px;
    padding: 10px;
  }

  #contentPreviewHeader {
    color: #847e7e;
  }

  .authorInput {
    align-items: center;
    justify-content: center;
  }
}
</style>

<template>
  <div>
    <v-dialog overlay v-model="dialog" content-class="createDialog" persistent>
      <v-toolbar>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap class="mt-12">
            <v-flex xs3>
              <v-text-field
                :rules="nameRules"
                prepend-icon="mdi-format-quote-open"
                v-model="blogPost.title"
                label="My Post Title"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-spacer />
        <v-icon @click="$emit('discard')">mdi-close</v-icon>
      </v-toolbar>
      <v-form
        id="form"
        ref="form"
        v-model="valid"
        @submit.prevent="submitHandler"
      >
        <v-row>
          <v-col cols="12">
            <ckeditor
              ref="editor"
              :editor="editor"
              v-model="blogPost.content"
              :config="editorConfig"
              id="editor"
            ></ckeditor>
          </v-col>
        </v-row>

        <v-layout row wrap class="authorInput">
          <v-flex xs3>
            <v-text-field
              :rules="nameRules"
              label="Penned by"
              v-model="blogPost.author"
            ></v-text-field>
          </v-flex>
          <v-flex xs1 class="text-center mt-3">
            <v-btn type="submit" color="primary">{{ publishString }}</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
/* eslint-disable prettier/prettier */
import { mapGetters } from "vuex";
import CKEditor from "@ckeditor/ckeditor5-vue";
import InlineEditor from "@ckeditor/ckeditor5-editor-inline/src/inlineeditor";
import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import BlockQuotePlugin from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Markdown from "@ckeditor/ckeditor5-markdown-gfm/src/markdown";
import ListStyle from "@ckeditor/ckeditor5-list/src/liststyle";

export default {
	components: {
		ckeditor: CKEditor.component
	},
	props: {
		edit: {
			type: Boolean,
			default: false
    },
    blogID: {
      type: String,
      default: ""
    }
	},
	data() {
		return {
			dialog: true,
      valid: true,
      publishString: "Publish",
			blogPost: {
				title: "",
				author: "",
				content: "**My awesome content here**.."
			},
			nameRules: [v => !!v || "This field is required"],
			editor: InlineEditor,
			editorConfig: {
				startupFocus: true,
				plugins: [
					EssentialsPlugin,
					BoldPlugin,
					ItalicPlugin,
					ParagraphPlugin,
					BlockQuotePlugin,
					Markdown,
					ListStyle
				],
				toolbar: {
					items: [
						"bold",
						"italic",
						"undo",
						"redo",
						"blockquote",
						"bulletedList",
						"numberedList"
					]
				}
			}
		};
	},
	methods: {
		submitHandler() {
			let self = this;
			setTimeout(function() {
				if (self.$refs.form.validate()) {
          self.$emit('publish', self.blogPost);
				}
			});
		}
	},
	computed: {
		...mapGetters("blog", {
      content: "getMDContent",
      getBlog: "getBlogPost"
		}),
	},
	created() {
    console.log(this.blogID);
    if(this.edit) {
      this.blogPost = JSON.parse(JSON.stringify(this.getBlog(this.blogID)));
      this.publishString = "Update post";
    }
	}
};
</script>

