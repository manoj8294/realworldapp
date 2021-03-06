<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ListErrors :errors="errors" />
          <form v-on:submit.prevent="onPublish(article.slug);">
            <fieldset :disabled="inProgress">
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="article.title"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="article.description"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  v-model="article.body"
                  placeholder="Write your article (in markdown)"
                >
                </textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tagInput"
                  v-on:keypress.enter.prevent="addTag(tagInput);"
                />
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="(tag, index) of article.tagList"
                    :key="tag + index"
                  >
                    <i class="ion-close-round" v-on:click="removeTag(tag);">
                    </i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
            </fieldset>
            <button
              :disabled="inProgress"
              class="btn btn-lg pull-xs-right btn-primary"
              type="submit"
            >
              Publish Article
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { mapGetters } from "vuex";
import store from "@/store";
import ListErrors from "@/components/ListErrors";
import {
  publishArticle,
  editArticle,
  fetchArticle,
  editArticleAddTag,
  editArticleRemoveTag,
  resetArticleState
} from "@/store/actions.type";

export default {
  name: "ArticleEdit",
  components: { ListErrors },
  props: {
    previousArticle: {
      type: Object,
      required: false
    }
  },
  async beforeRouteUpdate(to, from, next) {
    await store.dispatch(resetArticleState);
    return next();
  },
  async beforeRouteEnter(to, from, next) {
    await store.dispatch(resetArticleState);
    if (to.params.slug !== undefined) {
      await store.dispatch(
        fetchArticle,
        to.params.slug,
        to.params.previousArticle
      );
    }
    return next();
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch(resetArticleState);
    next();
  },
  data() {
    return {
      tagInput: null,
      inProgress: false,
      errors: {}
    };
  },
  computed: {
    ...mapGetters(["article"])
  },
  methods: {
    onPublish(slug) {
      let action = slug ? editArticle : publishArticle;
      this.inProgress = true;
      this.$store
        .dispatch(action)
        .then(({ data }) => {
          this.inProgress = false;
          this.$router.push({
            name: "article",
            params: { slug: data.article.slug }
          });
        })
        .catch(({ response }) => {
          this.inProgress = false;
          this.errors = response.data.errors;
        });
    },
    removeTag(tag) {
      this.$store.dispatch(editArticleRemoveTag, tag);
    },
    addTag(tag) {
      this.$store.dispatch(editArticleAddTag, tag);
      this.tagInput = null;
    }
  }
};
</script>
