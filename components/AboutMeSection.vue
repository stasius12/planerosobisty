<template>
  <div class="container-lg">
    <div class="about_me">
      <img class="about_me__headline" src="~assets/images/beauty-script/I-am-Natalia.png" />
      <div class="about_me__text">
        <p>
          Wierzę, że mając odpowiednie narzędzia, każdy z nas może zaprojektować
          swoje życie tak jak zechce.
        </p>

        Istnieją 3 czynniki, które determinują nasz sukces w tym zakresie. Są
        nimi:
        <ol class="about_me__text__list">
          <li>samoświadomość</li>
          <li>planowanie</li>
          <li>działanie</li>
        </ol>
        <p>
          Każdy z nich jest <b>nieodzownym</b> elementem projektowania własnej
          rzeczywistości.
        </p>
        <p>
          Stworzyłam to miejsce, aby podzielić się z tobą swoją wiedzą i
          doświadczeniem. Mam nadzieję, że treści i narzędzia, które tu
          znajdziesz, pomogą Ci <b>świadomie</b> i <b>skutecznie</b> tworzyć
          własną mapę do celu i w konsekwencji, spełniać swoje marzenia.
        </p>
      </div>
      <div class="about_me__img">
        <img src="~assets/images/Natalka_1.jpeg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutMeSection',
}
</script>

<style lang="scss">
.about_me {
  display: grid;
  grid-template-columns: 6.3fr 3.7fr;
  grid-template-rows: min-content 1fr;
  grid-gap: 4rem;
  align-items: center;
  padding: 5rem;
  border: 1px solid #818181;

  @media (max-width: $screen-md) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: $screen-sm) {
    grid-template-columns: 1fr;
    grid-template-rows: min-content auto auto;
    justify-items: center;
    align-items: center;
  }

  @media (max-width: $screen-xs) {
    padding: 0;
    border: none;
  }

  &__headline {
    height: 2.5rem;
  }

  &__text {
    grid-row-start: 2;
    font-family: 'Bebas Neue', Arial, sans-serif;
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.5;
    color: black;
    letter-spacing: 0.05rem;

    @media (max-width: $screen-sm) {
      grid-row-start: 3;
    }

    &__list {
      margin-top: 0;
    }
    p:last-child {
      margin-bottom: 0;
    }
  }

  &__img {
    max-width: 370px;
    grid-row: span 2;
    grid-column-start: 2;

    @media (max-width: $screen-sm) {
      grid-row: 2;
      grid-column-start: 1;
    }
  }
}
</style>
