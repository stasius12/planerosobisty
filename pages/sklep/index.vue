<template>
  <div>
    <h1>Sklep</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        <img :src="product.images">
        <h2>{{ product.name }} - {{ product.price.unit_amount / 100 }} {{ product.price.currency }}</h2>
        <form action="/.netlify/functions/api/create-checkout-session" method="POST">
          <input hidden name="productID" :value="product.id" >
          <button type="submit">Buy now</button>
        </form>
      </li>

      <button @click="increase">Click me</button>
      {{ count }}
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'index',
  data() {
    return {
      count: 0,
    }
  },
  async asyncData() {
    let products = [];

    try {
      const response = await axios.get(`${process.env.domainName}/.netlify/functions/api/products`);
      products = response.data;
    } catch (error) {
      console.error(error)
    }

    return { products, cook: "" }
  },
  mounted() {
    if (this.$nuxt.context.query.error) {
      this.$toast.error('Oops...Something went wrong', { duration: 3000 });
      this.$router.replace({ name: 'sklep' })
    }

    this.count = this.$cookies.get('cookie-name')["count"];
  },
  methods: {
    increase() {
      this.count += 1;
      this.$cookies.set('cookie-name', { count: this.count }, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    }
  }
}
</script>
