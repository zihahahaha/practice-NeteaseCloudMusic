<script setup lang="ts">
import Navbar from "@/components/navbar";
import Player from "./components/player.vue";
import { defineCustomElement } from "vue";


</script>

<template>
  <Navbar />
  <RouterView />
  <Player />
</template>
