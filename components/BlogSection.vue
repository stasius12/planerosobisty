<template>
  <div class="container-lg">
    <div class="blog-list">
      <div v-for="blog in blogs" :key="blog.id" class="blog-list__item">
        <nuxt-link :to="{ name: 'blog-slug', params: { slug: blog.slug } }">
          <img :src="blog.thumbnail" width="1920" height="1080" />
          <h2>{{ blog.title }}</h2>
          <p>{{ blog.description }}</p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogSection',
  props: {
    blogs: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss">
.blog-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 40px;

  &__item {
    a {
      color: #767676;
    }
    p {
      margin-bottom: 0;
    }
  }
}
</style>
