<script setup lang="ts">
import { ROUTENAME } from "@/router";
import { getArtists } from "@/api";
import type { ApiType } from "@/api";
import { ref } from "vue";

const artists = ref<ApiType<typeof getArtists>>([]);

(async () => {
  artists.value = await getArtists("hot");
})();
</script>

<template>
  <div class="artists">
    <header class="card_header">
      <div class="title">推荐歌手</div>
      <RouterLink class="more" :to="{ name: ROUTENAME.ARTIST }"
        >查看全部 ></RouterLink
      >
    </header>
    <div v-for="i in artists.slice(0, 5)" class="artist">
        <img :src="`${i.img1v1Url}?param=62y62`" alt="">
        <div class="name">{{ i.name }}</div>
    </div>
  </div>
</template>

<style scoped>
.card_header {
  font-size: 14px;
  border-bottom: solid 1px #ccc;
  position: relative;
  height: 25px;
  line-height: 25px;
  margin: 0 15px;
}

.title {
  font-weight: 700;
  margin-left: 10px;
}
.more {
  position: absolute;
  right: 0;
  top: 0;
}
.more {
  color: #666;
  font-size: 12px;
}
.artist {
    display: flex;
    margin: 15px 15px;
    border: solid 1px #ccc;
    background-color: #fafafa;
}
.name {
    font-size: 14px;
    font-weight: 700;
    margin-left: 10px;
}
</style>
