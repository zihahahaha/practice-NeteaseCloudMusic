<script setup lang="ts">
import Title from "./title.vue";
import { ROUTENAME } from "@/router";
import { topAlist, topBlist, topClist } from "@/api";
import { ref } from "vue";

type Song = {
  name: string;
};
const a_list = ref<Song[]>();
const b_list = ref<Song[]>();
const c_list = ref<Song[]>();
(async () => {
  a_list.value = await topAlist();
  b_list.value = await topBlist();
  c_list.value = await topClist();
})();
</script>

<template>
  <div class="toplist_preview">
    <Title :to="{ name: ROUTENAME.TOPLIST }" title="榜单" />
    <div class="toplist">
      <div>
        <header>飙升榜</header>
        <ul>
          <li v-for="i in a_list">{{ i.name }}</li>
        </ul>
      </div>
      <div>
        <header>新歌榜</header>
        <ul>
          <li v-for="i in b_list">{{ i.name }}</li>
        </ul>
      </div>
      <div>
        <header>原创榜</header>
        <ul>
          <li v-for="i in c_list">{{ i.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toplist {
  display: flex;
}
</style>
