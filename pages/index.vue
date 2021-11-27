<template>
  <main class="home-page">
    <section class="container-lg hero">
      <div class="hero__quote">
        <blockquote class="font-handwrite">
          "Ludzie, którzy mają cele, odnoszą sukcesy, ponieważ wiedzą, dokąd
          zmierzają."
        </blockquote>
        <cite class="font-primary font-style-normal">EARL NIGHTINGALE</cite>
      </div>
      <div class="hero__main">
        <img
          class="hero__main__img"
          src="~assets/images/Natalkabeztla.png"
          alt="Natalia Włodarska"
        />
        <div class="hero__main__text font-primary">
          <p>Moją misją jest pomóc Ci stworzyć mapę do celu.</p>
          <p>Ścieżkę wybierasz sam.</p>
        </div>
      </div>
    </section>
    <section class="container intro">
      <h2 class="font-handwrite font-weight-normal">
        Cześć! Jestem Natalia :)
      </h2>
      <p>
        Wierzę, że
        <span class="font-weight-bold">mając odpowiednie narzędzia</span>, każdy
        z nas może zaprojektować swoje życie tak jak zechce.
      </p>
      <p>Istnieją 3 filary, które determinują nasz sukces w tym zakresie.</p>
      <ol class="list-none font-primary">
        <li>1. Samoświadomość</li>
        <li>2. Planowanie</li>
        <li>3. Produktywność</li>
      </ol>
      <p>
        Każdy z nich jest
        <span class="font-weight-bold">nieodzownym</span> elementem
        projektowania własnej rzeczywistości.
      </p>
      <p>
        Stworzyłam to miejsce, aby podzielić się z tobą swoją wiedzą i
        doświadczeniem. Treści i narzędzia, które tu znajdziesz, pomogą Ci
        <span class="font-weight-bold">świadomie i skutecznie</span> tworzyć
        własną mapę do celu i w konsekwencji, spełniać swoje marzenia.
      </p>
    </section>
    <section class="container-lg newest-blogs">
      <header>
        <h2 class="text-center">Najnowsze artykuły</h2>
      </header>
      <div class="newest-blogs__list">
        <article v-for="blog in blogs.slice(0, 3)" :key="blog.slug">
          <nuxt-link :to="{ name: 'blog-slug', params: { slug: blog.slug } }">
            <img :src="blog.thumbnail" :alt="blog.title" />
            <h3 class="text-center">{{ blog.title }}</h3>
          </nuxt-link>
        </article>
      </div>
      <footer>
        <nuxt-link class="font-primary button button-large" to="/"
          >Zobacz więcej postów</nuxt-link
        >
      </footer>
    </section>
    <section class="newsletter">
      <div class="container-lg">
        <h2>ZAPISZ SIĘ DO DARMOWEGO NEWSLETTERA JEŚLI CHCESZ:</h2>
        <ol>
          <li>
            <span class="font-weight-bold"
              >Świadomie tworzyć własną rzeczywistość</span
            >
          </li>
          <li>
            Nauczyć się
            <span class="font-weight-bold">skutecznie planować</span> swoje
            działania
          </li>
          <li>
            Być <span class="font-weight-bold">efektywnym</span> jak nigdy dotąd
          </li>
          <li>
            <span class="font-weight-bold">Otrzymać bonusowego ebooka</span>
          </li>
        </ol>
        <client-only>
          <mailchimp-signup></mailchimp-signup>
        </client-only>
      </div>
    </section>
    <section class="social">
      <div class="social__container container-lg">
        <h2 class="social__title">Po więcej materiałów wpadaj na mojego:</h2>
        <a
          href="https://www.facebook.com/Planer-Osobisty-102458435311991"
          class="social__element"
        >
          <img src="~assets/images/facebook.svg" alt="Facebook icon" />
          <span class="font-primary">Facebooka</span>
        </a>
        <a href="https://instagram.com/planerosobisty" class="social__element">
          <img src="~assets/images/instagram.svg" alt="Instagram icon" />
          <span class="font-primary">Instagrama</span>
        </a>
        <img src="~assets/images/book.png" class="ebook" alt="Ebook" />
      </div>
    </section>
    <section class="more-blogs container-lg">
      <article v-for="blog in blogs.slice(0, 5)" :key="blog.slug">
        <nuxt-link :to="{ name: 'blog-slug', params: { slug: blog.slug } }">
          <img :src="blog.thumbnail" :alt="blog.title" />
          <h3 class="text-center">{{ blog.title }}</h3>
          <summary class="text-center block">{{ blog.description }}</summary>
        </nuxt-link>
      </article>
    </section>
    <!--    <div class="home_page__circle">-->
    <!--      <img class="home_page__circle__img" src="~assets/images/beauty-script/home-page-quote.png" />-->
    <!--    </div>-->
    <!--    <about-me-section class="home_page__section"></about-me-section>-->
    <!--    <blog-section :blogs="blogs" class="home_page__section" id="blogs"></blog-section>-->
  </main>
</template>

<script>
import MailchimpSignup from '@/components/MailchimpSignup'
export default {
  components: { MailchimpSignup },

  transition: {
    name: 'slide-fade',
  },
  async asyncData({ $content }) {
    const blogs = await $content('blog').fetch()
    return {
      blogs,
    }
  },
}
</script>

<style lang="scss">
$circle-radius: 25vw;

.home-page section {
  padding-top: 5rem;
  padding-bottom: 5rem;
  margin-bottom: 0;

  h2,
  h3 {
    font-weight: 400;
  }
}

.home-page .hero {
  display: grid;
  grid-template-rows: auto auto;
  padding-bottom: 0;

  &__quote {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
    blockquote {
      margin: 0;
      border: 0;
      padding: 0;
      color: black;
      font-size: 3.5rem;
    }
    cite {
      font-weight: 400;
    }
  }

  &__main {
    display: flex;
    align-items: center;
    grid-row: 2;

    &__img {
      max-width: 50rem;
      z-index: 2;
    }

    &__text {
      margin-left: 5rem;
      font-weight: 400;
      font-size: 3.5rem;
      text-align: center;
      color: black;
      > * {
        margin: 0;
        &:last-child {
          font-weight: 600;
        }
      }
    }
  }

  &__circle-left {
    $image-dimensions-scale: 0.7;
    position: absolute;
    left: 0;
    top: 50%;
    width: 15vw;
    height: 15vw * 1.79;
    background: url('~/assets/images/half-circle.png') no-repeat 50% 50%;
    background-size: cover;
  }
}

.home-page .intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $grey-4;

  > * {
    max-width: 1300px;
    margin-bottom: 1.7rem;
    margin-top: 0;
    &:last-child {
      margin-bottom: 0;
    }
  }

  p {
    text-align: center;
  }

  ol {
    position: relative;
    top: 0.5rem;
    display: flex;
    justify-content: space-between;
    margin-top: 0;
    width: 100%;
    padding-left: 5rem;
    padding-right: 5rem;
    background: $primary;
    font-weight: 400;
    font-size: 1.7rem;
    line-height: 4rem;

    li {
      position: relative;
      top: 0.5rem;
    }
  }
}

.home-page .newest-blogs {
  header {
    background: #cbcbcb;
    margin-bottom: 1.7rem;

    > * {
      position: relative;
      top: 0.4rem;
      font-size: 4rem;
      color: white;
    }
  }
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 40px;
    margin-bottom: 4rem;
    padding: 1.7rem 0;
    background: #cbcbcb30;

    article h3 {
      font-size: 1.7rem;
      margin: 2rem 0 0 0;
    }
  }

  footer {
    width: fit-content;
    margin-left: auto;
  }
}

.home-page .newsletter {
  background: $primary;
  h2 {
    font-size: 4rem;
  }
  ol {
    font-size: 1.4rem;
    margin: 1.7rem 0;
  }
  form {
    display: flex;

    input {
      height: 100%;
      background: transparent;
      border: none;
      border-bottom: 1px solid black;
      font-size: 1.7rem;
      text-transform: uppercase;

      &:focus-visible {
        outline: none;
      }

      &::placeholder {
        color: black;
      }

      &.invalid {
        border-bottom-color: $error;
      }
    }

    button {
      margin-left: 2rem;
      background-color: $grey-3;

      &:hover {
        background-color: lighten($grey-3, 20%);
      }
    }

    .first-error {
      position: absolute;
      color: $error;
    }

    .success-message {
      position: absolute;
    }
  }
}

.home-page .social {
  &__container {
    display: grid;
    grid-template-columns: repeat(2, 300px);
    position: relative;
  }
  &__title {
    grid-column: 2 span;
  }
  &__element {
    display: flex;
    align-items: center;
    grid-row: 2;
    font-size: 3.5rem;
    font-weight: 400;
    color: #cbcbcb;
    img {
      max-width: 70px;
    }
  }
  .ebook {
    position: absolute;
    bottom: -2rem;
    right: 2.4rem;
    width: 350px;
  }
}

.home-page .more-blogs {
  article {
    margin-bottom: 1.7rem;
  }
  article a {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 400px 1fr;
    grid-column-gap: 20px;
    background: #cbcbcb30;
    color: black;

    img {
      grid-row: 2 span;
    }
    h3 {
      align-self: end;
      color: inherit;
      font-weight: 700;
      font-size: 1.7rem;
    }
    summary {
      align-self: start;
    }
  }
}
</style>
