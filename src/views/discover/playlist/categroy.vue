<script setup lang="ts">
import { getPlaylistCategories } from "@/api";
import type { ApiType } from "@/api";
import { ref } from "vue";
import { ROUTENAME } from "@/router";

const categories = ref<ApiType<typeof getPlaylistCategories>>([]);
(async () => {
  categories.value = await getPlaylistCategories();
  console.log(categories.value);
})();
</script>

<template>
  <RouterLink :to="{ name: ROUTENAME.PLAYLIST }" class="all"
    >全部风格</RouterLink
  >
  <div v-for="i in categories" class="cate">
    <div class="first_level">
      <div class="title">{{ i.name }}</div>
    </div>
    <ul class="categories">
      <li v-for="category in i.list" class="second_level">
        <RouterLink
          :to="{
            name: ROUTENAME.PLAYLIST,
            query: {
              cat: category.name,
            },
          }"
          >{{ category.name }}</RouterLink
        >
      </li>
    </ul>
  </div>
</template>

<style scoped>
.all {
  display: block;
  width: 90px;
  text-align: center;
  font-size: 16px;
  padding: 3px 10px;
  color: #fff;
  border: solid 1px #aaa;
  border-radius: 8px;
  background-color: #c20c0c;
  margin-bottom: 10px;
}
.all:hover {
  text-decoration: underline;
}
.cate {
  display: grid;
  grid-template-columns: 35px auto;
}
.categories {
  display: flex;
  flex-wrap: wrap;
}
.first_level {
  position: relative;
  border-right: solid 1px #ccc;
}
.first_level > .title {
  font-size: 14px;
  font-weight: 700;
  position: absolute;
  top: 50%;
  translate: 0 -50%;
}
.second_level {
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  position: relative;
  margin-left: -1px;
}

.second_level > a {
  color: #666;
}
.second_level > a:hover {
  text-decoration: underline;
}
.second_level::before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  width: 1px;
  background-color: #ccc;
  height: 10px;
  top: 15px;
}
.second_level::after {
  content: "";
  display: block;
  position: absolute;
  right: 0;
  width: 1px;
  background-color: #ccc;
  height: 10px;
  top: 15px;
}
</style>
