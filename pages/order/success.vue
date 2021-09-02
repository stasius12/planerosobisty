<template>
  <div>
    <h1>Your order has been accepted!</h1>
    <p>Thank you <strong>{{ session.retrievedCustomer.name }}</strong> for placing an order.</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'success.vue',
  async asyncData({ query }) {
    let session = {};
    const sessionID = query.session_id;

    if (sessionID) {
      try {
        const rawSession = await axios.get(`${process.env.domainName}/.netlify/functions/api/checkout-sessions/${sessionID}`);
        session = rawSession.data
      } catch {
        console.log("Error")
      }
    }

    return {
      session
    }
  }
}
</script>

<style scoped>

</style>
