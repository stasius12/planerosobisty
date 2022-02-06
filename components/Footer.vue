<template>
  <footer class="bg-gray-500 text-center sm:text-left">
    <div class="container flex flex-wrap justify-between pt-10 pb-6">
      <div
        class="flex flex-col sm:flex-row"
        style="flex-grow: 1; flex-basis: 600px"
      >
        <section class="flex flex-col text-white">
          <h3 class="text-white">Sklep</h3>
          <ul class="list-none">
            <footer-link name="reklamacje">reklamacje</footer-link>
            <footer-link name="dostawa">dostawa</footer-link>
            <footer-link name="zwroty">zwroty</footer-link>
            <li>
              <nuxt-link to="/sklep#faq" class="text-white">FAQ</nuxt-link>
            </li>
          </ul>
        </section>
        <section class="flex flex-col text-white">
          <h3 class="text-white">Nawigacja</h3>
          <ul class="list-none">
            <footer-link name="blog">blog</footer-link>
            <footer-link name="sklep">sklep</footer-link>
            <footer-link name="kontakt">kontakt</footer-link>
            <footer-link name="o-mnie">o mnie</footer-link>
          </ul>
        </section>
        <section class="flex flex-col text-white">
          <h3 class="text-white">Informacje</h3>
          <ul class="list-none">
            <footer-link name="polityka-prywatnosci" rel="nofollow">
              polityka prywatności
            </footer-link>
            <footer-link name="regulamin" rel="nofollow">
              regulamin strony
            </footer-link>
            <footer-link name="pliki-cookies" rel="nofollow">
              pliki cookies
            </footer-link>
          </ul>
        </section>
      </div>
      <section
        class="flex flex-col text-white"
        style="flex-grow: 2; flex-basis: 400px"
      >
        <h3 class="text-white">Newsletter</h3>
        <p class="mb-4">
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
