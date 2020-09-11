<template>
  <!-- <div> -->
  <v-dialog overlay v-model="dialog" width="40%" persistent>
    <v-form ref="form" v-model="valid" @submit.prevent="submitHandler">
      <v-text-field
        :rules="nameRules"
        prepend-icon="mdi-format-quote-open"
        v-model="blogPost.title"
        label="Give your post a title!"
      ></v-text-field>
      <v-text-field
        :rules="nameRules"
        prepend-icon="mdi-account"
        v-model="blogPost.author"
        label="Author"
      ></v-text-field>
      <v-textarea
        :rules="nameRules"
        prepend-icon="mdi-comment"
        v-model="blogPost.content"
        label="Your content goes here..."
      ></v-textarea>

      <v-row>
        <v-col class="text-center" cols="6">
          <v-btn type="submit" color="primary">Make post</v-btn>
        </v-col>
        <v-col class="text-center" cols="6">
          <v-btn color="error" @click="$router.back()">Discard</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-dialog>
  <!-- </div> -->
</template>

<script>
/* eslint-disable prettier/prettier */
export default {
	data() {
		return {
            dialog: true,
            valid: true,
			blogPost: {
				title: "",
				author: "",
				content: ""
			},
			nameRules: [
				v => !!v || "This field is required",
			]
		};
    },
    methods: {
        createBlogPost(){
            console.log(this.blogPost);
        },
        submitHandler(){ 
            let self = this
            setTimeout(function () {
                if (self.$refs.form.validate()){
                    self.$store.dispatch('blog/createBlogPost', self.blogPost);
                    self.$nextTick(() => {
                        self.$router.push({"name": "blog"})
                    });
                }
            })
        }
    }
};
</script>

<style lang="scss" scoped>
.v-dialog--active {
	padding: 1rem 2rem;
    background-color: floralwhite;
}
</style>