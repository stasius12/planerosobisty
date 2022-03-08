<template>
  <header>
    <div
      class="header relative w-full flex items-center justify-between text-black"
    >
      <nuxt-link :to="{ name: 'index' }">
        <img src="@/assets/images/logo.svg" width="200" class="" />
      </nuxt-link>
      <nav class="header__menu hidden md:block">
        <ul class="list-none flex justify-between m-0">
          <li><nuxt-link :to="{ name: 'sklep' }">Sklep</nuxt-link></li>
          <li>
            <nuxt-link :to="{ name: 'blog' }">Blog</nuxt-link>
          </li>
          <li><nuxt-link :to="{ name: 'o-mnie' }">O mnie</nuxt-link></li>
          <li><nuxt-link :to="{ name: 'kontakt' }">Kontakt</nuxt-link></li>
        </ul>
      </nav>
      <div class="md:hidden flex items-center mr-5 z-20">
        <button
          class="outline-none mobile-menu-button flex"
          @click="$emit('toggleMobileMenu')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 transition-all"
            :class="{ 'w-10': !showMobileMenu, 'w-0': showMobileMenu }"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 transition-all"
            :class="{ 'w-10': showMobileMenu, 'w-0': !showMobileMenu }"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav
        id="mobile-menu"
        class="header__mobile absolute right-0 top-0 h-screen pt-48 flex items-center justify-center text-black z-10 overflow-hidden"
        :class="{ 'w-0': !showMobileMenu, 'w-full': showMobileMenu }"
      >
        <ul class="list-none flex flex-col items-center mb-52">
          <li>
            <nuxt-link :to="{ name: 'sklep' }">Sklep</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{ name: 'blog' }">Blog</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{ name: 'o-mnie' }">O mnie</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{ name: 'kontakt' }">Kontakt</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderSection',
  props: {
    showMobileMenu: Boolean,
  },
}
</script>

<style lang="scss">
.header {
  font: 400 1.4rem 'Bebas Neue', serif;

  > .header__menu {
    position: relative;
    top: 0.2rem;
  }

  &__menu ul {
    li {
      display: block;
      margin: 0 1.7rem;
      color: inherit;
      line-height: $header-height;
      a {
        color: inherit;
      }
    }
  }

  &__mobile {
    background-color: #fff72e;
    transition: width 500ms ease;
    li {
      padding: 2rem;
      a {
        display: block;
        color: black;
        text-align: center;
        transition: background-color 200ms ease-in-out;

        &.nuxt-link-exact-active {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
