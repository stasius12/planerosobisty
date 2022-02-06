<template>
  <main class="container mt-10">
    <section-title>Kontakt</section-title>
    <p>
      Masz pytanie? A może chcesz się podzielić swoją opinią? Porozmawiajmy!
      <br />
      Napisz do nas na
      <a href="mailto:kontakt@planerosobisty.pl">kontakt@planerosobisty.pl</a>
      lub na Instagramie
      <a href="https://instagram.com/planerosobisty">@planerosobisty</a>.
      Odpowiemy tak szybko, jak to możliwe :)
    </p>
    <p>
      Odpowiedź na swoje pytania dotyczące planera znajdziesz też w sekcji
      <nuxt-link to="/sklep#faq">FAQ</nuxt-link>.
    </p>
  </main>
</template>

<script>
import SectionTitle from '../components/SectionTitle'
export default {
  name: 'Kontakt',
  components: { SectionTitle },
}
</script>

<style scoped></style>
