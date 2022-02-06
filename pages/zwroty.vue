<template>
  <main class="container mt-10">
    <section-title>Zwroty</section-title>
    <p>
      <span class="font-medium">W ciągu 14 dni</span> od momentu otrzymania
      przesyłki możesz zwrócić zakupione produkty bez podania przyczyny.
    </p>
    <p>
      Produkty nie mogą nosić śladów użytkowania czy uszkodzeń. W przypadku
      zniszczeń lub widocznych śladów użytkowania produktu, kwota zwrotu może
      zostać obniżona. Dlatego prosimy o odpowiednie zabezpieczenie przesyłki
      zwrotnej, żeby zawartość nie uległa uszkodzeniu podczas transportu.
    </p>
    <p>
      Jeśli planujesz dokonać zwrotu naszych produktów prosimy o poinformowanie
      nas o tym mailowo na adres
      <a href="mailto:kontakt@planerosobisty.pl">kontakt@planerosobisty.pl</a>.
      <br />
    </p>
    <p class="mb-0 font-medium">W treści wpisz:</p>
    <ol class="list-decimal mt-2 pl-10">
      <li>Numer zamówienia</li>
      <li>Imię i nazwisko</li>
      <li>
        Przyczynę zwrotu. Dzięki temu będziemy w stanie tworzyć coraz lepsze
        produkty w przyszłości :)
      </li>
    </ol>
    <p class="mb-0 font-medium">Dane adresowe do zwrotu:</p>
    <address class="mt-2 mb-10 pl-6">
      Natalia Włodarska<br />
      ul. Nyska 79/13<br />
      Wrocław 50-505
    </address>

    <p>
      Pamiętaj, że w przypadku zwrotu koszty odesłania produktu ponosi nadawca
      paczki.
    </p>
    <p>
      Zwrot środków zostanie dokonany w tej samej formie, w której została
      dokonana płatność. Może to potrwać do 14 dni od momentu otrzymania przez
      nas zwracanych produktów.
    </p>
  </main>
</template>

<script>
import SectionTitle from '../components/SectionTitle'
export default {
  name: 'Zwroty',
  components: { SectionTitle },
}
</script>

<style scoped></style>
