<script setup>
import { ref, computed, onMounted, defineProps } from 'vue';

// Define props
const props = defineProps({
  images: Object, // The images are passed as an object
  preload: Boolean // Optional preload flag
});

// Convert the object of images into an array for easy iteration
const imagesArray = Object.values(props.images); // Object.values to extract an array of image URLs

// Preload images if the preload flag is set
if (props.preload) {
  onMounted(() => {
    for (const imageSource of imagesArray) {
      const img = new Image();
      img.src = imageSource;
    }
  });
}


const currentImageKey = ref(0);


const currentImage = computed(() => {
  return imagesArray[currentImageKey.value];
});

// Count the total number of images
const imagesCount = computed(() => imagesArray.length);

// Function to move to the next image
function setNextImage() {
  if (currentImageKey.value < imagesCount.value - 1) {
    currentImageKey.value += 1;
  } else {
    currentImageKey.value = 0; // Loop back to the first image
  }
}

// Set the default image on mouse leave
function setDefaultImage() {
  currentImageKey.value = 0;
}

// Set the image based on mouse hover
function setImageByHover(e) {
  const targetRects = e.target.getClientRects()[0];
  const mouseX = e.offsetX <= 0 ? 1 : e.offsetX;
  const targetWidth = targetRects.width;
  const mouseOverPercentage = (mouseX / targetWidth) * 100;

  const imagePercentage = 100 / imagesCount.value;
  currentImageKey.value = Math.ceil(mouseOverPercentage / imagePercentage) - 1;

  // Ensure the hovered image is valid, if not, skip to the next
  if (!imagesArray[currentImageKey.value]) {
    setNextImage();
  }
}
</script>

<template>
  <div class="image__slider" @mousemove="setImageByHover" @mouseleave="setDefaultImage">
    <img class="image__slider-img" :src="currentImage" alt="" />
    <div class="image__slider-img_counter">
      <span
        :class="{ selected: currentImageKey === i - 1 }"
        v-for="i in imagesCount" :key="i"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

.image__slider {
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset -1px 11px 20px 0px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }

  &-img {
    width: 285px;  // Fixed width
    height: 198px; // Fixed height
    object-fit: cover;  // Ensures image fits without distortion
  }

  &:hover &-img_counter {
    opacity: 1;
  }

  &-img_counter {
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 4px;
    opacity: 0;
    transition: opacity 200ms;

    span {
      border: 1px solid #bbb;
      width: 100%;
    }

    span.selected {
      border-color: grey;
    }
  }
}
</style>
