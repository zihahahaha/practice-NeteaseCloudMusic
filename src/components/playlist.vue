<script setup lang="ts">
import type { Playlist } from "@/api";
import { getSong, getPlaylist } from "@/api";
import { useSongUrlStore } from "@/stores/song_url";

const store = useSongUrlStore();
const props = defineProps<{
  playlist: Playlist;
}>();

async function song() {
  const playlist = await getPlaylist(props.playlist.id);
  return (await getSong(playlist.tracks[0].id)).url;  
}

async function handlePlayBtnClick() {
  store.song_url = await song();
}
</script>

<template>
  <div :class="$style.playlist">
    <div :class="$style.cover">
      <img :src="playlist.coverImgUrl" alt="" />
      <div :class="$style.bar">
        <button :class="$style.play_btn" @click="handlePlayBtnClick"></button>
      </div>
    </div>
    <div :class="$style.info">
      <slot />
    </div>
  </div>
</template>

<style module>
.playlist {
  width: 140px;
}

.cover {
  width: 140px;
  height: 140px;
  position: relative;
}

.cover > img {
  width: 100%;
  height: 100%;
}

.cover > .bar {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 27px;
  background: url(coverall.png) no-repeat;
  background-position: 0 -537px;
}

.play_btn {
  border: none;
  background: url(iconall.png) no-repeat;
  background-position: 0 0;
  width: 16px;
  height: 17px;
  position: absolute;
  right: 10px;
  bottom: 5px;
}
.play_btn:hover {
  background-position: 0 -60px;
}
</style>
