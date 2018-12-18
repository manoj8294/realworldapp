<template>
  <div class="home-my-feed"><ArticleList type="feed" /></div>
</template>

<script>
import ArticleList from "@/components/ArticleList";

export default {
  name: "MyFeed",
  components: {
    ArticleList
  }
};
</script>
