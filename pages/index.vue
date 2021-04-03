<template>
  <div class="container">
    <div>
      <div v-for="blog in blogs" :key="blog.id">
        <nuxt-link :to="{ name: 'blog-slug', params: { slug: blog.slug } }">
          {{ blog.title }}</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const blogs = await $content('blog').fetch()
    return {
      blogs,
    }
  },
}
</script>

<style></style>
