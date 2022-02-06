<template>
  <footer class="bg-gray-500">
    <div class="container flex flex-wrap justify-between py-10 px-5 2xl:px-40">
      <section class="flex flex-col text-white">
        <h3 class="text-white">Sklep</h3>
        <ul class="list-none">
          <li>reklamacje</li>
          <li>dostawa</li>
          <footer-link name="zwroty">zwroty</footer-link>
          <li>
            <nuxt-link to="/sklep#faq" class="text-white">FAQ</nuxt-link>
          </li>
          <li>czas i koszty dostawy</li>
        </ul>
      </section>
      <section class="flex flex-col text-white">
        <h3 class="text-white">Nawigacja</h3>
        <ul class="list-none">
          <footer-link name="blog">blog</footer-link>
          <footer-link name="sklep">sklep</footer-link>
          <li>kontakt</li>
          <footer-link name="o-mnie">o mnie</footer-link>
        </ul>
      </section>
      <section class="flex flex-col text-white">
        <h3 class="text-white">Informacje</h3>
        <ul class="list-none">
          <li>polityka prywatności</li>
          <footer-link name="regulamin">regulamin strony</footer-link>
          <li>kontakt</li>
          <li>mapa witryny</li>
          <li>pliki cookies</li>
        </ul>
      </section>
      <section class="flex flex-col text-white" style="flex: 1 1 400px">
        <h3 class="text-white">Newsletter</h3>
        <p class="mb-8">
          Zapisz się na bezpłatny newsletter i odbierz darmowego ebooka
        </p>
        <mailchimp-signup
          class="signup"
          :input-class="{ 'placeholder-white border-white': true }"
        ></mailchimp-signup>
      </section>
    </div>
  </footer>
</template>

<script>
import FooterLink from './FooterLink'
import MailchimpSignup from './MailchimpSignup'
export default {
  name: 'FooterSection',
  components: { MailchimpSignup, FooterLink },
  data() {
    return {
      email: '',
    }
  },
}
</script>

<style lang="scss">
section {
  flex: 1 1 200px;
}
</style>
