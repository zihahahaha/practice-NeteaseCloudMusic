<script setup lang="ts">
import Search from "./search.vue";
import Notwork from "../notwork.vue";
</script>

<template>
  <nav class="navbar">
    <div class="wrap">
      <h1 class="logo">
        <RouterLink to="/discover">网易云音乐</RouterLink>
      </h1>
      <ul class="nav">
        <RouterLink custom to="/discover" v-slot="{ isActive, navigate, href }">
          <li class="nav_item" :class="{ active: isActive }">
            <a :href="href" @click="navigate">发现音乐</a>
          </li>
        </RouterLink>
        <RouterLink custom to="/my" v-slot="{ isActive, navigate, href }">
          <li class="nav_item" :class="{ active: isActive }">
            <a :href="href" @click="navigate">我的音乐</a>
          </li>
        </RouterLink>
        <RouterLink custom to="/friend" v-slot="{ isActive, navigate, href }">
          <li class="nav_item" :class="{ active: isActive }">
            <a :href="href" @click="navigate">关注</a>
          </li>
        </RouterLink>
        <li class="nav_item">
          <a href="https://music.163.com/store/product" target="_blank">商城</a>
        </li>
        <li class="nav_item">
          <a href="https://music.163.com/st/musician" target="_blank">音乐人</a>
        </li>
        <li class="nav_item">
          <a href="https://music.163.com/st/ad-song" target="_blank">云推歌</a>
        </li>
        <li class="nav_item">
          <a href="https://music.163.com/#/download" target="_blank"
            >下载客户端</a
          >
          <Notwork />
        </li>
      </ul>
      <Search />
      <a class="creater_center">创作者中心</a>
      <div class="login">
        <a href="">登录</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  height: 70px;
  background-color: #242424;
  border-bottom: 1px solid #c20c0c;
  min-width: min-content;
}
.wrap {
  width: 1100px;
  margin: 0 auto;
  display: flex;
}

.logo {
  margin: 0;
  width: 176px;
  height: 69px;
  background: url(topbar.png) no-repeat 0 0;
}
.logo > a {
  text-decoration: none;
  color: transparent;
  display: block;
  width: 100%;
  height: 100%;
}
.nav {
  display: flex;
}

.nav a {
  color: #ccc;
  text-decoration: none;
}

.nav_item {
  list-style: none;
  height: 70px;
  line-height: 70px;
  padding: 0 19px;
  font-size: 14px;
  overflow: hidden;
  position: relative;
}

.nav_item > a {
  display: block;
  width: 100%;
  height: 100%;
}

.nav_item.active > a {
  color: #fff;
}

.nav_item:hover {
  background-color: #000;
}
.nav_item.active {
  background-color: #000;
}
.nav_item.active::after {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  left: 50%;
  translate: -50% 50%;
  rotate: 45deg;
  width: 10px;
  height: 10px;
  background-color: #c20c0c;
  pointer-events: none;
}

.creater_center {
  cursor: pointer;
  box-sizing: border-box;
  color: white;
  border: 1px solid #4f4f4f;
  width: 90px;
  height: 32px;
  border-radius: 16px;
  margin: 19px 0 0 12px;
  line-height: 32px;
  padding-left: 16px;
}
.creater_center:hover {
  border-color: #fff;
}
.login {
  height: 45px;
  margin: 19px 0 0 20px;
}
.login > a {
  text-decoration: none;
  color: #787878;
  display: block;
  margin-top: 7px;
}
.login:hover > a {
  color: #999;
}
.login > a:hover {
  text-decoration: underline;
}
</style>
