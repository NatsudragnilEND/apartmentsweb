<template>
  <main class="main">
    <div class="main__items">
      <div class="main__search">
        <input
          type="text"
          class="main__search-input"
          placeholder="Search for house projects"
          v-model="searchQuery"
        />
        <span class="main__search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M8.25 15.75a6.75 6.75 0 107.5 7.5 6.75 6.75 0 00-7.5-7.5zM12 10.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </div>

      <button style="z-index: 100;" class="filter-button" @click="toggleFilterModal()">
        Filter
      </button>

      <!-- Filter and Cards Section -->
      <div class="main__cards-section">
        <button
          class="filter-close-button"
          v-if="showFilterModal"
          @click="closeFilterModal"
          style="z-index: 102;"
        >
          Close
        </button>
        <Filter
        style="z-index: 101;"
          v-if="showFilterModal"
          @filteredResults="updateFilteredCards"
          :cards="cards"
          :searchQuery="searchQuery"
          @close="closeFilterModal"
        />

        <div class="main__cards-inform">
          <div class="main__cards-info">
            <h2 style="color: white;" class="main__title">All House Projects</h2>
            <p style="color: white;" class="main__paragraph" v-if="isLoading">Loading data...</p>
            <p style="color: white;" class="main__paragraph" v-else>
              Found {{ filteredResults.length }} projects
            </p>
          </div>
          <div class="main__cards">
            <div v-if="isLoading" class="main__cards-loader">
              <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <MainCards
              v-for="card in filteredResults"
              :key="card.id"
              :card="card"
              v-else
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import MainCards from "./MainCards/MainCardsCard.vue";
import Filter from "../Filter/Filter.vue";
import { ref, computed, onMounted, watch, watchEffect } from "vue";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pvtiygusmsbegsmduytj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2dGl5Z3VzbXNiZWdzbWR1eXRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzOTAwODYsImV4cCI6MjAzODk2NjA4Nn0.fSHfPEUFSa5iAVLkY02MduJ0EfOb8kPwJG7ZIHH_yYk";
const supabase = createClient(supabaseUrl, supabaseKey);

// Ref for cards (now fetched from Supabase)
const cards = ref([]);

// Ref for filtered cards after filtering
const filteredCards = ref([]);

// Ref for the search query
const searchQuery = ref("");

// Ref for loading state
const isLoading = ref(true);

// Ref for modal visibility
const showFilterModal = ref(
  JSON.parse(localStorage.getItem("showFilterModal")) || false
);

// Computed property for searched results (filtered after filtering)
const filteredResults = computed(() => {
  const filteredBySearch = filteredCards.value.filter((card) => {
    if (searchQuery.value.trim() !== "") {
      return card.projectname
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
    } else {
      return true;
    }
  });
  return filteredBySearch;
});

// Function to update the `filteredCards` ref when `Filter` emits filtered results
function updateFilteredCards(results) {
  filteredCards.value = results;
}

// Fetch cards data from Supabase on component mount
onMounted(async () => {
  try {
    const { data: apartmentData, error } = await supabase
      .from("apartmentdatas")
      .select("*");

    if (error) {
      console.error("Error fetching data:", error);
      // Handle the error (e.g., display an error message to the user)
    } else {
      cards.value = apartmentData;
      filteredCards.value = apartmentData; // Initialize filteredCards with fetched data
      isLoading.value = false; // Data is loaded, set isLoading to false
    }
  } catch (err) {
    console.error("Error fetching apartment data:", err);
    // Handle error
  }
});

// Function to toggle the filter modal
function toggleFilterModal() {
  showFilterModal.value = !showFilterModal.value;
  localStorage.setItem("showFilterModal", showFilterModal.value);
}
watchEffect(() => {
  showFilterModal.value = JSON.parse(localStorage.getItem('showFilterModal'))
})
// Function to close the filter modal
function closeFilterModal() {
  showFilterModal.value = false;
  localStorage.setItem("showFilterModal", showFilterModal.value);
}

// Watch effect to keep the filter modal open for larger screens
watch(
  () => window.innerWidth,
  (newWidth) => {
    if (newWidth >= 768) {
      showFilterModal.value = true;
      localStorage.setItem("showFilterModal", showFilterModal.value);
    }
  }
);
</script>

<style lang="scss" scoped>
.main {
  font-weight: 700;
  font-size: 18px;
  color: #000;
  max-width: 90%;
  margin: 0 auto;

  &__paragraph {
    font-family: "Nunito Sans", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #000;
  }
  &__title {
    font-family: "Nunito Sans", sans-serif;
    font-weight: 700;
    font-size: 28px;
    color: #000;
  }
  &__cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    max-width: 1380px;
    &-info {
      padding-bottom: 20px;
    }
    &-inform {
      display: flex;
      flex-direction: column;
      width: 75%;
    }
    &-loader {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 300px;
    }
  }
  &__items {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 40px 0;
  }
  &__search {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    background-color: #f5f5f5;
    &-input {
      width: 100%;
      padding: 10px;
      max-width: 100%;
      border: none;
      border-radius: 10px;
      background-color: transparent;
      font-size: 16px;
      color: #333;
      outline: none;
      &::placeholder {
        color: #333;
      }
    }
    &-icon {
      margin-left: 10px;
    }
  }
  &__cards-section {
    display: flex;
    gap: 40px;
    flex-direction: column;
    @media (min-width: 768px) {
      flex-direction: row;
    }
  }
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #ffffff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #f8f8f8 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.filter-button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  width: max-content;
  position: fixed;
  right: 10px;
  bottom: 10px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.3s;
}

.filter-button:hover {
  background-color: #3e8e41;
}

.filter-close-button {
  position: fixed;
  top: 10px;
  z-index: 1000;
  right: 10px;
  background-color: #f44336; /* Red */
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>