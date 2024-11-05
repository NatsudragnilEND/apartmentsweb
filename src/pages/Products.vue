<template>
  <Box :allItems="allItems"/>
</template>

<script setup>
import { ref } from "vue";
import Box from "../components/Box.vue";
const allItems = ref([])
console.log(allItems.value);

</script>

<style lang="scss" scoped></style>
