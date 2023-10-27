import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useSongUrlStore = defineStore("song_url", () => {
  const song_url = ref("");
  return { song_url };
});
