<script setup lang="ts">
import { ref, watch } from "vue";
import Category from "./category.vue";
import { getArtists } from "@/api";
import type { ApiType } from "@/api";
import { useRoute } from "vue-router";

const route = useRoute();
const artists = ref<ApiType<typeof getArtists>>([]);

watch(
  [() => route.query.area, () => route.query.type],
  async () => {
    if (route.query.area && route.query.type) {
      artists.value = await getArtists({
        area: Number(route.query.area),
        type: Number(route.query.type),
      });
      window.scrollTo({
        top: 0,
      });
    } else {
      artists.value = await getArtists("hot");
    }
  },
  {
    immediate: true,
  }
);
</script>
<template>
  <div class="artist_view">
    <div class="wrap">
      <Category />
      <div class="artists">
        <header class="card_header">歌手</header>

        <div class="artists_detail">
          <div v-for="i in artists.slice(0, 10)" class="artist_1">
            <img :src="`${i.img1v1Url}?param=130y130`" alt="" />
            <div class="artist_name">{{ i.name }}</div>
          </div>
        </div>

        <div class="artists_else">
          <div v-for="i in artists.slice(10)" class="artist_2">
            {{ i.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.artist_view {
  min-width: var(--type_pag);
}
.wrap {
  width: var(--subtype_page);
  margin: auto;
  background-color: #fff;
  display: grid;
  grid-template-columns: 180px auto;
}

.artists {
  padding: 40px;
}

.card_header {
  font-size: 24px;
  height: 40px;
  border-bottom: 2px solid #c20c0c;
  display: flex;
  margin-top: 15px;
}

.artists_detail {
  display: grid;
  grid-template-columns: repeat(5, 20%);
  grid-template-rows: auto auto;
  row-gap: 25px;
  margin-top: 20px;
}
.artist_1 > img {
  width: 130px;
  height: 130px;
  object-fit: contain;
}
.artist_name {
  margin-top: 5px;
}

.artists_else {
  border-top: dotted 1px #ccc;
  margin-top: 25px;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(5, 20%);
  row-gap: 10px;
}

.artist_2 {
  color: #000;
}
.artist_2::after {
  content: "";
  display: inline-block;
  position: relative;
  width: 17px;
  height: 18px;
  background: url("icon.png") no-repeat;
  background-position: 0px -740px;
  top: 5px;
  left: 5px;
}
</style>
