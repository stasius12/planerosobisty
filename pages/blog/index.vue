<template>
  <main>
    <div class="container flex flex-col md:flex-row mt-8 mb-3">
      <div class="flex items-center w-full mt-2 md:mr-4">
        <h1 class="mb-0 top-1 relative text-gray-300">Blog</h1>
        <div class="border-b-1 border-gray-300 w-full ml-4" />
      </div>
      <!-- delete -->
      <validation-observer
        class="flex items-center mt-2 h-11 md:h-auto"
        tag="form"
        @submit.prevent="performSearch"
      >
        <input
          v-model="search"
          name="search"
          type="text"
          placeholder="Czego szukasz?"
          class="border-1 border-gray-300 text-gray-300 mr-4 p-2 outline-none w-full md:w-auto h-full"
        />
        <button class="button bg-gray-300 h-full">Szukaj</button>
      </validation-observer>
    </div>
    <section class="container">
      <article v-for="blog in blogs" :key="blog.slug" class="py-4">
        <nuxt-link
          :to="{ name: 'blog-slug', params: { slug: blog.slug } }"
          class="flex flex-col md:flex-row items-center bg-gray-100 md:bg-transparent lg:bg-gray-100"
        >
          <img
            :src="blog.thumbnail"
            :alt="blog.title"
            class="max-w-full md:max-w-sm"
          />
          <div class="flex flex-col p-4">
            <h2 class="text-center text-3xl">{{ blog.title }}</h2>
            <p class="text-center block text-black mb-0">
              {{ blog.description }}
            </p>
          </div>
        </nuxt-link>
      </article>
    </section>
  </main>
</template>

<script>
import { ValidationObserver } from 'vee-validate'

export default {
  name: 'Blog',
  components: { ValidationObserver },
  async asyncData({ $content, query }) {
    const search = query.search || ''
    const blogs = await $content('blog').search(search).fetch()

    return {
      search,
      blogs,
    }
  },
  methods: {
    async performSearch() {
      this.blogs = await this.$content('blog').search(this.search).fetch()
      await this.$router.push({
        path: this.$route.path,
        query: { search: this.search },
      })
    },
  },
}
</script>
