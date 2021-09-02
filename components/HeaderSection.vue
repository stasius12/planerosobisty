<template>
  <header class="header">
    <nuxt-link :to="{name: 'index'}" class="header__logo">
      <h1>PLANER<br>OSOBISTY</h1>
    </nuxt-link>
    <nav class="header__menu">
      <ul class="list-none">
        <li><nuxt-link :to="{name: 'sklep'}">Sklep</nuxt-link></li>
        <li><nuxt-link :to="{name: 'index', hash: '#blogs'}">Blog</nuxt-link></li>
        <li><nuxt-link :to="{name: 'index'}">O mnie</nuxt-link></li>
        <li><nuxt-link :to="{name: 'index'}">Kontakt</nuxt-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
name: "HeaderSection"
}
</script>

<style lang="scss">
$font-size-header-base: 2.5rem;
.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: $header-height;
  margin: 4rem 0;
  background: $primary;
  font: 400 $font-size-header-base 'Bebas Neue', serif;
  color: black;

  > * {
    position: relative;
    top: 0.2rem;
  }

  &__logo {
    display: flex;
    width: 15rem;
    margin-right: auto;
    user-select: none;

    > * {
      width: 100%;
      margin-bottom: 0;
      font-size: $font-size-header-base * 1.5;
      font-weight: 500;
      line-height: $font-size-header-base * 1.5 - 0.2rem;
      text-align: center;
    }
  }
  &__menu ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0;

    li {
      display: block;
      margin: 0 3rem;
      color: inherit;
      line-height: $header-height;
      a {
        color: inherit;
      }
    }
  }
}
</style>
