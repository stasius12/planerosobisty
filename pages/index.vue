<template>
  <main class="home_page">
    <img class="home_page__img" src="~assets/images/main.png" />
<!--    <div class="home_page__circle">-->
<!--      <img class="home_page__circle__img" src="~assets/images/beauty-script/home-page-quote.png" />-->
<!--      <div class="home_page__circle__text">-->
<!--        <p>Moją misją jest pomóc Ci stworzyć mapę do celu.</p>-->
<!--        <p><b>Ścieżkę wybierasz sam.</b></p>-->
<!--      </div>-->
<!--    </div>-->
    <about-me-section class="home_page__section"></about-me-section>
    <blog-section :blogs="blogs" class="home_page__section" id="blogs"></blog-section>
  </main>
</template>

<script>
import HeaderSection from '@/components/HeaderSection'
import BlogSection from '@/components/BlogSection'
import AboutMeSection from '@/components/AboutMeSection'
export default {
  components: { AboutMeSection, BlogSection },
  async asyncData({ $content }) {
    const blogs = await $content('blog').fetch()
    return {
      blogs,
    }
  },

  transition: {
    name: 'slide-fade'
  },
}
</script>


<style lang="scss">
$circle-radius: 25vw;

.home_page {
  scroll-behavior: smooth;
  //scroll-snap-type: y mandatory;
  margin-top: -$header-height;

  &__section {
    margin-top: 5rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
    scroll-snap-align: start;
  }

  &__img {
    //object-fit: cover;
    height: auto;
    width: 100%;

    @media (max-width: $screen-xs) {
      object-fit: cover;
      height: 40vh;
    }
  }

  &__circle {
    position: absolute;
    top: 0;
    left: calc(50% - #{$circle-radius});
    width: 2 * $circle-radius;
    height: 2 * $circle-radius;
    background: yellow;
    border-radius: 50%;

    &__img {
      position: absolute;
      top: 30%;
    }

    &__text {
      position: absolute;
      font-family: 'Bebas Neue', Arial, sans-serif;
      font-size: 3.5rem;
      color: black;
      top: 60%;
      text-align: center;
      width: 100%;
      > * {
        margin: 0;
      }
    }
  }
}
</style>
