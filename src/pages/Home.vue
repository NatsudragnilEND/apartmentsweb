<template>
  <Main
    :cards="real"
    :quantity="quantity"
  />
</template>

<script setup>
import { ref, computed } from "vue";
import Main from "../components/Main/Main.vue";

// Parse cards data from localStorage
const cards = JSON.parse(localStorage.allItems || "[]");


const quantity = ref(cards.length);

const real = computed(() => cards.slice(0, 20));

</script>

<style scoped></style>
