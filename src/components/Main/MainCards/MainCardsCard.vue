<template>
  <div class="main__cards-card">
    <RouterLink :to="`/projects/${card.id}`">
      <div v-if="card.gallery" class="main__cards-card-img">
        <img
          :src="card.gallery[0]"
          alt=""
          class="main__cards-card-img-preview"
        />
        
      </div>
      <div class="info">
        <div class="main__cards-card-info">
          <h2 class="main__cards-card-title">{{ card.projectname }}</h2>
          <h2 class="main__cards-card-region">{{ card.region }}</h2>
          <span class="price">{{ card.price + ' RUB' }}</span>
        </div>
        <span class="line"></span>
        <div class="read__more tooltip">
          <h2>Read more</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="currentColor"
              d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
            />
          </svg>
          <span class="tooltip-text">View Project Details</span>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
// Props for the card data
const props = defineProps({
  card: {
    type: Object,
    required: true,
    default: () => ({
      id: 123, // Example ID
      title: "Modern Apartment in City Center", 
      region: "Downtown, Cityville",
      gallery: ["https://via.placeholder.com/600x400"], // Example image URL
      price: 12000000 // Example price
    })
  },
});

// Format currency in RUB
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  }).format(value);
}
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
  display: inline-block;

  .tooltip-text {
    visibility: hidden;
    width: max-content;
    background-color: rgba(0, 0, 0, 0.75);
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    white-space: nowrap;
  }

  &:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
}

.info {
  padding: 0 20px;
  color: #000;
}
.read__more {
  display: flex;
  align-items: center;
  padding: 20px 0;
  gap: 15px;
}
.line {
  border-top: 1px solid rgba(0, 0, 0, 0.66);
  width: 400px;
  height: 1px;
  display: block;
  padding-bottom: 12px;
}
.price {
  font-size: 15px;
  line-height: 100%;
  color: #000;
}
.tooltip {
  position: relative;

  .tooltip-text {
    visibility: hidden;
    width: max-content;
    background-color: rgba(0, 0, 0, 0.75);
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    white-space: nowrap;
  }

  &:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
}

.main__cards-card {
  transition-duration: 0.2s;
  cursor: pointer;
  border-radius: 1rem;
  max-width: 300px;
  min-width: 300px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: -1px 2px 5px 0 rgba(0, 0, 0, 0.1);
  background: #f3f3f3;
  &-info {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 40px 0;
  }
  &-title {
    font-weight: 700;
    font-size: 1.3rem;
    transition-property: black;
    color: #000;
    transition-duration: inherit;
    letter-spacing: 0.4px;
  }
  &-region {
    font-family: "Montserrat";
    font-weight: 400;
    font-size: 18px;
    line-height: 144%;
    color: #000;
  }
  &-price {
    font-weight: 700;
    font-size: 1.2rem;
    color: #000;
  }
  &-img {
    position: relative;
    &-preview {
      width: 100%;
      object-fit: cover;
      height: 100%;
      max-height: 274px;
    }
  }

  &-icons {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-icon {
      display: flex;
      align-items: center;
      gap: 0.5ch;
      opacity: 0.6;
      transition: opacity 200ms;

      & span {
        font-weight: 400;
        font-size: 14px;
        color: #000;
      }

      &:hover {
        opacity: 1;
      }

      svg {
        width: 1.5em;
      }
    }
  }
}
</style>