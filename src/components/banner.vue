<script setup lang="ts">
import { ref } from "vue";
const props = defineProps<{
  imgs: Array<{
    imgurl: string;
  }>;
}>();
const active_index = ref(0);
const timer = setInterval(() => {
  active_index.value++;
  if (active_index.value > props.imgs.length - 1) active_index.value = 0;
}, 5000);
</script>

<template>
  <div
    class="banner"
    :style="{ 'background-image': `url(${props.imgs[active_index]?.imgurl})` }"
  >
    <div class="wrap">
      <div class="carsouel">
        <TransitionGroup name="fade">
          <img
            v-for="(i, index) in props.imgs"
            :key="i.imgurl"
            :src="i.imgurl"
            alt=""
            v-show="index === active_index"
          />
        </TransitionGroup>
      </div>
      <img src="/banner.png" alt="" />
    </div>
  </div>
</template>

<style scoped>
.banner {
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  min-width: 1100px;
  overflow: hidden;
}
.banner::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(100px);
}
.wrap {
  box-sizing: content-box;
  position: relative;
  width: 980px;
  margin: 0 auto;
  display: flex;
}
.carsouel {
  width: 740px;
  height: 285px;
  position: relative;
  overflow: hidden;
}
.carsouel > img {
  width: 740px;
  height: 285px;
}
</style>
