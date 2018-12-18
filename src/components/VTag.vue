<template>
  <router-link
    :to="{ name: 'home-tag', params: { tag: name } }"
    :class="className"
  >
    {{ name }}
  </router-link>
</template>

<script>
export default {
  name: "Tag",
  props: {
    name: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: "tag-pill tag-default"
    }
  }
};
</script>
