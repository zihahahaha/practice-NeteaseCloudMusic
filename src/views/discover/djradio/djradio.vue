<script setup lang="ts">
import CategoryModule from "./category_module.vue";
import type { ApiType } from "@/api";
import { getDjRadioCategory, getDjRadios } from "@/api";
import type { DjRadio } from "@/api";
import { ref } from "vue";

async function getRadios(id: any) {
  return await getDjRadios({
    cateId: id,
    limit: 4,
  });
}

const radios = ref<
  Array<{
    name: string;
    id: number;
    list: DjRadio[];
  }>
>([]);

const categories = ref<ApiType<typeof getDjRadioCategory>>([]);
(async () => {
  categories.value = await getDjRadioCategory();
  categories.value.slice(0, 4).forEach(async (i) => {
    radios.value.push({
      name: i.name,
      id: i.id,
      list: (await getRadios(i.id)).slice(0, 4),
    });
  });
})();
</script>
<template>
  <div class="djradio_view">
    <div class="wrap">
      <div class="categories">
        <RouterLink
          v-for="category in categories"
          custom
          :to="{
            path: '/discover/djradio/category',
            query: {
              id: category.id,
            },
          }"
          v-slot="{ navigate, href }"
        >
          <a
            :href="href"
            @click="navigate"
            class="category"
            :class="{ active: $route.query.id === String(category.id) }"
          >
            <div
              class="icon"
              :style="{
                'background-image': `url(${category.picWebUrl})`,
              }"
            />
            <em>{{ category.name }}</em>
          </a>
        </RouterLink>
      </div>

      <CategoryModule v-if="$route.query.id" />

      <div v-else>
        <div class="block" v-for="i in radios">
          <header class="card_header">
            <RouterLink
              class="list_title"
              :to="{
                path: '/discover/djradio/category',
                query: {
                  id: i.id,
                },
              }"
              >{{ i.name }}</RouterLink
            >
            <span style="font-family: simsun, \5b8b\4f53">·</span>电台
            <div class="more">更多 ></div>
          </header>
          <ul class="radios">
            <li v-for="radio in i.list" class="radio">
              <img :src="radio.picUrl" alt="" />
              <div class="title">{{ radio.name }}</div>
              <div class="txt">{{ radio.rcmdtext }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.djradio_view {
  min-width: var(--type_page);
}
.wrap {
  box-sizing: border-box;
  padding: 40px;
  margin: 0 auto;
  width: var(--subtype_page);
  background-color: #fff;
}

.categories {
  display: grid;
  grid-template-columns: repeat(9, auto);
  margin-bottom: 20px;
}

.category {
  display: block;
  width: 70px;
  height: 70px;
  background-position: 0 0;
  text-align: center;
}

.category {
  color: #888;
  background-image: url(radio_bg.png);
  background-position: 0 9999px;
  background-repeat: no-repeat;
}

.category:hover {
  background-position: 0 0;
}
.category.active {
  background-position: -70px 0;
  color: #d35757;
}

.icon {
  width: 48px;
  height: 48px;
  margin: 0 11px;
}
.category.active .icon {
  background-position: -48px 0;
}

:deep(.card_header) {
  font-size: 24px;
  height: 40px;
  border-bottom: 2px solid #c20c0c;
  display: flex;
  margin-top: 15px;
}

.list_title {
  color: #000;
}
.list_title:hover {
  text-decoration: underline;
}

.radios {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  column-gap: 15px;
  row-gap: 15px;
}

.radio {
  display: grid;
  grid-template-columns: 120px auto;
  grid-template-rows: 55px auto;
  column-gap: 25px;
  border-bottom: solid 1px #666;
  padding: 15px 0;
}
.radio > img {
  width: 120px;
  height: 120px;
  grid-row-start: 1;
  grid-row-end: 3;
}

.radio > .title {
  font-size: 18px;
  margin: 16px 0 20px;
}

.radio > .txt {
  line-height: 20px;
  color: #999;
}
.more {
  position: absolute;
  right: 0;
  color: #666666;
  font-size: 12px;
  margin-top: 10px;
  cursor: pointer;
}
.more:hover {
  text-decoration: underline;
}
</style>
