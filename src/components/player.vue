<script setup lang="ts">
import { computed, ref } from "vue";
import { useSongUrlStore } from "@/stores/song_url";

const store = useSongUrlStore();
const audio = ref<HTMLAudioElement>();

const playing_flag = ref(false);

let current_time = ref(0);
const duration = ref(0);
const width = computed(() => {
  return current_time.value / duration.value;
});
function setCurrentTime(value: number, flag = false) {
  if (flag === false && value <= 1) {
    current_time.value = duration.value * value;
  } else if (flag) {
    current_time.value = value;
  }
  if (audio.value) audio.value.currentTime = current_time.value;
}
const current_minute = computed(() => {
  return Math.floor(current_time.value / 60)
    .toString()
    .padStart(2, "0");
});
const current_second = computed(() => {
  return Math.floor(current_time.value % 60)
    .toString()
    .padStart(2, "0");
});
const duration_minute = computed(() => {
  return Math.floor(duration.value / 60)
    .toString()
    .padStart(2, "0");
});
const duration_second = computed(() => {
  return Math.floor(duration.value % 60)
    .toString()
    .padStart(2, "0");
});
function play() {
  if (audio.value?.readyState !== 0) {
    audio.value?.play();
    playing_flag.value = true;
  }
}

// handle events
function handleAudioLoadedData() {
  play();
}
function handlePlayBtnClick() {
  if (audio.value!.paused) play();
  else {
    audio.value?.pause();
    playing_flag.value = false;
  }
}
function handleAudioEnded() {
  playing_flag.value = false;
}
function handleAudioDurationChange() {
  duration.value = audio.value!.duration;
}
function handleAudioTimeUpdate() {
  current_time.value = audio.value!.currentTime;
}
function handleControlBarMouseDown(e: MouseEvent) {
  setCurrentTime(e.offsetX / 466);
}
function mouseMove(e: MouseEvent) {
  let v = width.value * 466 + e.movementX;

  if (v < 0) v = 0;
  if (v > 466) v = 466;
  setCurrentTime(v / 466);
}
function handleCTIMouseDown() {
  window.addEventListener("mousemove", mouseMove);
  window.addEventListener(
    "mouseup",
    () => {
      window.removeEventListener("mousemove", mouseMove);
    },
    {
      once: true,
    }
  );
}
</script>

<template>
  <div class="player">
    <audio
      ref="audio"
      :src="store.song_url"
      @ended="handleAudioEnded"
      @durationchange="handleAudioDurationChange"
      @timeupdate="handleAudioTimeUpdate"
      @loadeddata="handleAudioLoadedData"
    ></audio>
    <div class="btns">
      <button class="prev"></button>
      <button
        class="play"
        :class="{
          playing: playing_flag,
        }"
        @click="handlePlayBtnClick"
      ></button>
      <button class="next"></button>
    </div>
    <div class="pic"></div>
    <div class="state">
      <div class="info">
        <span>a</span>
        <span>b</span>
        <span>c</span>
      </div>
      <div class="control">
        <div class="control_bar" @mousedown="handleControlBarMouseDown">
          <div class="timeline" :style="{ width: `${width * 100}%` }">
            <div
              class="cti"
              @mousedown.stop="handleCTIMouseDown"
              draggable="false"
            ></div>
          </div>
        </div>
        <span class="time">{{
          `${current_minute}:${current_second}/${duration_minute}:${duration_second}`
        }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.player {
  min-width: 750px;
  position: fixed;
  bottom: 0;
  height: 47px;
  padding-top: 6px;
  width: 100%;
  display: flex;
  background: url(playbar.png) repeat-x 0 0;
  justify-content: center;
}

.btns {
  display: flex;
  justify-content: center;
  align-items: center;
}

.prev {
  width: 28px;
  height: 28px;
  border: none;
  background: url(playbar.png);
  background-position: 0px -130px;
}
.play {
  width: 36px;
  height: 36px;
  border: none;
  background: url(playbar.png);
  background-position: 0 -204px;
  margin: 0 8px;
}

.playing {
  background-position: 0 -165px;
}

.next {
  width: 28px;
  height: 28px;
  border: none;
  background: url(playbar.png);
  background-position: -80px -130px;
}
.pic {
  width: 34px;
  height: 34px;
}

.state {
  width: 581px;
}

.info {
  height: 28px;
  color: #e8e8e8;
  line-height: 28px;
}

.control {
  position: relative;
  height: 19px;
  position: relative;
}

.control_bar {
  background: url(statbar.png) no-repeat;
  background-position: right 0;
  width: 446px;
  height: 9px;
  position: relative;
}

.timeline {
  background: url(statbar.png) no-repeat;
  background-position: left -66px;
  height: 9px;
  position: relative;
  width: 0;
}

.timeline > .cti {
  background: url(iconall.png) no-repeat;
  width: 22px;
  height: 24px;
  background-position: 0 -250px;
  position: absolute;
  top: -7px;
  right: -13px;
}

.time {
  position: absolute;
  top: -1px;
  right: 57px;
  color: #797979;
  text-shadow: 0 1px 0 #121212;
}
</style>
