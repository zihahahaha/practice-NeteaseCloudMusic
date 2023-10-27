<script setup lang="ts">
import { ROUTENAME } from "@/router";
import Title from "./title.vue";
import type { ApiType } from "@/api";
import { getPlaylists } from "@/api";
import { ref } from "vue";
import Playlist from "@/components/playlist.vue";

const list = ref<ApiType<typeof getPlaylists>>([]);

(async () => {
  list.value = await getPlaylists({
    cat: "hot",
    limit: 8,
  });
})();
</script>

<template>
  <div class="toplist_preview">
    <Title :to="{ name: ROUTENAME.PLAYLIST }" title="热门推荐">
      <template v-slot:list>
        <div class="list">
          <RouterLink :to="{ name: ROUTENAME.PLAYLIST, query: { cat: '华语' } }"
            >华语</RouterLink
          >
          <span class="line" />
          <RouterLink :to="{ name: ROUTENAME.PLAYLIST, query: { cat: '流行' } }"
            >流行</RouterLink
          >
          <span class="line" />
          <RouterLink :to="{ name: ROUTENAME.PLAYLIST, query: { cat: '摇滚' } }"
            >摇滚</RouterLink
          >
          <span class="line" />
          <RouterLink :to="{ name: ROUTENAME.PLAYLIST, query: { cat: '民谣' } }"
            >民谣</RouterLink
          >
          <span class="line" />
          <RouterLink :to="{ name: ROUTENAME.PLAYLIST, query: { cat: '电子' } }"
            >电子</RouterLink
          >
        </div>
      </template>
    </Title>
    <ul class="toplist">
      <li v-for="playlist in list">
        <Playlist :playlist="playlist">
          <div :class="$style.playlist_title">{{ playlist.name }}</div>
        </Playlist>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.list {
  display: flex;
  margin: 7px 0 0 20px;
}
.list > a {
  color: #666;
}
.list > a:hover {
  text-decoration: underline;
}
.line {
  width: 1px;
  height: 10px;
  background-color: #000;
  margin: 0 10px;
}

.toplist {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: repeat(2, auto);
  row-gap: 30px;
}

</style>

<style module>
.playlist_title {
  color: #000;
  margin: 8px 0 3px 0;
  font-size: 14px;
}
</style>
