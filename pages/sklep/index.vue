<template>
  <div>
    <h1>Sklep 2</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        <img :src="product.images">
        <h2>{{ product.name }} - {{ product.price.unit_amount / 100 }} {{ product.price.currency }}</h2>
        <form action="/.netlify/functions/api/create-checkout-session" method="POST">
          <input hidden name="productID" :value="product.id" >
          <button type="submit">Buy now</button>
        </form>
        <button @click="addProductToCart(product.id)">Kup teraz</button>
        <button @click="dumb">P24</button>
      </li>

      <button @click="increase">Click me</button>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'index',
  mounted() {
    if (this.$nuxt.context.query.error) {
      this.$toast.error('Oops...Something went wrong', { duration: 3000 });
      this.$router.replace({ name: 'sklep' })
    }
  },
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
  methods: {
    ...mapActions("checkout", ["addCartItem"]),
    increase() {
      this.count += 1;
      this.$cookies.set('cookie-name', { count: this.count }, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
    },
    async addProductToCart(productID) {
      await this.addCartItem(productID);
      await this.$router.push({ name: 'sklep-koszyk' });
    },
    async dumb() {
      const response = await axios.post(`${process.env.domainName}/.netlify/functions/api/create-payment-intent`);
      console.log(response);
      var stripe = Stripe('pk_test_51JPSsNKh4S9ivNPrRC0BwyWfW7QkBSbjNEy0T8sbGIcG1IWyR15lA05vl4fKU97iChhuqOF7iRWLsjifQMwaqVoA00xrvqiXK3');
      const hello = stripe.confirmP24Payment(
        response.data,
        {
          payment_method: {
            p24: {
              bank: 'blik',
            },
            billing_details: {
              name: 'Stan Stepakovsky',
              email: 'stanislawstepak@outlook.com',
            },
          },
          payment_method_options: {
            p24: {
              // In order to be able to pass the `tos_shown_and_accepted` parameter, you must
              // ensure that the P24 regulations and information obligation consent
              // text is clearly visible to the customer. See
              // stripe.com/docs/payments/p24/accept-a-payment#requirements
              // for directions.
              tos_shown_and_accepted: true,
            }
          },
          return_url: 'http://127.0.0.1:8888',
        }
      );
      console.log(hello);
    }
  }
}
</script>
