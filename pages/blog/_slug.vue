<template>
  <div class="blog-container">
    <div class="blog-header">
      <div class="blog-header__left">
        <div class="blog-header__left-item">
          <nuxt-link :to="{ name: 'index' }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 4" aria-hidden="true" style="width: 16px; transform: rotate(180deg);">
              <polygon fill="currentColor" points="0 2.33 4.72 2.33 3.53 3.53 4 4 6 2 4 0 3.53 0.47 4.72 1.67 0 1.67 0 2.33"/>
            </svg>
            Wróć
          </nuxt-link>
        </div>
        <div class="blog-header__left-item">
          {{ $moment(blog.date).format('LL') }}
          <h1>{{ blog.title }}</h1>
          {{ blog.description }}
        </div>
      </div>
      <div class="blog-header__right">
        <img src="~/assets/images/blog/kolo-zycia/_main.jpg" />
      </div>
    </div>
    <nuxt-content
      :document="blog"
      class="container small blog-content"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const blog = await $content('blog', params.slug).fetch()
    return {
      blog,
    }
  },
}
</script>

<style lang="scss">
.blog-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 500px;

  h1 {
    color: $secondary;
  }

  &__left {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 500px;
    padding: 2.4rem 4rem 2.4rem 2.4rem;
  }
  &__left-item {
    max-width: 500px;
    width: 100%;
    margin-left: auto;
    margin-bottom: auto;
  }
  &__right {
    width: 100%;
    img {
      max-width: 100%;
    }
  }
}
.blog-content {
  max-width: 700px;
  p {
    font-size: 1.7rem;
    color: $grey-1;
  }
}
</style>
