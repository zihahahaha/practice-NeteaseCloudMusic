<script setup lang="ts">
import { ROUTENAME } from "@/router";
</script>

<template>
  <div class="categories">
    <div class="module">
      <div class="header">推荐</div>
      <ul class="category_list">
        <li
          class="category_item"
          :class="{
            active: !$route.query.area && !$route.query.type,
          }"
        >
          <RouterLink
            :to="{
              name: ROUTENAME.ARTIST,
            }"
            >推荐歌手</RouterLink
          >
        </li>
      </ul>
    </div>
    <div class="module">
      <div class="header">华语</div>
      <ul class="category_list">
        <li
          class="category_item"
          :class="{
            active: $route.query.area === '7' && $route.query.type === '1',
          }"
        >
          <RouterLink
            :to="{
              name: ROUTENAME.ARTIST,
              query: {
                area: 7,
                type: 1,
              },
            }"
            >华语男歌手</RouterLink
          >
        </li>
        <li
          class="category_item"
          :class="{
            active: $route.query.area === '7' && $route.query.type === '2',
          }"
        >
          <RouterLink
            :to="{
              name: ROUTENAME.ARTIST,
              query: {
                area: 7,
                type: 2,
              },
            }"
            >华语女歌手</RouterLink
          >
        </li>
        <li
          class="category_item"
          :class="{
            active: $route.query.area === '7' && $route.query.type === '3',
          }"
        >
          <RouterLink
            :to="{
              name: ROUTENAME.ARTIST,
              query: {
                area: 7,
                type: 3,
              },
            }"
            >华语组合/乐队</RouterLink
          >
        </li>
      </ul>
    </div>
    <div class="module">
      <div class="header">日本</div>
      <ul class="category_list">
        <li
          class="category_item"
          :class="{
            active: $route.query.area === '8' && $route.query.type === '1',
          }"
        >
          <RouterLink
            :to="{
              name: ROUTENAME.ARTIST,
              query: {
                area: 8,
                type: 1,
              },
            }"
            >日本男歌手</RouterLink
          >
        </li>
        <li
          class="category_item"
          :class="{
            active: $route.query.area === '8' && $route.query.type === '2',
          }"
        >
          <RouterLink
            :to="{
              name: ROUTENAME.ARTIST,
              query: {
                area: 8,
                type: 2,
              },
            }"
            >日本女歌手</RouterLink
          >
        </li>
        <li
          class="category_item"
          :class="{
            active: $route.query.area === '8' && $route.query.type === '3',
          }"
        >
          <RouterLink
            :to="{
              name: ROUTENAME.ARTIST,
              query: {
                area: 8,
                type: 3,
              },
            }"
            >日本组合/乐队</RouterLink
          >
        </li>
      </ul>
    </div>
    <div class="module">
      <div class="header">韩国</div>
      <ul class="category_list">
        <li
          class="category_item"
          :class="{
            active: $route.query.area === '16' && $route.query.type === '1',
          }"
        >
          <RouterLink
            :to="{
              name: ROUTENAME.ARTIST,
              query: {
                area: 16,
                type: 1,
              },
            }"
            >韩国男歌手</RouterLink
          >
        </li>
        <li
          class="category_item"
          :class="{
            active: $route.query.area === '16' && $route.query.type === '2',
          }"
        >
          <RouterLink
            :to="{
              name: ROUTENAME.ARTIST,
              query: {
                area: 16,
                type: 2,
              },
            }"
            >韩国女歌手</RouterLink
          >
        </li>
        <li
          class="category_item"
          :class="{
            active: $route.query.area === '16' && $route.query.type === '3',
          }"
        >
          <RouterLink
            :to="{
              name: ROUTENAME.ARTIST,
              query: {
                area: 16,
                type: 3,
              },
            }"
            >韩国组合/乐队</RouterLink
          >
        </li>
      </ul>
    </div>
    <div class="module">
      <div class="header">其他</div>
      <ul class="category_list">
        <li
          class="category_item"
          :class="{
            active: $route.query.area === '0' && $route.query.type === '1',
          }"
        >
          <RouterLink
            :to="{
              name: ROUTENAME.ARTIST,
              query: {
                area: 0,
                type: 1,
              },
            }"
            >其他男歌手</RouterLink
          >
        </li>
        <li
          class="category_item"
          :class="{
            active: $route.query.area === '0' && $route.query.type === '2',
          }"
        >
          <RouterLink
            :to="{
              name: ROUTENAME.ARTIST,
              query: {
                area: 0,
                type: 2,
              },
            }"
            >其他女歌手</RouterLink
          >
        </li>
        <li
          class="category_item"
          :class="{
            active: $route.query.area === '0' && $route.query.type === '3',
          }"
        >
          <RouterLink
            :to="{
              name: ROUTENAME.ARTIST,
              query: {
                area: 0,
                type: 3,
              },
            }"
            >其他组合/乐队</RouterLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.categories {
  padding-top: 55px;
  background-color: #f9f9f9;
}
.module {
  margin-bottom: 20px;
  border-bottom: solid 1px #ccc;
  padding-bottom: 10px;
}
.header {
  height: 25px;
  font-size: 16px;
  padding-left: 14px;
  font-weight: 700;
}
.category_item {
  width: 160px;
}
.category_item > a {
  display: block;
  color: #333333;
  height: 29px;
  line-height: 29px;
  font-size: 12px;
  padding-left: 27px;
  background: url(singer.png) no-repeat;
  background-position: 0 -30px;
}

.category_item.active > a {
  background-position: 0 0;
}
</style>
