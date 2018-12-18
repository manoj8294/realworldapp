<template>
  <!-- Used when user is also author -->
  <span v-if="canModify">
    <router-link
      class="btn btn-sm btn-outline-secondary"
      :to="{ name: 'article-edit', params: { slug: this.article.slug } }"
    >
      <i class="ion-edit"></i><span>&nbsp;Edit Article</span>
    </router-link>
    <span>&nbsp;&nbsp;</span>
    <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
      <i class="ion-trash-a"></i><span>&nbsp;Delete Article</span>
    </button>
  </span>
  <!-- Used in ArticleView when not author -->
  <span v-else>
    <button class="btn btn-sm btn-outline-secondary" @click="toggleFollow">
      <i class="ion-plus-round"></i> <span>&nbsp;</span>
      <span
        >{{ profile.following ? "Unfollow" : "Follow" }}
        {{ article.author.username }}</span
      >
    </button>
    <span>&nbsp;&nbsp;</span>
    <button
      class="btn btn-sm"
      @click="toggleFavorite"
      :class="{
        'btn-primary': article.favorited,
        'btn-outline-primary': !article.favorited
      }"
    >
      <i class="ion-heart"></i><span>&nbsp;</span>
      <span>
        {{ article.favorited ? "Unfavorite Article" : "Favorite Article" }}
      </span>
      <span class="counter"> ({{ article.favoritesCount }}) </span>
    </button>
  </span>
</template>

<script>
import { mapGetters } from "vuex";
import {
  addFavoriteArticle,
  removeFavoriteArticle,
  deleteArticle,
  fetchProfileFollow,
  fetchProfileFollowUnFollow
} from "@/store/actions.type";

export default {
  name: "RwvArticleActions",
  props: {
    article: { type: Object, required: true },
    canModify: { type: Boolean, required: true }
  },
  computed: {
    ...mapGetters(["profile", "isAuthenticated"])
  },
  methods: {
    toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action = this.article.favorited ? removeFavoriteArticle : addFavoriteArticle;
      this.$store.dispatch(action, this.article.slug);
    },
    toggleFollow() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: "login" });
        return;
      }
      const action = this.article.following
        ? fetchProfileFollowUnFollow
        : fetchProfileFollow;
      this.$store.dispatch(action, {
        username: this.profile.username
      });
    },
    async deleteArticle() {
      try {
        await this.$store.dispatch(deleteArticle, this.article.slug);
        this.$router.push("/");
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>
