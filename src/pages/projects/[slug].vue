<template>
  <div class="project__page">
    <h1 class="route">
      <a class="back_btn" @click="$router.push('/')">Главная</a> /
      {{ current.title }}
    </h1>
    <!-- Using Nuxt's $router for navigation -->

    <div class="project_view">
      <div class="project_view-description">
        <h1 class="project__title">{{ current.title }}</h1>
        <ImageCarousel
          :images="parsedGallery(current.gallery)"
          v-model:img-key="imgKey"
        />
        <ImageCarouselSelector
          :images="parsedGallery(current.gallery)"
          v-model:img-key="imgKey"
        />
        <div class="descr" v-if="current.text">
          <h2 class="project_view-description-title">Описание Проекта</h2>
          <div
            
            class="project_view-description-text"
            v-html="current.text"
          ></div>
        </div>
      </div>

      <!-- Cards section on the right side -->
      <div class="project_view-cards">
        <!-- First Card -->
        <div class="project_card">
          <div
            class="project_card-data-padding_container project_card-padding_container"
          >
            <div class="project_card-data">
              <!-- Dynamic Data for the project -->
              <div class="project_card-data_item">
                <span>Площадь дома:</span
                ><span>{{ current.total_area }} м²</span>
              </div>
              <div class="project_card-data_item">
                <span>Размер дома:</span
                ><span
                  >{{ current.length_house }} х
                  {{ current.width_house }} м</span
                >
              </div>
              <div class="project_card-data_item">
                <span>Кол-во спален:</span
                ><span>{{ current.bedrooms_count }}</span>
              </div>
              <div class="project_card-data_item">
                <span>Кол-во санузлов:</span
                ><span>{{ current.bathrooms }}</span>
              </div>
              <div class="project_card-data_item">
                <span>Гараж:</span><span>{{ current.garage_presence }}</span>
              </div>
              <div class="project_card-data_item">
                <span>Материал:</span><span>{{ current.wall_material }}</span>
              </div>
            </div>
          </div>
          <hr />
          <div class="project_card-cost">
            <span>Стоимость проекта:</span>
            <span>{{ formatCurrency(current.price) }}</span>
          </div>
        </div>

        <!-- Second Card (Form) -->
        <form class="project_card project_card__form">
          <div class="project_card-padding_container">
            <input type="text" name="name" placeholder="Имя" />
            <input type="text" name="phone" placeholder="Телефон" />

            <div class="project_card__form-messenger">Мессенджер:</div>
            <label>
              <input type="radio" name="messenger" value="telegram" />
              Телеграм
            </label>
            <label>
              <input type="radio" name="messenger" value="whatsapp" />
              Whatsapp
            </label>
          </div>
          <button type="submit">Купить проект</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import projects from "../../server/database/projects.json";
const route = useRoute();
let current: Object = {};
for (const i in projects) {
  if (projects[i].slug == route.params.slug) {
    current = projects[i];
  }
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  }).format(value);
}

function parsedGallery(gallery: string) {
  try {
    return JSON.parse(gallery);
  } catch (error) {
    console.error("Error parsing gallery JSON:", error);
    return {};
  }
}

let imgKey = ref(0);
</script>
<style scoped lang="scss">
@use "../../assets/style/config.scss"; // Make sure your SCSS config is correctly imported

.back_btn {
  cursor: pointer;

}
.route{
  margin-bottom: 10px;
  max-width: 100%;
}
.project__title {
  font-weight: 700;
  font-size: 28px;
  color: #01161e;
}
.descr {
  display: flex;
  flex-direction: column;
  row-gap: 40px;
}
.project_view-description {
  flex-shrink: 1;
  &-title {

    font-weight: 700;
    font-size: 28px;
    line-height: 100%;
    color: #01161e;
  }
  &-text {
    font-weight: 400;
    font-size: 14px;
    color: #222;
  }
}

.project_view {
  display: flex;
  gap: 2rem;
}

.project_view-cards {
  position: sticky;
  top: 1rem;
  height: max-content;
}

.project_card__form {
  overflow: clip;

  input[type="text"] {
    width: 100%;
    padding: 0.25rem 0.5rem;
    font: inherit;
  }

  input + input {
    margin-top: 1rem;
  }

  &-messenger {
    margin-top: 1rem;
  }

  button[type="submit"] {
    width: 100%;
    border: none;
    padding: 1rem 0;
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    background-color: config.$main-color-darker;
    transition: background-color 150ms;

    &:hover {
      background-color: config.$main-color;
    }
  }
}

.project_card {
  --border-radius: 2rem;
  min-width: 350px;
  height: min-content;
  box-shadow: 0 2px 5px rgba(#000, 0.2);
  border-radius: var(--border-radius);

  & + & {
    margin-top: 2rem;
  }

  &-padding_container {
    padding: 2rem;
  }

  & > hr {
    margin: 0;
  }

  &-cost {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    font-size: 1.25rem;
    font-weight: bold;
  }

  &-data {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &_item {
      display: flex;
      justify-content: space-between;

      span:first-child {
        opacity: 0.75;
      }

      span:last-child {
        font-weight: bold;
      }
    }
  }

  &-reserve {
    width: 100%;
    height: 3rem;
    border: none;
    font-size: 1.25rem;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
    cursor: pointer;
    background-color: config.$main-color;
  }
}
</style>
