<script setup lang="ts">
import Title from "./title.vue";
import { ROUTENAME } from "@/router";
import { newestAlbum } from "@/api";
import { ref } from "vue";
import Album from "@/components/album.vue";
import type { ApiType } from "@/api";
import { shortGetAlbums } from "@/api";

const albums = ref<ApiType<typeof shortGetAlbums>>([]);

(async () => {
  albums.value = await shortGetAlbums();
})();

const index = ref(0);
const move = ref("");
let flag = false;
function prev() {
  if (flag) return;
  flag = true;
  move.value = "prev";
  index.value--;
  if (index.value < 0) index.value = 1;
}
function next() {
  if (flag) return;
  flag = true;
  move.value = "next";
  index.value++;
  if (index.value > 1) {
    index.value = 0;
  }
}
function afterLeave() {
  flag = false;
}
</script>

<template>
  <div class="newest_album">
    <Title :to="{ name: ROUTENAME.ALBUM }" title="新碟上架" />
    <div class="wrap">
      <div class="album">
        <button class="prev" @click="prev" />
        <div class="inner">
          <Transition :name="move" @after-leave="afterLeave">
            <ul class="list" v-if="index === 0">
              <li v-for="album in albums.slice(0, 5)" class="album_item">
                <Album :album="album" type="s" style="padding: 0" />
              </li>
            </ul>
            <ul class="list" v-else>
              <li v-for="album in albums.slice(5, 10)" class="album_item">
                <Album :album="album" type="s" style="padding: 0" />
              </li>
            </ul>
          </Transition>
        </div>
        <button class="next" @click="next" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  border: 1px solid #d3d3d3;
  margin: 20px 0 37px;
}
.album {
  padding: 0 16px;
  border: solid 1px #fff;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
}

.inner {
  width: 650px;
  overflow: hidden;
  position: relative;
}
.list {
  display: flex;
  margin-top: 28px;
  width: 650px;
  transition: all 1s;
}
.album_item {
  position: relative;
  flex-shrink: 0;
  width: 118px;
  height: 150px;
  margin-left: 11px;
}
.album_item > img {
  width: 100px;
  height: 100px;
}
.mask {
  position: absolute;
  left: 0;
  top: 0;
  height: 100px;
  width: 118px;
  background: url(/coverall.png);
  background-position: 0 -570px;
}

.prev {
  background: url(index.png) no-repeat;
  background-position: -260px -75px;
  width: 17px;
  height: 17px;
  border: none;
  cursor: pointer;
  position: relative;
  top: 71px;
}
.prev:hover {
  background-position: -280px -75px;
}
.next {
  background: url(index.png) no-repeat;
  background-position: -300px -75px;
  width: 17px;
  height: 17px;
  border: none;
  cursor: pointer;
  position: relative;
  top: 71px;
}
.next:hover {
  background-position: -320px -75px;
}

.next-leave-active,
.prev-leave-active {
  position: absolute;
}
.next-enter-from {
  translate: 100% 0;
}
.next-leave-to {
  translate: -100% 0;
}
.prev-leave-to {
  translate: 100% 0;
}
.prev-enter-from {
  translate: -100% 0;
}
</style>
