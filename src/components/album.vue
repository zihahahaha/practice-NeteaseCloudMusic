<script setup lang="ts">
import type { Album } from "@/api";
const props = defineProps<{
  album: Album;
  type: "s" | "m";
}>();
</script>

<template>
  <div class="c-album" :class="props.type">
    <div class="cover">
      <img :src="`${props.album.picUrl}?param=100y100`" alt="" />
      <a class="mask" href="#"></a>
    </div>
    <div>{{ props.album.name }}</div>
  </div>
</template>

<style scoped>
.mask {
  background: url(/coverall.png);
  position: absolute;
  left: 0;
  top: 0;
}

.cover {
  position: relative;
}

.cover > img {
  width: 100%;
  height: 100%;
}

.c-album.s {
  width: 118px;
  height: 150px;
}
.c-album.s > .cover {
  width: 100px;
  height: 100px;
}

.c-album.s .mask {
  height: 100px;
  width: 118px;
  background-position: 0 -570px;
}

.c-album.m {
  width: 153px;
  height: 178px;
}

.c-album.m > .cover {
  width: 130px;
  height: 130px;
}
.c-album.m .mask {
  width: 153px;
  height: 130px;
  background-position: 0 -845px;
}
</style>
