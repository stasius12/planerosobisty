<template>
  <details>
    <summary>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path d="M21 12l-18 12v-24z" />
      </svg>
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

<style lang="scss" scoped>
details {
  summary {
    font-weight: bold;
    cursor: pointer;
    list-style: none;

    @apply flex items-center relative bg-gray-600 pl-4 text-white;

    svg {
      fill: white;
      min-width: 20px;
    }

    &::marker,
    &::-webkit-details-marker {
      display: none;
    }
  }

  &[open] summary {
    list-style-image: none;
  }

  div {
    @apply p-2 border-b-1 border-l-1 border-r-1 border-gray-600;
  }
}
</style>
