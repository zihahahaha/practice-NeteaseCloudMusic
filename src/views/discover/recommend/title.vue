<script setup lang="ts">
const props = defineProps<{
  to: object;
  title: string;
}>();
</script>

<template>
  <header class="card_header">
    <div class="title">
      <RouterLink :to="props.to">{{ props.title }}</RouterLink>
    </div>
    <div class="list">
      <slot name="list" />
    </div>
    <div class="more">
      <RouterLink :to="props.to">更多</RouterLink>
    </div>
  </header>
</template>

<style scoped>
.card_header {
  height: 33px;
  border-bottom: solid 2px #c10d0c;
}
.title {
  float: left;
  background-image: url(index.png);
  background-repeat: no-repeat;
  background-position: -225px -156px;
  height: 33px;
  padding: 0 10px 0 34px;
}
.title > a {
  font-size: 20px;
  line-height: 28px;
  color: black;
}

.list {
  float: left;
}

.more {
  margin-top: 9px;
  padding-right: 20px;
  float: right;
  background-image: url(index.png);
  background-position: 30px -240px;
}
.more > a {
  color: #666;
  font-size: 12px;
}
</style>
