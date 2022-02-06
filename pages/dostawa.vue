<template>
  <main class="container mt-10">
    <section-title>Dostawa</section-title>
    <p>
      Dostawa przesyłek jest realizowana jedynie na terytorium Polski. <br />
      Koszt dostawy wynosi 15 zł. <br />
    </p>
    Dostarczamy paczki za pośrednictwem:
    <ul class="list-disc">
      <li>Kuriera InPost</li>
      <li>Paczkomatów InPost</li>
    </ul>
    <p>
      Staramy się, aby przesyłka była nadana w ciągu
      <span class="font-medium">24h od złożenia zamówienia</span>.
      <br />
      Dostawa przesyłki zajmuje
      <span class="font-medium">od 1 do 3 dni roboczych</span>.
    </p>
  </main>
</template>

<script>
import SectionTitle from '../components/SectionTitle'
export default {
  name: 'Dostawa',
  components: { SectionTitle },
}
</script>

<style scoped></style>
