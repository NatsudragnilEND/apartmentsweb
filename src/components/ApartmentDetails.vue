<template>
    <div class="product-details">
      <div class="product-info" v-if="product">
        <div class="product-image" v-if="product && product.gallery">
          <img
            :src="product.gallery[0]"
            alt="House Project Image"
            class="product-image-content"
          />
        </div>
        <h1 class="product-title">{{ product.projectname }}</h1>
        <div class="product-details-grid">
          <div class="detail-item">
            <span class="label">Region:</span>
            <span class="value">{{ product.region }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Type:</span>
            <span class="value">{{ product.type }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Status:</span>
            <span class="value">{{ product.status }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Price:</span>
            <span class="value">{{ formatCurrency(product.price) }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Bedrooms:</span>
            <span class="value">{{ product.roomcount }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Size:</span>
            <span class="value">{{ product.total_area }} sq m</span>
          </div>
          <div class="detail-item">
            <span class="label">Readiness:</span>
            <span class="value">{{ product.readiness }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Finishing:</span>
            <span class="value">{{ product.furnishing }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Post-handover:</span>
            <span class="value">{{ product.postdelivery }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Developer:</span>
            <span class="value">{{ product.developer }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Apartment series:</span>
            <span class="value">{{ product.apartmentnumber }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Completion Date:</span>
            <span class="value">{{ product.completiondate }}</span>
          </div>
          <div class="detail-item">
            <span class="label">City:</span>
            <span class="value">{{ product.city }}</span>
          </div>
          <div class="detail-item">
            <span class="label">View:</span>
            <span class="value">{{ product.view }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Comments:</span>
            <span class="value">{{ product.comment }}</span>
          </div>
        </div>
  
        <div class="product-contacts">
          <h2 class="contacts-title">Contact Us</h2>
          <p class="contacts-text">
            To learn more about this property, contact us.
          </p>
          <ul class="contact-list">
            <li>
              <a
                class="call-button-3d"
                :href="'tel:' + product.contacts"
              >
                {{ product.contacts }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="!product" class="loading-spinner">
        <div class="spinner"></div>
        <p>Loading apartment data...</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { createClient } from "@supabase/supabase-js";
  
  const supabaseUrl = "https://pvtiygusmsbegsmduytj.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2dGl5Z3VzbXNiZWdzbWR1eXRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzOTAwODYsImV4cCI6MjAzODk2NjA4Nn0.fSHfPEUFSa5iAVLkY02MduJ0EfOb8kPwJG7ZIHH_yYk";
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  const product = ref();
  const route = useRoute();
  
  onMounted(async () => {
    const productId = route.params.id;
  
    // Fetch product details from Supabase
    try {
      const { data, error } = await supabase
        .from("apartmentdatas")
        .select("*")
        .eq("id", productId); // Select by ID
  
      if (error) {
        console.error("Error fetching product details:", error);
        // Handle the error (e.g., display an error message)
      } else {
        product.value = data[0]; // Get the first element of the array
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      // Handle error
    }
  });
  
  // Format currency in RUB
  function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD", // Using USD for demonstration. Change to appropriate currency if needed
      minimumFractionDigits: 0,
    }).format(value);
  }
  </script>
  
  <style lang="scss" scoped>
  .call-button-3d {
    background-color: #007bff; /* Blue */
    color: white !important;
    padding: 5px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
  
  /* Hover Effect */
  .call-button-3d:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
  
  /* Active State */
  .call-button-3d:active {
    background-color: #003f8a; /* Even darker blue when pressed */
    transform: translateY(2px); /* Slight push down */
  }
  
  .product-details {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  
    .product-info {
      width: 100%;
  
      .product-title {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: #333;
        animation: titleFadeIn 0.8s ease;
        /* Add a subtle fade-in animation */
      }
  
      .product-details-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }
  
      .detail-item {
        border-bottom: 1px solid #eee;
        padding: 0.5rem 0;
  
        .label {
          font-weight: bold;
          display: block;
        }
  
        .value {
          margin-left: 0;
          display: block;
        }
      }
    }
  
    .product-image {
      width: 100%;
      margin-top: 1rem;
      margin-bottom: 1rem;
  
      .product-image-content {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 10px;
      }
    }
  
    .product-contacts {
      width: 100%;
      background-color: #f2f2f2;
      padding: 1rem;
      border-radius: 10px;
      margin-top: 1rem;
      text-align: center;
  
      .contacts-title {
        font-size: 1.4rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: #333;
      }
  
      .contacts-text {
        margin-bottom: 0.5rem;
        color: #555;
        font-size: 0.9rem;
      }
  
      .contact-list {
        display: inline-block;
        list-style-type: none;
        padding: 0;
        margin: 0;
  
        li {
          margin-bottom: 0.2rem;
  
          a {
            color: #333;
            text-decoration: none;
            font-weight: bold;
  
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  
    .loading-spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 200px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
  
      .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #ccc;
        border-radius: 50%;
        border-top-color: #3498db;
        animation: spin 1.2s linear infinite;
      }
  
      p {
        margin-top: 0.5rem;
        font-size: 1rem;
        color: #555;
      }
    }
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
  
    100% {
      transform: rotate(360deg);
    }
  }
  
  @keyframes titleFadeIn {
    0% {
      opacity: 0;
    }
  
    100% {
      opacity: 1;
    }
  }
  </style>