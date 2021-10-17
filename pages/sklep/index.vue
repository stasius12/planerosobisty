<template>
  <div>
    <h1>Sklep</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        <img :src="product.images">
        <h2>{{ product.name }} - {{ product.price.unit_amount / 100 }} {{ product.price.currency }}</h2>
        <button class="button" @click="addProductToCart(product.id)">Kup teraz</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'index',
  async asyncData({ $axios }) {
    let products = [];

    try {
      products = await $axios.$get('products');
    } catch (error) {
      console.error(error)
    }

    return { products }
  },
  mounted() {
    if (this.$nuxt.context.query.error) {
      this.$toast.error('Oops...Coś poszło nie tak', { duration: 3000 });
      this.$router.replace({ name: 'sklep' })
    }
  },
  methods: {
    ...mapActions("checkout", ["addCartItem"]),
    async addProductToCart(productID) {
      await this.addCartItem(productID);
      await this.$router.push({ name: 'sklep-koszyk' });
    },
  }
}
</script>
