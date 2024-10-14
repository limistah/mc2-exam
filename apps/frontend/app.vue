<template>
  <TransactionList :wallet="wallet"/>
</template>
<script setup>
  useHead({
    meta: {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0"
    }
  })
  const {wallet} = useRoute().query
</script>