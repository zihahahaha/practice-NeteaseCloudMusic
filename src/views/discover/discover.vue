<script setup lang="ts">
import Navbar from "@/components/sub_navbar.vue";
import { ROUTENAME } from "@/router";

const routes = [
  {
    text: "推荐",
    name: ROUTENAME.RECOMMEND,
  },
  {
    text: "排行榜",
    name: ROUTENAME.TOPLIST,
  },
  {
    text: "歌单",
    name: ROUTENAME.PLAYLIST,
  },
  {
    text: "主播电台",
    name: ROUTENAME.DJRADIO,
  },
  {
    text: "歌手",
    name: ROUTENAME.ARTIST,
  },
  {
    text: "新碟上架",
    name: ROUTENAME.ALBUM,
  },
];
</script>
<template>
  <div class="discover_view">
    <Navbar :routes="routes" :padding_left="180" />
    <RouterView />
  </div>
</template>

<style scoped>
.discover_view {
  background-color: #d3d3d3;
  min-width: var(--type_page);
  --type_page: 1100px;
  --subtype_page: 980px;
}
</style>
