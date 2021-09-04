<template>
  <div>
    <h1>Your order has been accepted!</h1>
    <p>Thank you <strong>{{ customer.name }}</strong> for placing an order.</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ query }) {
    let customer = {};
    const sessionID = query.session_id;

    if (sessionID) {
      try {
        const rawSession = await axios.get(`${process.env.domainName}/.netlify/functions/api/checkout-sessions/${sessionID}`);
        const { retrievedCustomer } = rawSession.data
        customer = retrievedCustomer
      } catch {
        console.log("Error")
      }
    }

    return {
      customer
    }
  }
}
</script>

<style scoped>

</style>
