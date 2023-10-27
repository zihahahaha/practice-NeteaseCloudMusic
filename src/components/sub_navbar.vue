<script setup lang="ts">
import type { ROUTENAME } from "@/router";
import { watch } from "vue";
type Route = {
  text: string;
  name: ROUTENAME;
};
const props = defineProps<{
  routes: Route[];
  padding_left: number;
}>();
</script>

<template>
  <nav class="navbar">
    <div class="wrap">
      <ul class="nav" :style="{ 'padding-left': `${props.padding_left}px` }">
        <RouterLink
          custom
          :to="{ name: i.name }"
          v-slot="{ navigate, href, isExactActive }"
          v-for="i in props.routes"
        >
          <li class="nav_item" :class="{ active: isExactActive }">
            <a :href="href" @click="navigate">
              <div>{{ i.text }}</div>
            </a>
          </li>
        </RouterLink>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  margin-top: -1px;
  height: 35px;
  background-color: #c20c0c;
  min-width: 1100px;
}

.wrap {
  width: 1100px;
  margin: auto;
}

.nav {
  display: flex;
}

.nav_item {
  list-style: none;
  height: 34px;
}
.nav_item > a {
  display: block;
  height: 34px;
  color: white;
  overflow: hidden;
}
.nav_item div {
  display: block;

  height: 20px;
  margin: 7px 17px 0;
  padding: 0 13px;
  line-height: 20px;
  color: #fff;
}
.nav_item:hover div {
  background-color: #9b0909;
  border-radius: 20px;
}
.nav_item.active div {
  background-color: #9b0909;
  border-radius: 20px;
}
</style>
