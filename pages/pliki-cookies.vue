<template>
  <main class="container mt-10">
    <section-title>Pliki cookies</section-title>

    <p class="mb-4">
      Poniższy tekst stanowi fragment
      <nuxt-link :to="{ name: 'polityka-prywatnosci' }">
        polityki prywatności
      </nuxt-link>
      obowiązującej na stronie planerosobisty.pl
    </p>

    <ol class="nested-decimal-list remove-space-left pl-5" start="7">
      <li>
        <span class="font-bold">PLIKI COOKIES</span>

        <ol>
          <li>
            Pliki Cookies (ciasteczka) są to niewielkie informacje tekstowe w
            postaci plików tekstowych, wysyłane przez serwer i zapisywane po
            stronie osoby odwiedzającej stronę Sklepu Internetowego (np. na
            dysku twardym komputera, laptopa, czy też na karcie pamięci
            smartfona – w zależności z jakiego urządzenia korzysta odwiedzający
            nasz Sklep Internetowy).
          </li>

          <li>
            Administrator może przetwarzać dane zawarte w plikach Cookies
            podczas korzystania przez odwiedzających ze strony Sklepu
            Internetowego w następujących celach:

            <ul>
              <li>
                zapamiętywania Produktów dodanych do koszyka w celu złożenia
                Zamówienia;
              </li>
              <li>
                zapamiętywania danych z wypełnianych Formularzy Zamówienia;
              </li>
              <li>
                dostosowywania zawartości strony Sklepu Internetowego do
                indywidualnych preferencji Usługobiorcy (np. dotyczących
                kolorów, rozmiaru czcionki, układu strony) oraz optymalizacji
                korzystania ze stron Sklepu Internetowego;
              </li>
              <li>
                prowadzenia anonimowych statystyk przedstawiających sposób
                korzystania ze strony Sklepu Internetowego.
              </li>
            </ul>
          </li>
          <li>
            Każdy ma możliwość określenia warunków korzystania z plików Cookies
            za pomocą ustawień własnej przeglądarki internetowej. Oznacza to, że
            można częściowo ograniczyć lub całkowicie wyłączyć możliwość
            zapisywania plików Cookies. Ustawienia przeglądarki internetowej w
            zakresie plików Cookies są istotne z punktu widzenia zgody na
            korzystanie z plików Cookies przez nasz Sklep Internetowy – zgodnie
            z przepisami taka zgoda może być również wyrażona poprzez ustawienia
            przeglądarki internetowej. W braku wyrażenia takiej zgody należy
            odpowiednio zmienić ustawienia przeglądarki internetowej w zakresie
            plików Cookies.
          </li>
        </ol>
      </li>
    </ol>
  </main>
</template>

<script>
export default {
  name: 'PlikiCookies',
}
</script>
