<template>
  <div class="filter-container" v-if="showFilterModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Filters</h2>
        <button
          class="close-button"
          @click="showFilterModal = false; localStorage.setItem('showFilterModal', 'false');"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12l-5.47-5.47a.75.75 0 010-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div class="filters">
        <div class="filter-item">
          <label for="emirate" class="titles">Emirate</label>
          <select id="emirate" v-model="filters.emirate">
            <option value="">Select Emirate</option>
            <option
              v-for="(data, i) in options.city"
              :key="i"
              :value="data.value"
            >
              {{ data.label }}
            </option>
          </select>
        </div>

        <div class="filter-item">
          <label for="type" class="titles">Property Type</label>
          <select id="type" v-model="filters.type">
            <option value="">Select Property Type</option>
            <option
              v-for="(type, i) in options.type"
              :key="i"
              :value="type.value"
            >
              {{ type.label }}
            </option>
          </select>
        </div>

        <div class="filter-item">
          <label for="readiness" class="titles">Readiness</label>
          <select id="readiness" v-model="filters.readiness">
            <option value="">Select Readiness</option>
            <option
              v-for="(status, i) in options.readiness"
              :key="i"
              :value="status.value"
            >
              {{ status.label }}
            </option>
          </select>
        </div>

        <div class="filter-item">
          <label for="region" class="titles">Region</label>
          <select id="region" v-model="filters.region">
            <option value="">Select Region</option>
            <option
              v-for="(data, i) in options.region"
              :key="i"
              :value="data.value"
            >
              {{ data.label }}
            </option>
          </select>
        </div>

        <div class="filter-item">
          <label for="developer" class="titles">Developer</label>
          <select id="developer" v-model="filters.developer">
            <option value="">Select Developer</option>
            <option
              v-for="(data, i) in options.developer"
              :key="i"
              :value="data.value"
            >
              {{ data.label }}
            </option>
          </select>
        </div>

        <div class="filter-item">
          <label for="rooms" class="titles">Number of Bedrooms</label>
          <input
            type="number"
            id="rooms"
            v-model.number="filters.rooms"
            placeholder="Number of Bedrooms"
          />
        </div>

        <div class="filter-item">
          <label for="price" class="titles">Price</label>
          <div class="price-range">
            <input
              type="number"
              id="priceMin"
              v-model.number="filters.priceMin"
              placeholder="Price From"
            />
            <input
              type="number"
              id="priceMax"
              v-model.number="filters.priceMax"
              placeholder="Price To"
            />
          </div>
        </div>

        <button class="apply-filter-button" @click="applyFilters">
          Apply Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pvtiygusmsbegsmduytj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2dGl5Z3VzbXNiZWdzbWR1eXRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzOTAwODYsImV4cCI6MjAzODk2NjA4Nn0.fSHfPEUFSa5iAVLkY02MduJ0EfOb8kPwJG7ZIHH_yYk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default {
  props: {
    cards: Array,
  },
  data() {
    return {
      apartments: this.cards,
      options: {
        city: [
          { value: "Dubai", label: "Dubai" },
          { value: "Abu Dhabi", label: "Abu Dhabi" },
          { value: "Sharjah", label: "Sharjah" },
          { value: "Ajman", label: "Ajman" },
          { value: "Umm Al Quwain", label: "Umm Al Quwain" },
          { value: "Ras Al Khaimah", label: "Ras Al Khaimah" },
          { value: "Fujairah", label: "Fujairah" },
        ],
        developer: [
          { value: "Aqua Properties", label: "Aqua Properties" },
          { value: "S&S Developments", label: "S&S Developments" },
          { value: "AAF Developments", label: "AAF Developments" },
          { value: "Aark Developers", label: "Aark Developers" },
          { value: "ABA Group", label: "ABA Group" },
          { value: "AG Properties", label: "AG Properties" },
          { value: "Al Habtoor Properties", label: "Al Habtoor Properties" },
          { value: "Al Marina", label: "Al Marina" },
          { value: "Aldar Properties", label: "Aldar Properties" },
          { value: "Alta Real Estate Development", label: "Alta Real Estate Development" },
          { value: "Amwaj Development", label: "Amwaj Development" },
          { value: "ANAX Developments", label: "ANAX Developments" },
          { value: "Aqasa Developers", label: "Aqasa Developers" },
          { value: "Arabian Gulf Properties", label: "Arabian Gulf Properties" },
          { value: "Axiom Prime Real Estate", label: "Axiom Prime Real Estate" },
          { value: "AYS Developers", label: "AYS Developers" },
          { value: "Azizi Developments", label: "Azizi Developments" },
          { value: "Baraka Real Estate Development", label: "Baraka Real Estate Development" },
          { value: "Beyond Developments", label: "Beyond Developments" },
          { value: "Binayah Properties", label: "Binayah Properties" },
          { value: "Binghatti Developers", label: "Binghatti Developers" },
          { value: "Blanco Thornton", label: "Blanco Thornton" },
          { value: "Citi Developers", label: "Citi Developers" },
          { value: "Condor Developers", label: "Condor Developers" },
          { value: "Condor Group", label: "Condor Group" },
          { value: "DAMAC", label: "DAMAC" },
          { value: "Danube Properties", label: "Danube Properties" },
          { value: "Deyaar", label: "Deyaar" },
          { value: "Dugasta Properties", label: "Dugasta Properties" },
          { value: "Durar Development", label: "Durar Development" },
          { value: "Eagle Hills", label: "Eagle Hills" },
          { value: "Ellington Properties", label: "Ellington Properties" },
          { value: "Emaar Properties", label: "Emaar Properties" },
          { value: "Empire Development", label: "Empire Development" },
          { value: "Enso Development", label: "Enso Development" },
          { value: "Esnad Management", label: "Esnad Management" },
          { value: "Fakhruddin Properties", label: "Fakhruddin Properties" },
          { value: "Gj Real Estate", label: "Gj Real Estate" },
          { value: "Golden Wood", label: "Golden Wood" },
          { value: "Green Group", label: "Green Group" },
          { value: "HMB Homes Real Estate Development", label: "HMB Homes Real Estate Development" },
          { value: "HRE Development", label: "HRE Development" },
          { value: "Iman Developers", label: "Iman Developers" },
          { value: "Invest Group Overseas (IGO)", label: "Invest Group Overseas (IGO)" },
          { value: "JVC Properties Dubai", label: "JVC Properties Dubai" },
          { value: "Laya Developers (Akshara Global)", label: "Laya Developers (Akshara Global)" },
          { value: "Leos Developments", label: "Leos Developments" },
          { value: "LIV Developers", label: "LIV Developers" },
          { value: "London Gate", label: "London Gate" },
          { value: "Lucky Aeon", label: "Lucky Aeon" },
          { value: "Madain Properties", label: "Madain Properties" },
          { value: "Majid Al Futtaim", label: "Majid Al Futtaim" },
          { value: "Majid Developments", label: "Majid Developments" },
          { value: "MAK Developers", label: "MAK Developers" },
          { value: "Meraas", label: "Meraas" },
          { value: "Meraki Developers", label: "Meraki Developers" },
          { value: "Mered Group", label: "Mered Group" },
          { value: "Metac Properties", label: "Metac Properties" },
          { value: "MGS Development", label: "MGS Development" },
          { value: "Mr. Eight Development", label: "Mr. Eight Development" },
          { value: "NABNI", label: "NABNI" },
          { value: "Nakheel", label: "Nakheel" },
          { value: "Nshama", label: "Nshama" },
          { value: "Object 1 Development", label: "Object 1 Development" },
          { value: "Object One Real Estate Development", label: "Object One Real Estate Development" },
          { value: "Omniyat", label: "Omniyat" },
          { value: "ORO24", label: "ORO24" },
          { value: "Pantheon Development", label: "Pantheon Development" },
          { value: "Park Group", label: "Park Group" },
          { value: "Premier Choice", label: "Premier Choice" },
          { value: "Prescott Development", label: "Prescott Development" },
          { value: "Prestige One Developments", label: "Prestige One Developments" },
          { value: "Pure Gold Real Estate Developers", label: "Pure Gold Real Estate Developers" },
          { value: "Qube Development", label: "Qube Development" },
          { value: "Reef Luxury Development", label: "Reef Luxury Development" },
          { value: "Reportage Properties", label: "Reportage Properties" },
          { value: "Rijas Aces Property", label: "Rijas Aces Property" },
          { value: "Riviera Group", label: "Riviera Group" },
          { value: "Royal Development", label: "Royal Development" },
          { value: "Samana Developers", label: "Samana Developers" },
          { value: "Segrex Development", label: "Segrex Development" },
          { value: "Signature Developers", label: "Signature Developers" },
          { value: "Sobha Realty", label: "Sobha Realty" },
          { value: "STAMN Real Estate Development", label: "STAMN Real Estate Development" },
          { value: "Summit Real Estate Development", label: "Summit Real Estate Development" },
          { value: "Svarn Development", label: "Svarn Development" },
          { value: "Tabeer Development", label: "Tabeer Development" },
          { value: "Taraf Holding", label: "Taraf Holding" },
          { value: "Tiger Properties", label: "Tiger Properties" },
          { value: "Tiger Properties Double", label: "Tiger Properties Double" },
          { value: "Town X Real Estate Development", label: "Town X Real Estate Development" },
          { value: "Tuscany", label: "Tuscany" },
          { value: "Union Properties", label: "Union Properties" },
          { value: "Valores Property Development LLC", label: "Valores Property Development LLC" },
          { value: "Vantage Properties", label: "Vantage Properties" },
          { value: "Vincitore Real Estate Development LLC", label: "Vincitore Real Estate Development LLC" },
          { value: "Wasl Properties", label: "Wasl Properties" },
        ],
        region: [
          { value: "Al Barari", label: "Al Barari" },
          { value: "Al Barsha 1", label: "Al Barsha 1" },
          { value: "Al Barsha 2", label: "Al Barsha 2" },
          { value: "Al Barsha 3", label: "Al Barsha 3" },
          { value: "Al Furjan", label: "Al Furjan" },
          { value: "Al Habtoor City", label: "Al Habtoor City" },
          { value: "Al Jaddaf", label: "Al Jaddaf" },
          { value: "Al Khail Heights", label: "Al Khail Heights" },
          { value: "Al Reem Island, Abu Dhabi", label: "Al Reem Island, Abu Dhabi" },
          { value: "Al Sufouh 1", label: "Al Sufouh 1" },
          { value: "Al Sufouh 2", label: "Al Sufouh 2" },
          { value: "Al Wasl (City Walk)", label: "Al Wasl (City Walk)" },
          { value: "Arabian Ranches", label: "Arabian Ranches" },
          { value: "Arabian Ranches 2", label: "Arabian Ranches 2" },
          { value: "Arabian Ranches 3", label: "Arabian Ranches 3" },
          { value: "Arjan", label: "Arjan" },
          { value: "Barsha South", label: "Barsha South" },
          { value: "Bluewaters Island", label: "Bluewaters Island" },
          { value: "Business Bay", label: "Business Bay" },
          { value: "Cherrywoods", label: "Cherrywoods" },
          { value: "City of Arabia", label: "City of Arabia" },
          { value: "Complex (Dubailand)", label: "Complex (Dubailand)" },
          { value: "Creekside", label: "Creekside" },
          { value: "Culture Village", label: "Culture Village" },
          { value: "Damac Hills", label: "Damac Hills" },
          { value: "Damac Hills 2", label: "Damac Hills 2" },
          { value: "Damac Lagoons", label: "Damac Lagoons" },
          { value: "Discovery Gardens", label: "Discovery Gardens" },
          { value: "Downtown Dubai", label: "Downtown Dubai" },
          { value: "Dubai Creek Harbour", label: "Dubai Creek Harbour" },
          { value: "Dubai Design District", label: "Dubai Design District" },
          { value: "Dubai Festival City", label: "Dubai Festival City" },
          { value: "Dubai Golf City", label: "Dubai Golf City" },
          { value: "Dubai Harbour", label: "Dubai Harbour" },
          { value: "Dubai Healthcare City", label: "Dubai Healthcare City" },
          { value: "Dubai Hills", label: "Dubai Hills" },
          { value: "Dubai International", label: "Dubai International" },
          { value: "Dubai Investment Park", label: "Dubai Investment Park" },
          { value: "Dubai Islands", label: "Dubai Islands" },
          { value: "Dubai Marina", label: "Dubai Marina" },
          { value: "Jumeirah Lake Towers (JLT)", label: "Jumeirah Lake Towers (JLT)" },
          { value: "Jumeirah Park", label: "Jumeirah Park" },
          { value: "Jumeirah Village Circle (JVC)", label: "Jumeirah Village Circle (JVC)" },
          { value: "Jumeirah Village Triangle (JVT)", label: "Jumeirah Village Triangle (JVT)" },
          { value: "La Mer", label: "La Mer" },
          { value: "Liwan", label: "Liwan" },
          { value: "Madina Jumeirah Living", label: "Madina Jumeirah Living" },
          { value: "Mesk District", label: "Mesk District" },
          { value: "Mina Al Arab, Ras Al Khaimah", label: "Mina Al Arab, Ras Al Khaimah" },
          { value: "Mina Rashid", label: "Mina Rashid" },
          { value: "Mirdif Hills", label: "Mirdif Hills" },
          { value: "Mirdif Tulip", label: "Mirdif Tulip" },
          { value: "Mohammed Bin Rashid City (MBR)", label: "Mohammed Bin Rashid City (MBR)" },
          { value: "Motor City", label: "Motor City" },
          { value: "Mudon", label: "Mudon" },
          { value: "Nad Al Sheba", label: "Nad Al Sheba" },
          { value: "Nshama", label: "Nshama" },
          { value: "Old Town", label: "Old Town" },
          { value: "Park Gate Residences", label: "Park Gate Residences" },
          { value: "Palm Jumeirah", label: "Palm Jumeirah" },
          { value: "Ras Al Khor", label: "Ras Al Khor" },
          { value: "Remraam", label: "Remraam" },
          { value: "Rashid Yachts and Marina", label: "Rashid Yachts and Marina" },
          { value: "Sharjah", label: "Sharjah" },
          { value: "Sheikh Zayed Road", label: "Sheikh Zayed Road" },
          { value: "The Greens", label: "The Greens" },
          { value: "The Lakes", label: "The Lakes" },
          { value: "The Meadows", label: "The Meadows" },
          { value: "The Springs", label: "The Springs" },
          { value: "The Sustainable City", label: "The Sustainable City" },
          { value: "The Valley", label: "The Valley" },
          { value: "The Villa", label: "The Villa" },
          { value: "The World Islands", label: "The World Islands" },
          { value: "Tilal Al Ghaf", label: "Tilal Al Ghaf" },
          { value: "Town Square", label: "Town Square" },
          { value: "Villanova", label: "Villanova" },
          { value: "Wadi Al Safa 5", label: "Wadi Al Safa 5" },
          { value: "YAS Island", label: "YAS Island" },
        ],
        type: [
    { value: "Apartment", label: "Apartment" },
    { value: "Villa", label: "Villa" },
    { value: "Townhouse", label: "Townhouse" },
    { value: "Penthouse", label: "Penthouse" },
    { value: "Duplex", label: "Duplex" },
    { value: "Studio", label: "Studio" },
    { value: "Commercial Property", label: "Commercial Property" },
    { value: "Office", label: "Office" },
    { value: "Retail", label: "Retail" },
    { value: "Land", label: "Land" },
    { value: "Hotel", label: "Hotel" },
    { value: "Serviced Apartment", label: "Serviced Apartment" },
    { value: "Condominium", label: "Condominium" }, // Added Condominium
    { value: "Single Family Home", label: "Single Family Home" }, // Added Single Family Home
    { value: "Multi-Family Home", label: "Multi-Family Home" }, // Added Multi-Family Home
    { value: "Warehouse", label: "Warehouse" }, // Added Warehouse
    { value: "Industrial", label: "Industrial" }, // Added Industrial
    { value: "Farm", label: "Farm" }, // Added Farm
    { value: "Ranch", label: "Ranch" }, // Added Ranch
    { value: "Boat Slip", label: "Boat Slip" }, // Added Boat Slip
    { value: "Parking Space", label: "Parking Space" }, // Added Parking Space
  ],
        readiness: [
          { value: "READY", label: "READY" },
          { value: "UNDER CONSTRUCTION", label: "UNDER CONSTRUCTION" },
          { value: "SHORT TERM RENTAL", label: "SHORT TERM RENTAL" },
        ],
      },
      filters: {
        emirate: "",
        type: "", // Changed to string for single selection
        readiness: "", // Changed to string for single selection
        region: "",
        developer: "",
        rooms: null,
        priceMin: null,
        priceMax: null,
      },
      showFilterModal: false,
    };
  },
  computed: {
    filteredApartments() {
      return this.apartments.filter((apartment) => {
        // Check emirate
        if (this.filters.emirate && apartment.city !== this.filters.emirate) {
          return false;
        }

        // Check type
        if (this.filters.type && apartment.type !== this.filters.type) {
          return false;
        }

        // Check readiness
        if (
          this.filters.readiness &&
          apartment.readiness !== this.filters.readiness
        ) {
          return false;
        }

        // Check region
        if (this.filters.region && apartment.region !== this.filters.region) {
          return false;
        }

        // Check developer
        if (
          this.filters.developer &&
          apartment.developer !== this.filters.developer
        ) {
          return false;
        }

        // Check rooms
        if (this.filters.rooms && apartment.rooms !== this.filters.rooms) {
          return false;
        }

        // Check price range
        if (
          this.filters.priceMin !== null &&
          apartment.price < this.filters.priceMin
        ) {
          return false;
        }

        if (
          this.filters.priceMax !== null &&
          apartment.price > this.filters.priceMax
        ) {
          return false;
        }

        return true;
      });
    },
  },
  watch: {
    filteredApartments(newFilteredList) {
      this.$emit("filteredResults", newFilteredList);
    },
    showFilterModal(newValue) {
      localStorage.setItem("showFilterModal", newValue);
    },
  },
  mounted() {
    // Fetch data from Supabase
    supabase
      .from("apartmentdatas")
      .select("*")
      .then((response) => {
        this.apartments = response.data; // Update apartments array
        this.$emit("filteredResults", this.filteredApartments); // Emit initial filtered results
      })
      .catch((error) => {
        console.error("Error fetching apartments:", error);
        // Handle errors appropriately (e.g., display an error message)
      });

    // Load showFilterModal from localStorage
    const savedShowFilterModal = localStorage.getItem("showFilterModal");
    if (savedShowFilterModal !== null) {
      this.showFilterModal = JSON.parse(savedShowFilterModal);
    }
  },
  methods: {
    applyFilters() {
      this.showFilterModal = false;
      localStorage.setItem("showFilterModal")
      this.$emit("filteredResults", this.filteredApartments);
    },
  },
};
</script>

<style lang="scss" scoped>
input::placeholder {
  font-size: 14px;
  padding: 0 0 0 5px;
}

.filter-container {
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
  transition: opacity 0.3s ease-in-out;

  &.hide {
    opacity: 0;
    pointer-events: none;
  }
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  /* Adjust max-width as needed */
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-title {
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 21px;
  color: #000;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.price-range {
  display: flex;
  gap: 5px;
}

.apartment-list {
  list-style-type: none;
  padding: 0;
}

input::placeholder {
  color: black;
}

input {
  color: black;
  border: 0.5px solid grey;
  border-radius: 5px;
  padding: 5px;
}

select {
  border: 0.5px solid grey;
  border-radius: 5px;
  padding: 5px;
}

.titles {
  font-size: 14px;
}

.apply-filter-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
}
</style>