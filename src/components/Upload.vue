<template>
  <div class="upload-container">
    <h2>Upload Images</h2>
    <input type="file" @change="handleFileUpload" accept="image/*" multiple />
    <div v-if="imageUrls.length" class="preview-images">
      <div v-for="(url, index) in imageUrls" :key="index" class="preview-image">
        <img :src="url" alt="Uploaded Image" />
      </div>
    </div>
    <div class="input__btns">
      <button @click="$emit('closeModal')" class="input__btns-btn cancel">
        отменить
      </button>
      <button @click="saveImages" class="input__btns-btn save">
        сохранить
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  saveImage: Boolean,
});
const imageUrls = ref([]); // Stores image URLs for preview
const base64Images = ref([]); // Stores base64 images for saving
const promises = ref([]); // Store promises to track image processing

const handleFileUpload = async (event) => {
  const files = event.target.files;
  imageUrls.value = [];
  base64Images.value = [];
  promises.value = []; // Clear previous promises

  promises.value = Array.from(files).map((file) => {
    if (file.type.startsWith("image/")) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target.result;
          imageUrls.value.push(result); // Add URL to preview array
          base64Images.value.push(result); // Add base64 image to storage array
          resolve();
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    } else {
      alert("Only image files are allowed.");
      return Promise.reject("File type not supported.");
    }
  });
};

const emit = defineEmits(["closeModal"]);

const saveImages = async () => {
  try {
    await Promise.all(promises.value); // Ensure all images processed
    localStorage.setItem("uploadedImages", JSON.stringify(base64Images.value));
  } catch (error) {
    console.error("Error uploading images:", error);
    alert("Failed to upload some images.");
  }
  emit('closeModal'); // Emit close command after saving images
};

const retrieveImages = () => {
  const savedImages = JSON.parse(localStorage.getItem("uploadedImages"));
  if (savedImages) {
    imageUrls.value = savedImages;
  } else {
    return "";
  }
};
</script>

<style lang="scss" scoped>
.input {
  &__btns {
    padding-top: 5px;
    display: flex;
    justify-content: end;
    gap: 15px;
    &-btn {
      font-size: 12px;
      cursor: pointer;
      padding: 4px;
      border: black 1px solid;
      border-radius: 7px;
      outline: none;
    }
  }
  &__div {
    position: relative;
  }
}
.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.preview-images {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.preview-image img {
  max-width: 100px;
  max-height: 100px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
