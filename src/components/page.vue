<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  limit: number;
  max: number;
  active_index: number;
}>();
const emit = defineEmits<{
  "update:active_index": [active_index: number];
}>();

const pages = computed(() => {
  const a = [];
  if (props.limit >= props.max) {
    for (let i = 1; i <= props.max; ++i) a[i] = i;
  } else if (props.active_index <= props.limit - 1) {
    for (let i = 0; i < props.limit - 1; ++i) a.push(i + 1);
    a.push("...");
    a.push(props.max);
  } else if (props.active_index >= props.max - props.limit + 2) {
    a.push(1);
    a.push("...");
    for (let i = props.max - props.limit + 2; i <= props.max; ++i) a.push(i);
  } else {
    a.push(1);
    a.push("...");
    if (
      props.active_index - Math.floor((props.limit - 1 - 2) / 2) <
      props.limit
    ) {
      for (let i = props.limit; i < props.limit + props.limit - 2; ++i)
        a.push(i);
    } else if (
      props.active_index + Math.floor((props.limit - 2) / 2) >
      props.max - props.limit + 1
    ) {
      for (
        let i = props.max - 2 * props.limit + 4;
        i <= props.max - props.limit + 1;
        ++i
      )
        a.push(i);
    } else {
      for (
        let i = props.active_index - Math.floor((props.limit - 1) / 2) + 1;
        i <= props.active_index + Math.floor(props.limit / 2) - 1;
        ++i
      )
        a.push(i);
    }
    a.push("...");
    a.push(props.max);
  }
  return a;
});

function pageClick(i: any) {
  if (typeof i === "number") emit("update:active_index", i);
}
</script>

<template>
  <div class="page" v-if="props.max > 0">
    <button
      @click="emit('update:active_index', props.active_index - 1)"
      :disabled="props.active_index === 1"
    >
      上一页
    </button>
    <div
      v-for="i in pages"
      :class="{
        active: i === props.active_index,
        page_item: typeof i === 'number',
      }"
      @click="pageClick(i)"
    >
      {{ i }}
    </div>
    <button
      @click="emit('update:active_index', props.active_index + 1)"
      :disabled="props.active_index === props.max"
    >
      下一页
    </button>
  </div>
</template>

<style scoped>
.page {
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.page_item.active {
  background-color: red;
  color: white;
}
.page_item {
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  margin: 0 5px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
}
.page_item:hover {
  border-color: #000;
}
</style>
