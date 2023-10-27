<script setup lang="ts">
import { banner } from "@/api";
import Banner from "@/components/banner.vue";
import { ref } from "vue";
import PlaylistPreview from "./playlist_preview.vue";
import NewestAlbum from "./newest_album.vue";
import ToplistPreview from "./toplist_preview.vue";
import ArtistPreview from "./artists_preview.vue";

const loaded = ref(false);

const imgs = ref([]);
(async () => {
  const banner_get = await banner();
  imgs.value = banner_get.map((i: any) => {
    return {
      imgurl: i.imageUrl,
    };
  });
})();

loaded.value = true;
</script>
<template>
  <div class="recommend_view" v-if="loaded">
    <Banner :imgs="imgs" />
    <div class="wrap">
      <div class="l">
        <PlaylistPreview />
        <NewestAlbum />
        <!-- <ToplistPreview /> -->
      </div>
      <div class="r">
        <ArtistPreview />
      </div>
    </div>
    discover
  </div>
</template>

<style scoped>
.recommend_view {
  min-width: 1100px;
}
.wrap {
  box-sizing: border-box;
  width: 980px;
  margin: 0 auto;
  background-color: #fff;
  display: flex;
}
.l {
  width: 730px;
  padding: 20px 20px 40px;
}
.r {
  flex: 1;
  border-left: solid 1px #ccc;
  padding-top: 15px;
}
</style>
