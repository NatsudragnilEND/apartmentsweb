<template>
    <div class="cont">
      <h1>Delete Product</h1>
  
      <div v-if="isLoading">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
  
      <div v-else-if="products.length === 0">
        <p>No products found.</p>
      </div>
  
      <div v-else>
        <div class="products-grid">
          <div
            v-for="product in products"
            :key="product.id"
            class="product-card"
            :class="{ 'deleted-card': product.isDeleted }"
          >
            <div
              class="product-card-image"
              v-if="product.gallery && product.gallery.length > 0"
            >
              <img :src="product.gallery[0]" alt="Product Image" />
            </div>
            <div class="product-card-content">
              <h2 class="product-card-title">{{ product.projectname }}</h2>
              <p class="product-card-price">{{ product.price + " RUB" }}</p>
              <button
                class="delete-button"
                @click="showModal(product.id)"
                :disabled="product.isDeleted"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <div v-if="showDeleteModal" class="delete-modal">
        <div class="modal-content">
          <h2 class="modal-title">Are you sure you want to delete this product?</h2>
          <p class="modal-description">
            This action cannot be undone.
          </p>
          <div class="modal-buttons">
            <button @click="cancelDelete" class="cancel-button">Cancel</button>
            <button @click="deleteProduct(selectedProductId)" class="delete-button">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { createClient } from '@supabase/supabase-js';
  
  const supabaseUrl = 'https://pvtiygusmsbegsmduytj.supabase.co';
  const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2dGl5Z3VzbXNiZWdzbWR1eXRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzOTAwODYsImV4cCI6MjAzODk2NjA4Nn0.fSHfPEUFSa5iAVLkY02MduJ0EfOb8kPwJG7ZIHH_yYk';
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  const products = ref([]);
  const isLoading = ref(true);
  const showDeleteModal = ref(false);
  const selectedProductId = ref(null);
  
  onMounted(async () => {
    try {
      const { data: apartmentData, error } = await supabase
        .from('apartmentdatas')
        .select('*');
  
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        products.value = apartmentData;
        isLoading.value = false;
      }
    } catch (err) {
      console.error('Error fetching apartment data:', err);
    }
  });
  
  const deleteProduct = async (productId) => {
    try {
      // Delete the product from Supabase
      const { error } = await supabase
        .from('apartmentdatas')
        .delete()
        .eq('id', productId);
  
      if (error) {
        console.error('Error deleting product:', error);
      } else {
        // Update the products array after deletion
        products.value = products.value.map((product) => {
          if (product.id === productId) {
            return { ...product, isDeleted: true };
          }
          return product;
        });
  
        // Close the modal
        showDeleteModal.value = false;
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  const showModal = (productId) => {
    selectedProductId.value = productId;
    showDeleteModal.value = true;
  };
  
  const cancelDelete = () => {
    showDeleteModal.value = false;
  };
  </script>
  
  <style scoped>
  
  .products-grid {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
  
  .product-card {
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    position: relative;
    transition: transform 0.3s ease-in-out;
    max-width: 90%;
  }
  
  .product-card.deleted-card {
    transform: scale(0.9);
    opacity: 0.5;
    transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  }
  
  .product-card-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
  }
  h1{
    width: max-content;
    color: rgb(72, 72, 205);
    font-size: 20px !important;
    font-weight: 600;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .product-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .product-card-content {
    padding: 10px;
  }
  
  .product-card-title {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .product-card-price {
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 10px;
  }
  
  .delete-button {
    background-color: #f44336;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
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
    border: 8px solid #000;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #000 transparent transparent transparent;
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
  
  .delete-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  
  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 90%;
    max-width: 400px;
  }
  
  .modal-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .modal-description {
    font-size: 1rem;
    color: #555;
    margin-bottom: 20px;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .cancel-button,
  .delete-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .cancel-button {
    background-color: #ccc;
    color: #333;
  }
  
  .delete-button {
    background-color: #f44336;
    color: white;
  }
  
  @media (max-width: 300px) {
    .product-card {
      grid-template-columns: 1fr;
      gap: 5px;
    }
    .product-card-title {
      font-size: 1rem;
    }
    .product-card-price {
      font-size: 0.8rem;
    }
    .delete-button {
      font-size: 0.9rem;
      padding: 5px 10px;
    }
    .modal-content {
      width: 95%;
      max-width: 300px;
    }
    .modal-title {
      font-size: 1.3rem;
    }
    .modal-description {
      font-size: 0.9rem;
    }
  }
  </style>