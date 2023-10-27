<script setup lang="ts">
import type { ApiType } from "@/api";
import { shortGetAlbums, getAlbums } from "@/api";
import { ref } from "vue";
import Album from "@/components/album.vue";
import { ROUTENAME } from "@/router";
import { onBeforeRouteUpdate } from "vue-router";

const short_albums = ref<ApiType<typeof shortGetAlbums>>([]);
const all_albums = ref<ApiType<typeof shortGetAlbums>>([]);

(async () => {
  short_albums.value = await shortGetAlbums();
  all_albums.value = await getAlbums({});
})();

async function updateAllAlbums(area: Parameters<typeof getAlbums>[0]["area"]) {
  all_albums.value = await getAlbums({
    area,
  });
}

onBeforeRouteUpdate((to) => {
  const { area } = to.query;
  // 不检查类型，可能会埋隐患，可能需要类型化路由来支持
  updateAllAlbums(area as any);
});
</script>
<template>
  <div class="album_view">
    <div class="wrap">
      <div class="newest_albums">
        <header class="card_header">新碟上架</header>
        <ul class="albums">
          <li v-for="album in short_albums">
            <Album :album="album" type="m" />
          </li>
        </ul>
      </div>

      <div class="all_albums">
        <header class="card_header">
          <div>全部新碟</div>
          <div class="list">
            <RouterLink :to="{ name: ROUTENAME.ALBUM, query: { area: 'ALL' } }"
              >全部</RouterLink
            >
            <span class="line" />
            <RouterLink :to="{ name: ROUTENAME.ALBUM, query: { area: 'ZH' } }"
              >华语</RouterLink
            >
            <span class="line" />
            <RouterLink :to="{ name: ROUTENAME.ALBUM, query: { area: 'EA' } }"
              >欧美</RouterLink
            >
            <span class="line" />
            <RouterLink :to="{ name: ROUTENAME.ALBUM, query: { area: 'KR' } }"
              >韩国</RouterLink
            >
            <span class="line" />
            <RouterLink :to="{ name: ROUTENAME.ALBUM, query: { area: 'JP' } }"
              >日本</RouterLink
            >
          </div>
        </header>
        <ul class="albums">
          <li v-for="album in all_albums">
            <Album :album="album" type="m" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.album_view {
  min-width: 1100px;
}

.wrap {
  box-sizing: border-box;
  width: 980px;
  margin: 0 auto;
  background-color: #fff;
  padding: 40px;
}

.card_header {
  font-size: 24px;
  height: 40px;
  border-bottom: 2px solid #c20c0c;
  display: flex;
}

.list {
  display: flex;
  margin: 12px 0 0 20px;
  font-size: 12px;
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

.albums {
  display: grid;
  grid-template-columns: repeat(5, 20%);
  margin-top: 20px;
}
</style>
