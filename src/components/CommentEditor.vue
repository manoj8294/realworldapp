<template>
  <div>
    <list-errors :errors="errors"> </list-errors>
    <form
      class="card comment-form"
      v-on:submit.prevent="onSubmit(slug, comment);"
    >
      <div class="card-block">
        <textarea
          class="form-control"
          v-model="comment"
          placeholder="Write a comment..."
          rows="3"
        >
        </textarea>
      </div>
      <div class="card-footer">
        <img :src="userImage" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
  </div>
</template>

<script>
import ListErrors from "@/components/ListErrors";
import { createComment } from "@/store/actions.type";

export default {
  name: "CommentEditor",
  components: { ListErrors },
  props: {
    slug: { type: String, required: true },
    content: { type: String, required: false },
    userImage: { type: String, required: false }
  },
  data() {
    return {
      comment: this.content || null,
      errors: {}
    };
  },
  methods: {
    onSubmit(slug, comment) {
      this.$store
        .dispatch(createComment, { slug, comment })
        .then(() => {
          this.comment = null;
          this.errors = {};
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    }
  }
};
</script>
