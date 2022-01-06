<template>
  <main class="home-page select-none">
    <section class="intro"></section>
    <section class="cite container my-10">
      <blockquote class="font-handwrite text-3xl">
        "Ludzie, którzy mają cele, odnoszą sukcesy, ponieważ wiedzą, dokąd
        zmierzają."
      </blockquote>
      <cite class="font-primary font-style-normal">EARL NIGHTINGALE</cite>
    </section>
    <section
      class="hero mt-10 py-14 container items-center flex flex-col lg:grid"
    >
      <!--flex flex-wrap     2xl:ml-auto xl:ml-20 -->
      <img
        class="hero__img col-span-2 lg:pr-5 lg:pl-0 md:px-32 sm:px-16 px-10"
        src="~assets/images/Natalka_rounded.png"
        alt="Natalia Włodarska"
      />
      <div class="text-center col-span-3 lg:pl-5 mt-10 lg:mt-0">
        <h2 class="font-handwrite font-weight-normal mb-8">
          Cześć! Jestem Natalia :)
        </h2>
        <p class="mt-0 mb-4">
          Wierzę, że
          <span class="font-bold">mając odpowiednie narzędzia</span>, każdy z
          nas może zaprojektować życie swoich marzeń.
        </p>
        <p class="mt-0 mb-4">
          Istnieją 3 filary, które determinują nasz sukces w tym zakresie.
        </p>
        <p class="mt-0 mb-4">
          1. Samoświadomość 2. Planowanie 3. Produktywność
        </p>
        <p class="mt-0 mb-4">
          Każdy z nich jest
          <span class="font-bold">nieodzownym</span> elementem projektowania
          własnej rzeczywistości.
        </p>
        <p class="mt-0 mb-4">
          Moją misją jest wspierać Cię w tworzeniu życia, o którym marzysz.
          Stworzyłam to miejsce, aby podzielić się z tobą swoją wiedzą i
          doświadczeniem. Treści i narzędzia, które tu znajdziesz, pomogą Ci
          <span class="font-bold">świadomie i skutecznie</span> tworzyć własną
          mapę do celu i w konsekwencji, spełniać swoje marzenia.
        </p>
        <p class="font-primary text-3xl">
          Moją misją jest pomóc Ci stworzyć mapę do celu. <br />
          <span class="font-bold">Ścieżkę wybierasz sam.</span>
        </p>
      </div>
    </section>
    <section class="newest-blogs bg-gray-100 py-14">
      <header class="container mb-2">
        <div class="flex items-center w-full">
          <div class="border-b-1 border-gray-600 w-full mr-4" />
          <h2 class="min-w-max mb-0 top-1 relative text-gray-600 text-center">
            Najnowsze artykuły
          </h2>
          <div class="border-b-1 border-gray-600 w-full ml-4" />
        </div>
      </header>
      <div class="container flex flex-wrap gap-x-6">
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
          class="font-primary button button-large"
          :to="{ name: 'blog' }"
        >
          Zobacz więcej postów
        </nuxt-link>
      </footer>
    </section>
    <section class="newsletter bg-primary py-14">
      <div class="container">
        <h2>ZAPISZ SIĘ DO DARMOWEGO NEWSLETTERA JEŚLI CHCESZ:</h2>
        <ol class="pt-5 pl-10 text-lg list-decimal">
          <li class="py-1">
            <span class="font-bold">
              Świadomie tworzyć własną rzeczywistość
            </span>
          </li>
          <li class="py-1">
            Nauczyć się
            <span class="font-bold">skutecznie planować</span> swoje działania
          </li>
          <li class="py-1">
            Być <span class="font-bold">efektywnym</span> jak nigdy dotąd
          </li>
          <li class="py-1">
            <span class="font-bold">Otrzymać bonusowego ebooka</span>
          </li>
        </ol>
        <client-only>
          <mailchimp-signup form-class="lg:w-1/2"></mailchimp-signup>
        </client-only>
      </div>
    </section>
    <section class="social py-14">
      <div class="social__container container relative">
        <h2 class="mb-2">Po więcej materiałów wpadaj na mojego:</h2>
        <div class="flex flex-wrap gap-x-5">
          <a
            href="https://www.facebook.com/Planer-Osobisty-102458435311991"
            class="flex items-center text-gray-500 font-medium text-3xl"
          >
            <img
              src="~assets/images/facebook.svg"
              alt="Facebook icon"
              class="w-16"
            />
            <span class="relative top-0.5 font-header">Facebooka</span>
          </a>
          <a
            href="https://instagram.com/planerosobisty"
            class="flex items-center text-gray-500 font-medium text-3xl"
          >
            <img
              src="~assets/images/instagram.svg"
              alt="Instagram icon"
              class="w-16"
            />
            <span class="relative top-0.5 font-header">Instagrama</span>
          </a>
        </div>
        <img
          src="~assets/images/book.png"
          class="absolute right-8 bottom-0 w-0 lg:w-80"
          alt="Ebook"
        />
      </div>
    </section>
    <section class="container pt-14">
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
  </main>
</template>

<script>
import MailchimpSignup from '@/components/MailchimpSignup'
export default {
  components: { MailchimpSignup },

  layout: 'homePage',

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
  h2 {
    font-weight: 400;
  }
}

.home-page .intro {
  height: calc(100vh - 114px);
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
  grid-template-columns: repeat(5, 1fr);

  &__img {
    //max-width: 35rem;
    z-index: 2;
  }
}

.home-page .newest-blogs {
  h2 {
    font-weight: 600;
  }
  &__article:last-child {
    @screen sm {
      display: none;
    }
    @screen lg {
      display: block;
    }
  }
}

.home-page .newsletter {
  form {
    input {
      font-size: 1.7rem;
    }
  }
}
</style>
