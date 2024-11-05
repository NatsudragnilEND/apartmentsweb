<template>
  <div class="container">
    <h2 class="title">Where & What?</h2>
    <ul class="buttons">
      <li
        v-for="(option, i) in buttons"
        :key="i"
        @click="openModal(option.class)"
        :class="option.class"
        class="buttons__button"
      >
        <p v-if="!option.optional" class="important">*</p>
        {{ chosenOptions[option.class] || option.title }}
        <img
          class="checkmark"
          v-show="chosenOptions[option.class]"
          src="../assets/img/check.png"
          alt=""
        />
      </li>
    </ul>
    <button :disabled="isdisabled" @click="publish" class="publish">Publish</button>
    <Modal
      :retrieve="retrieve"
      @dateSelected="closeModal"
      :upload="upload"
      @selectOption="handleOptionSelect"
      @closeModal="closeModal"
      :type="activeModal"
      :buttons="buttons"
      @handleDate="handleDate"
      @handleInput="handleInput"
    />
  </div>
</template>

<script setup>
import Modal from "./Modal.vue";
import { ref, onMounted } from "vue";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "vue-router";
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://pvtiygusmsbegsmduytj.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2dGl5Z3VzbXNiZWdzbWR1eXRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzOTAwODYsImV4cCI6MjAzODk2NjA4Nn0.fSHfPEUFSa5iAVLkY02MduJ0EfOb8kPwJG7ZIHH_yYk';
const supabase = createClient(supabaseUrl, supabaseKey);
const router = useRouter()
const props = defineProps({
  allItems: Array,
});
let isdisabled = ref(false)
const buttons = [
  { title: "Select City", class: "city", optional: false },
  {
    title: "Region",
    class: "region",
    optional: false,
  },
  { title: "Select Property Type", class: "type", optional: false },
  { title: "Readiness", class: "readiness", optional: false },
  {
    title: "Completion Date",
    class: "completiondate",
    isCalendar: true,
    optional: false,
  },
  { title: "Status", class: "status", optional: false },
  { title: "Furnishing", class: "furnishing", optional: false },
  { title: "Area (sq m)", class: "ploshad", isInput: true, optional: false },
  {
    title: "Developer",
    class: "developer",
    optional: false,
  },
  {
    title: "Project Name",
    class: "projectname",
    isInput: true,
    isText: true,
    optional: false,
  },
  {
    title: "Number of Bedrooms",
    class: "roomcount",
    isInput: true,
    optional: false,
  },
  { title: "View", class: "view", isInput: true, isText: true, optional: true }, // Marked as optional
  {
    title: "Apartment series",
    class: "apartmentnumber",
    isInput: true,
    optional: true,
  }, // Marked as optional
  { title: "Renders", class: "renders", isUpload: true, optional: true }, // Marked as optional
  { title: "Floor Plan", class: "floorplan", isUpload: true, optional: true }, // Marked as optional
  { title: "Payment plan", class: "invoice", isUpload: true, optional: true }, // Marked as optional
  { title: "Price", class: "price", isInput: true, optional: false },
  { title: "Post-Delivery", class: "postdelivery", optional: false },
  {
    title: "Comments",
    class: "comment",
    isInput: true,
    isText: true,
    optional: true,
  },
  
];

const publish = async () => {
  // Check for any required fields (non-optional) that are not filled
  const unfilledRequiredFields = buttons.filter(
    (button) => !button.optional && !chosenOptions.value[button.class]
  );

  // Check if all required fields are filled
  if (unfilledRequiredFields.length > 0) {
    alert("Please fill out all required fields before publishing.");
    return;
  }

  // Generate a unique ID for the object
  const newId = uuidv4();

  // Retrieve uploaded images if available
  chosenOptions.value.gallery = localStorage.uploadedImages 
    ? JSON.parse(localStorage.uploadedImages)
    : null;

  // Add 'id' to the data
  const newApartmentData = {
    id: newId,
    ...chosenOptions.value,
  };
  isdisabled.value = true
  // Create a new record in 'apartmentdatas'
  const { data, error } = await supabase
    .from('apartmentdatas')
    .insert([newApartmentData])
    .select();

  if (error) {
    console.error("Error inserting data:", error);
    alert("Error adding data.");
    return;
  }

  console.log("Data inserted successfully:", data);
  router.push('/')
};

const handleDate = (title) => {
  // Convert DD/MM/YYYY to YYYY-MM-DD
  const [day, month, year] = title.split('/');
  const isoDate = `${year}-${month}-${day}`;

  // Parse the ISO date string
  const parsedDate = Date.parse(isoDate); 

  if (!isNaN(parsedDate)) {
    const dateObj = new Date(parsedDate);
    const formattedDate = dateObj.toISOString().slice(0, 10);

    chosenOptions.value[activeModal.value] = formattedDate;
    activeModal.value = null;
  } else {
    // Handle invalid date string 
    console.error("Invalid date string:", title);
    // You might want to display an error message to the user
  }
};

let upload = ref(false);

let activeModal = ref(null);

let chosenOptions = ref({
  city: null,
  type: null,
  mebel: null,
  readiness: null,
  completiondate: null,
  status: null,
  furnishing: null,
  ploshad: null,
  developer: null,
  projectname: null,
  gallery: null,
  roomcount: null,
  size: null,
  view: null,
  objectnumber: null,
  renders: null,
  floorplan: null,
  invoice: null,
  price: null,
  postdelivery: null,
  comment: null,
  region: null, // Add "region" to chosenOptions
});

const retrieve = ref(false);

const openModal = (data) => {
  activeModal.value = data;
  if (
    activeModal.value === "renders" ||
    activeModal.value === "floorPlan" ||
    activeModal.value === "invoice"
  ) {
    retrieve.value = true;
  } else {
    retrieve.value = false;
  }
};

const closeModal = () => {
  activeModal.value = null;
};

const handleOptionSelect = (title) => {
  chosenOptions.value[activeModal.value] = title;
  activeModal.value = null;
};

const handleInput = (input) => {
  chosenOptions.value[activeModal.value] = input;
  activeModal.value = null;
  input = "";
};

onMounted(async () => {
  // Load existing data from Supabase on component mount
  const { data, error } = await supabase
    .from('apartmentdatas')
    .select('*');

  if (error) {
    console.error("Error retrieving data:", error);
  } else {
    props.allItems.length = 0; // Clear existing array
    props.allItems.push(...data); // Update with data from Supabase
  }
});
</script>

<style lang="scss">
.publish {
  padding: 15px;
  background: #1976d2;
  color: white;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 15px;
  margin-top: 30px;
}
.important {
  color: red;
  position: absolute;
  left: -25px;
}
.square {
  position: absolute;
  bottom: 9px;
}
.dummy {
  position: relative;
}
.div {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.checkmark {
  max-height: 30px;
  max-width: 30px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input {
  background: transparent;
  border: none;
  color: white;
  max-width: 133px;

  &::placeholder {
    color: white;
    font-size: 16px;
  }
  &:focus-visible {
    outline: none;
  }
}
.container {
  margin: 0 auto;
  width: 100%;
  max-width: 430px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  padding:70rem 0;
}
.title {
  color: var(--red);
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 20px;
}
.buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  &__button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--red);
    border-radius: 8px;
    padding: 10px 16px;
    cursor: pointer;
    width: 100%;
    max-width: 330px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    animation: fadeInUp 1s ease-in-out;
    overflow: visible;
    &:hover {
      background-color: var(--hovered);
      transform: translateY(-4px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>