<template>
  <header class="header">
    <nuxt-link :to="{name: 'index'}" class="header__logo-outer-link">
      <div class="header__logo">
          <h1 class="header__logo-text">PLANER<br>OSOBISTY</h1>
          <span class="header__logo-bg"></span>
      </div>
    </nuxt-link>
    <nav class="header__menu">
      <nuxt-link :to="{name: 'index'}"><span>Sklep</span></nuxt-link>
      <nuxt-link :to="{name: 'index'}"><span>O mnie</span></nuxt-link>
      <nuxt-link :to="{name: 'index', hash: '#blogs'}"><span>Blog</span></nuxt-link>
    </nav>
  </header>
</template>

<script>
export default {
name: "HeaderSection"
}
</script>

<style lang="scss">
.header {
  width: 100%;
  height: $header-height;
  padding: 1.5rem 1.5rem 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.4);
  font: 400 2rem 'Bebas Neue', serif;

  &__logo-outer-link {
    color: inherit;
  }

  &__logo {
    display: flex;
    margin-right: auto;
    width: 15rem;
    position: relative;
    user-select: none;
  }
  &__logo-text {
    font-size: 3rem;
    font-weight: 500;
    line-height: 3rem;
    text-align: center;
    z-index: 1;
    width: 100%;
    margin-bottom: 0;
  }
  &__logo-bg {
    background: yellow;
    width: 100%;
    height: 3.3rem;
    position: absolute;
    top: 1rem;
    z-index: 0;
  }

  &__menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    > * {
      display: block;
      position: relative;
      color: inherit;
      margin: 1rem 2rem;
      span {
        position: relative;
        z-index: 1;
      }
      &:after {
        position: absolute;
        bottom: 0.75rem;
        left: 0;
        right: 0;
        width: 0;
        height: 1.6rem;
        background-color: #fff72e;
        content: "";
        transition: all 0.3s linear;
        z-index: 0;
      }
      &:hover {
        &:after {
          width: 100%;
        }
      }
    }
  }
}
</style>
