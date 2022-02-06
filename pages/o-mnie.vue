<template>
  <article class="container">
    <section-title class="mt-10">O mnie</section-title>
    <div class="hero_content flex flex-col-reverse lg:grid gap-x-12">
      <div class="col-span-7 mt-10 lg:mt-0">
        <p class="text-xl font-bold">Cześć, jestem Natalia! :)</p>
        <p>
          Marzę o świecie, w którym każdy ma wiedzę, narzędzia i wiarę w siebie,
          pozwalające osiągnąć mu sukces, według własnej, świadomie wybranej
          przez niego definicji. Planer Osobisty to marka, która powstała na
          fundamentach tego marzenia.
        </p>
        <p>
          Moją misją jest stworzenie miejsca, które wspiera w tworzeniu życia
          marzeń każdego, kto ma odwagę po nie sięgnąć. To właśnie dlatego
          stworzyłam Planer Osobisty - aby podzielić się wiedzą, doświadczeniem
          i narzędziami, które pomogą Ci zaprojektować Twoje życie.
        </p>
        <p>
          Wierzę, że skuteczne planowanie i tworzenie własnej rzeczywistości
          zaczyna się od samoświadomości - zrozumienia siebie, swoich potrzeb,
          obaw oraz najskrytszych pragnień.
        </p>
        <p>
          Ta myśl doprowadziła do powstania pierwszego produkt marki -
          <nuxt-link :to="{ name: 'sklep' }">Planera Osobistego</nuxt-link>,
          czyli miejsca, które daje przestrzeń nie tylko do planowania swoich
          zadań, ale również do poznania siebie i świadomego rozwoju własnego
          potencjału. Z jednej strony znajdziesz w nim strukturę klasycznego
          kalendarza, ale z drugiej mnóstwo przestrzeni na oddech, na swobodne
          myśli, plany, rysunki, afirmacje i wszystko inne czego potrzebujesz,
          aby poznać siebie i w konsekwencji stworzyć rzeczywistość, o której
          zawsze marzyłeś.
        </p>
        <p>
          A jeśli chcesz dowiedzieć się więcej na temat planowania zajrzyj na
          <nuxt-link :to="{ name: 'blog' }">bloga (klik!)</nuxt-link>. To
          miejsce, w którym piszę o sprawdzonych metodach na zaprojektowanie
          swojego życia i skuteczną realizację marzeń.
        </p>
        <p>
          Mam nadzieję, że treści i narzędzia, które tu znajdziesz będą dla
          Ciebie pomocne :)
        </p>
      </div>
      <img
        class="col-span-3 lg:pr-0 lg:pl-0 md:px-32 sm:px-16 px-10"
        src="~assets/images/Natalka_rounded.png"
        alt="Natalia Włodarska"
      />
    </div>
  </article>
</template>

<script>
import SectionTitle from '@/components/SectionTitle'
export default {
  name: 'OMnie',
  components: { SectionTitle },
}
</script>

<style scoped lang="scss">
.hero_content {
  grid-template-columns: repeat(10, 1fr);
}
a:hover {
  text-decoration: underline;
}
</style>
