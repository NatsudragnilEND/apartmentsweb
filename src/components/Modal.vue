<template>
  <div class="modal" @click="$emit('closeModal')" v-show="type">
    <div class="modal__content" @click.stop="">
      <!-- Conditionally render list or upload based on `isUploadModal` -->
      <div v-if="isUploadModal" class="modal__content-upload">
        <Upload @closeModal="$emit('closeModal')" />
      </div>
      <div v-else-if="isCalendarModal" class="modal__content-calendar">
        <Datepicker
          v-model="selectedDate"
          @update:model-value="handleDate"
          @closed="$emit('handleDate', selectedDate)"
        />
      </div>
      <div v-else-if="isInputModal" class="modal__content-input">
        <h2>{{ propstitle }}</h2>
        <div class="input__div">
          <input
            class="modal__content-input-inp"
            :placeholder="propstitle"
            :type="propstype ? 'text' : 'number'"
            v-model="input"
          />
          <p v-show="type == 'ploshad'" class="square">m2</p>
        </div>
        <div class="input__btns">
          <button @click="$emit('closeModal')" class="input__btns-btn cancel">
            отменить
          </button>
          <button @click="saveInput" class="input__btns-btn save">
            сохранить
          </button>
        </div>
      </div>

      <!-- Adjusted for conditional scroll styling -->
      <div
        v-else
        :style="{ overflowY: (type === 'region' || type === 'developer') ? 'scroll' : 'none' }"
        class="modal__content-options"
      >
        <h2 class="modal__content-title">{{ propstitle }}</h2>
        <ul class="modal__content-list">
          <li
            v-for="(option, i) in options[type]"
            :key="i"
            class="modal__content-list-link"
            @click="$emit('selectOption', option.title)"
          >
            {{ option.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script setup>
import Filter from "./Filter/Filter.vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref, computed } from "vue";
import Upload from "./Upload.vue";
import { inject } from "vue";

// Define emit function
const emit = defineEmits(["handleInput", "closeModal", "selectOption"]);
const saveImage = ref(false);
const input = ref("");
const selectedDate = ref(null);

// Save input and clear field
const saveInput = () => {
  emit("handleInput", input.value);
  input.value = " ";
};

const handleDate = (date) => {
  const formattedDate = new Date(date).toLocaleDateString("en-GB");
  selectedDate.value = formattedDate;
};

const props = defineProps({
  type: String,
  buttons: Array,
});

const options = inject('options')

const propstitle = computed(() => {
  const matchingButton = props.buttons.find(
    (button) => button.class === props.type
  );
  return matchingButton ? matchingButton.title : "";
});

const propstype = computed(() => {
  const matchingButton = props.buttons.find(
    (button) => button.class === props.type
  );
  return matchingButton.isInput ? matchingButton.isText : "";
});

const isUploadModal = computed(() => {
  const matchingButton = props.buttons.find(
    (button) => button.class === props.type
  );
  return matchingButton ? matchingButton.isUpload : false;
});

const isInputModal = computed(() => {
  const matchingButton = props.buttons.find(
    (button) => button.class === props.type
  );
  return matchingButton ? matchingButton.isInput : false;
});

const isCalendarModal = computed(() => {
  const matchingButton = props.buttons.find(
    (button) => button.class === props.type
  );
  return matchingButton ? matchingButton.isCalendar : false;
});
</script>

<style lang="scss" scoped>
.cancel {
  background: transparent;
  transition: 0.3s;
  &:hover {
    border: 1px #1976d2 solid;
  }
}
.save {
  background: #1976d2;
  color: white;
}
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
.modal {

  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;

  &__content {
    
    max-height: 650px;
    height: min-content;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px;
    animation: fadeIn 0.5s;
    display: flex;
    flex-direction: column;
    align-items: center;
    &-options{
      width: 100%;
    }
    &-input {
      position: relative;
      &-inp {
        border: black solid 1px;

        padding: 10px;
        min-width: 350px;
        width: 100%;
        border-radius: 10px;
        color: black;
        &::placeholder {
          color: grey;
        }
      }
    }

    &-list {
      
      &-link {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--red);
        color: white;
        border-radius: 10px;
        padding: 15px 20px;
        margin-bottom: 15px;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transform: translateY(20px);
        &:hover {
          background-color: var(--hovered);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
}
.square {
  right: 10px;
}
</style>
