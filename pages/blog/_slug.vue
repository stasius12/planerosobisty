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
    <section class="container blog-content py-12">
      <nuxt-content :document="blog" class="blog-content__inner" />
    </section>
  </main>
</template>

<script>
export default {
  transition: {
    name: 'slide-fade',
  },
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

  :not(h2):not(h3):not(h4) > strong {
    font-weight: 500;
  }

  h2 {
    margin-bottom: 1rem;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  h4 {
    margin-bottom: 0.4rem;
  }

  p,
  ul,
  ol,
  blockquote {
    margin-bottom: 1.8rem;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  * + h2 {
    margin-top: 2.5rem;
  }
  * + h3 {
    margin-top: 1.8rem;
  }
  * + h4 {
    margin-top: 1rem;
  }

  p + ul,
  p + ol,
  p + .list-style-arrow + ul {
    margin-top: -1.7rem;
  }

  ul,
  ol {
    padding-left: 2rem;
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

      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;

      font-family: 'icomoon';
      font-size: 0.8rem;
      content: '\e900';
      background-color: $primary;
    }
  }
}
</style>
