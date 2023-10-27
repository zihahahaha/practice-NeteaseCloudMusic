<script setup lang="ts"></script>

<template>
  <div class="search">
    <input type="text" placeholder="音乐/视频/电台/用户" />
  </div>
</template>

<style scoped>
.search {
  width: 158px;
  height: 32px;
  margin-top: 19px;
  border-radius: 20px;
  overflow: hidden;
  background: url(topbar.png) no-repeat;
  background-position: 0 -99px;
  background-color: #fff;
}
.search > input {
  border: none;
  outline: none;
  width: 121px;
  margin: 8px 0 0 30px;
  line-height: 16px;
}
</style>
