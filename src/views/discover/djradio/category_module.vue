<script setup lang="ts">
import type { ApiType } from "@/api";
import { getDjRadioCategory, getNewestDjRadios, getDjRadios } from "@/api";
import { ref, watch } from "vue";
import Page from "@/components/page.vue";
import { ROUTENAME } from "@/router";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
const route = useRoute();

const newest_djradios = ref<ApiType<typeof getNewestDjRadios>>([]);
const djradios = ref<ApiType<typeof getDjRadios>>([]);

const max_pages = ref<number>(0);
const active_page = ref(1);
const per_page_limit = 31;
async function updateNewestDjRadio(id: any) {
  newest_djradios.value = await getNewestDjRadios(Number(id));
}
async function updateDjRadio(id: any) {
  const result = await getDjRadios(
    {
      cateId: id,
      offset: per_page_limit * (active_page.value - 1),
    },
    true
  );
  djradios.value = result.djradios;
  max_pages.value = Math.ceil(result.count / per_page_limit);
}



// 处理param
watch(
  active_page,
  () => {
    updateDjRadio(route.query.id);
    window.scrollTo({
      top: 0,
    });
  },
  {
    immediate: true,
  }
);
watch(
  () => route.query.id,
  () => {
    if (route.query.id) {
      updateNewestDjRadio(route.query.id);
      updateDjRadio(route.query.id);
      active_page.value = 1;
    }
    window.scrollTo({
      top: 0,
    });
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="category_module" v-if="$route.query.id">
    <div class="recommend">
      <header class="card_header">优秀新电台</header>
      <ul class="hot_djradio">
        <li v-for="djradio in newest_djradios.slice(0, 5)" class="djradio1">
          <img :src="djradio.picUrl" alt="" />
          <div class="dj_title">{{ djradio.name }}</div>
          <div class="dj_txt">{{ djradio.rcmdtext }}</div>
        </li>
      </ul>
    </div>

    <div class="toplist">
      <header class="card_header">电台排行榜</header>
      <ul class="djradios">
        <li v-for="djradio in djradios" class="djradio2">
          <img :src="djradio.picUrl" alt="" />
          <div class="dj_name">{{ djradio.name }}</div>
          <div class="dj_nickname">{{ djradio.dj.nickname }}</div>
          <div class="dj_count">收藏：{{ djradio.subCount }}</div>
        </li>
      </ul>
      <Page
        style="margin-top: 15px"
        :limit="9"
        :max="max_pages"
        v-model:active_index="active_page"
      />
    </div>
  </div>
</template>

<style scoped>
.hot_djradio {
  display: flex;
  margin-left: -37px;
  margin-top: 16px;
}

.djradio1 {
  margin-left: 37px;
}
.djradio1 > img {
  width: 150px;
  height: 150px;
}

.dj_title {
  color: #333333;
  font-size: 14px;
  line-height: 16px;
}
.dj_txt {
  color: #999999;
  line-height: 18px;
}

.djradios {
  display: grid;
  grid-template-columns: repeat(2, auto);
  row-gap: 20px;
}

.djradio2 {
  display: grid;
  grid-template-columns: 120px auto;
  grid-template-rows: 64px auto auto;
  column-gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #e7e7e7;
}

.djradio2 > img {
  width: 120px;
  height: 120px;
  grid-row-start: 1;
  grid-row-end: 4;
  grid-column-start: 1;
  grid-column-end: 2;
}

.dj_name {
  grid-row-start: 1;
  grid-row-end: 2;
  grid-column-start: 2;
  grid-column-end: 3;
  font-size: 18px;
  font-weight: 700;
  line-height: 64px;
}

.dj_nickname {
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 2;
  grid-column-end: 3;
}
.dj_count {
  grid-row-start: 3;
  grid-row-end: 4;
  grid-column-start: 2;
  grid-column-end: 3;
}
</style>
