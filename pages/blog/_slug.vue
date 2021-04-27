<template>
  <main class="blog-container">
    <section class="blog-header">
      <div class="blog-header__text">
        <time :datetime="$moment(blog.date).format('YYYY-MM-DD')">
          {{ $moment(blog.date).format('LL') }}
        </time>
        <h1>{{ blog.title }}</h1>
      </div>
      <div class="blog-header__img">
        <img :src="blog.thumbnail" />
      </div>
    </section>
    <section class="container blog-content">
      <nuxt-content
        :document="blog"
        class="blog-content__inner"
      />
    </section>
  </main>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const blog = await $content('blog', params.slug).fetch()
    return {
      blog,
    }
  },
  transition: {
    name: 'slide-fade'
  },
}
</script>

<style lang="scss">
.blog-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;

  @media (min-width: $screen-md) {
    flex-direction: row;
  }

  h1 {
    color: $secondary;
  }

  &__text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 2.4rem 4rem 2.4rem 2.4rem;

    > * {
      max-width: 500px;
      width: 100%;
      margin-bottom: 2rem;
    }
  }

  &__img {
    width: 100%;
    img {
      max-width: 100%;
    }
  }
}
.blog-content {
  padding-bottom: 7.2rem;

  &__inner {
    > * {
      margin-left: auto;
      margin-right: auto;
      max-width: 800px;
      display: block;
    }
  }
  a {
    text-decoration: underline;
    color: $blog-link-color;

    &:hover,
    &.active,
    &:focus,
    .nuxt-link-active {
      outline: 0;
      color: darken($blog-link-color, 20%);
    }
  }

  p + ul,
  p + ol,
  p + .list-style-arrow + ul {
    margin-top: -1.7rem;
  }

  ul, ol {
    padding-left: 4rem;
  }

  ul ul,
  ol ul {
    list-style-type: disc;
  }

  .list-style-arrow + ul > li {
    list-style: none;
    position: relative;

    &:before {
      position: absolute;
      left: -4rem;
      top: 0;
      width: 2.7rem;
      height: 2.7rem;
      //padding-top: 0.2rem;

      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;

      font-family: "icomoon";
      font-size: 1.5rem;
      content: "\e900";
      background-color: $primary;
    }
  }
}
</style>
