<template>
  <main class="home-page select-none mt-10">
    <section
      class="intro bg-center bg-cover w-screen h-screen mb-12 pt-2 hidden lg:flex items-center justify-center"
    >
      <img src="~assets/images/home_page_tekst.png" />
    </section>
    <section class="hero container">
      <header class="hidden lg:flex items-center w-full pt-4">
        <div class="border-b-1 border-gray-600 w-full mr-4" />
        <h2
          class="min-w-max mb-0 top-1 relative text-gray-600 text-center font-normal"
        >
          Poznajmy się
        </h2>
        <div class="border-b-1 border-gray-600 w-full ml-4" />
      </header>
      <div class="hero__content items-center flex flex-col lg:grid py-12">
        <img
          class="hero__img col-span-2 lg:pr-5 lg:pl-0 md:px-32 sm:px-16 px-10"
          src="~assets/images/Natalka_rounded.png"
          alt="Natalia Włodarska"
        />
        <div class="text-center col-span-3 lg:pl-5 mt-10 lg:mt-0">
          <p class="my-3">
            Cześć! Jestem Natalia :) Wierzę, że
            <span class="font-bold">mając odpowiednie narzędzia</span>, każdy z
            nas może zaprojektować życie swoich marzeń.
          </p>
          <p class="my-3">
            Trzy filary, które determinują nasz sukces w tym zakresie to:
            samoświadomość, planowanie i produktywność. Każdy z nich jest
            <span class="font-bold">
              nieodzownym elementem projektowania własnej rzeczywistości </span
            >.
          </p>
          <p class="my-3">
            Moją misją jest wspierać Cię w tworzeniu życia, o którym marzysz.<br />
            Treści i narzędzia, które tu znajdziesz, pomogą Ci
            <span class="font-bold">świadomie i skutecznie</span> tworzyć własną
            mapę do celu i w konsekwencji, spełniać swoje marzenia.
          </p>
          <p class="font-primary text-3xl mb-2">
            Moją misją jest pomóc Ci stworzyć mapę do celu. <br />
            <span class="font-bold">Ścieżkę wybierasz sam.</span>
          </p>
        </div>
      </div>
    </section>
    <section class="newest-blogs py-12 bg-gray-100">
      <header class="container mb-2">
        <div class="flex items-center w-full">
          <div class="border-b-1 border-gray-600 w-full mr-4" />
          <h2
            class="min-w-max mb-0 top-1 relative text-gray-600 text-center font-normal"
          >
            Najnowsze artykuły
          </h2>
          <div class="border-b-1 border-gray-600 w-full ml-4" />
        </div>
      </header>
      <div class="container flex flex-wrap gap-x-6 py-4">
        <article
          v-for="blog in blogs.slice(0, 3)"
          :key="blog.slug"
          class="py-7 flex newest-blogs__article"
          style="flex: 1 1 300px"
        >
          <nuxt-link :to="{ name: 'blog-slug', params: { slug: blog.slug } }">
            <img :src="blog.thumbnail" :alt="blog.title" />
            <h3
              class="mt-4 px-2 text-center text-black text-lg font-body font-normal"
            >
              {{ blog.title }}
            </h3>
          </nuxt-link>
        </article>
      </div>
      <footer class="flex justify-center">
        <nuxt-link
          class="font-primary button h-11 w-64 bg-gray-300 hover:bg-gray-400"
          :to="{ name: 'blog' }"
        >
          Zobacz więcej postów
        </nuxt-link>
      </footer>
    </section>
    <section class="newsletter bg-primary py-12">
      <div class="container">
        <h2 class="font-normal">
          ZAPISZ SIĘ DO DARMOWEGO NEWSLETTERA JEŚLI CHCESZ:
        </h2>
        <ol class="pt-5 pl-10 text-lg list-decimal font-normal">
          <li>Świadomie tworzyć własną rzeczywistość</li>
          <li>Nauczyć się skutecznie planować swoje działania</li>
          <li>Być efektywnym jak nigdy dotąd</li>
          <li>Otrzymać bonusowego ebooka</li>
        </ol>
        <client-only>
          <mailchimp-signup form-class="lg:w-1/2"></mailchimp-signup>
        </client-only>
      </div>
    </section>
    <section class="social py-12">
      <div class="container relative">
        <h2 class="mb-2 font-secondary text-2xl font-normal">
          Po więcej materiałów wpadaj na mojego:
        </h2>
        <div class="flex flex-wrap gap-x-5">
          <a
            href="https://www.facebook.com/Planer-Osobisty-102458435311991"
            class="flex items-center text-gray-500 font-medium text-xl"
          >
            <img
              src="~assets/images/facebook.svg"
              alt="Facebook icon"
              class="w-10"
            />
            <span class="relative top-0.5">Facebooka</span>
          </a>
          <a
            href="https://instagram.com/planerosobisty"
            class="flex items-center text-gray-500 font-medium text-xl"
          >
            <img
              src="~assets/images/instagram.svg"
              alt="Instagram icon"
              class="w-10"
            />
            <span class="relative top-0.5">Instagrama</span>
          </a>
        </div>
        <img
          src="~assets/images/book.png"
          class="social__ebook absolute right-0 bottom-0 w-0 lg:w-64 xl:w-80"
          alt="Ebook"
        />
      </div>
    </section>
    <section class="container pt-12">
      <header class="mb-8">
        <div class="flex items-center w-full">
          <div class="border-b-1 border-gray-600 w-full mr-4" />
          <h2
            class="min-w-max mb-0 top-1 relative text-gray-600 text-center font-normal"
          >
            Zobacz więcej
          </h2>
          <div class="border-b-1 border-gray-600 w-full ml-4" />
        </div>
      </header>
      <article v-for="blog in blogs.slice(0, 5)" :key="blog.slug" class="py-4">
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
    {{ $config.sentryUrl }}
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

.home-page .intro {
  background-image: url('~assets/images/home_page_intro.png');
  @screen lg {
    height: calc(100vh - 300px);

    @media (min-aspect-ratio: 2 / 1) {
      height: calc(100vh - 200px);
    }
  }
}

.home-page .cite {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;

  blockquote {
    margin: 0;
    border: 0;
    padding: 0;
    color: black;
  }

  cite {
    font-weight: 400;
  }
}

.home-page .hero {
  &__content {
    grid-template-columns: repeat(5, 1fr);
  }

  &__img {
    //max-width: 35rem;
    z-index: 2;
  }
}

.home-page .newest-blogs {
  &__article:last-child {
    @screen md {
      display: none;
    }
    @screen xl {
      display: block;
    }
  }
}

.home-page .newsletter {
  form {
    input {
      //font-size: 1.7rem;
    }
  }
}

.home-page .social {
  &__ebook {
    right: 2rem;

    @screen 2xl {
      right: 10rem;
    }
  }
}
</style>
