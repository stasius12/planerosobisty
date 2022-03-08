<template>
  <details>
    <summary>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M21 12l-18 12v-24z" /></svg>
      <div><slot name="summary" /></div>
    </summary>
    <div><slot name="details" /></div>
  </details>
</template>

<script>
export default {
  name: 'FaqElement',
}
</script>

<style scoped></style>
