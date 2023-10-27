<script setup lang="ts">
import type { ApiType } from "@/api";
import { getPlaylists } from "@/api";
import { ref, watch } from "vue";
import Page from "@/components/page.vue";
import Categroy from "./categroy.vue";
import Playlist from "@/components/playlist.vue";
import { useRoute } from "vue-router";
const route = useRoute();

const playlists = ref<ApiType<typeof getPlaylists>>([]);
const active_page = ref(1);
const max_page = ref(1);
const page_limit = 35;

// params
watch(active_page, async () => {
  playlists.value = await getPlaylists({
    limit: page_limit,
    offset: (active_page.value - 1) * page_limit,
    cat: route.query.cat as string,
  });
  window.scrollTo({
    top: 0,
  });
});

watch(
  () => route.query.cat,
  async () => {
    active_page.value = 1;
    const data = await getPlaylists(
      {
        limit: page_limit,
        offset: (active_page.value - 1) * page_limit,
        cat: route.query.cat as string,
      },
      true
    );
    playlists.value = data.list;
    max_page.value = Math.ceil(data.count / page_limit);
  },
  {
    immediate: true,
  }
);
</script>
<template>
  <div class="playlist_view">
    <div class="wrap">
      <Categroy />
      <header class="card_header">
        <div class="title">
          {{ $route.query.cat ? $route.query.cat : "全部" }}
        </div>
        <div class="more"></div>
      </header>
      <div class="playlists">
        <Playlist v-for="playlist in playlists" :playlist="playlist">
          <div class="playlist_title">{{ playlist.name }}</div>
        </Playlist>
      </div>
      <Page :limit="9" :max="max_page" v-model:active_index="active_page" />
    </div>
  </div>
</template>

<style scoped>
.playlist_view {
  min-width: 1100px;
}

.wrap {
  box-sizing: border-box;
  width: 980px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
}
.playlists {
  display: grid;
  flex-wrap: wrap;
  grid-template-columns: repeat(5, 20%);
}
.playlist_title {
  color: #000;
  font-size: 14px;
  margin: 8px 0 3px 0;
}
.card_header {
  font-size: 24px;
  height: 40px;
  border-bottom: 2px solid #c20c0c;
  display: flex;
  margin-top: 15px;
}

.playlist_set {
  margin-top: 30px;
}
</style>
