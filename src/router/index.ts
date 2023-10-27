import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { h } from "vue";

export enum ROUTENAME {
  // home
  RECOMMEND = "recommend",
  TOPLIST = "toplist",
  PLAYLIST = "playlist",
  DJRADIO = "djradio",
  ARTIST = "artist",
  ALBUM = "album",
}

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/discover",
  },
  {
    path: "/discover",
    component: () => import("@/views/discover/discover.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/discover/recommend/recommend.vue"),
        name: ROUTENAME.RECOMMEND,
      },
      {
        path: "toplist",
        component: () => import("@/views/discover/toplist/toplist.vue"),
        name: ROUTENAME.TOPLIST,
      },
      {
        path: "playlist",
        component: () => import("@/views/discover/playlist/playlist.vue"),
        name: ROUTENAME.PLAYLIST,
      },
      {
        path: "djradio",
        component: () => import("@/views/discover/djradio/djradio.vue"),
        name: ROUTENAME.DJRADIO,
        alias: "djradio/category",
      },
      {
        path: "artist",
        component: () => import("@/views/discover/artist/artist.vue"),
        name: ROUTENAME.ARTIST,
      },
      {
        path: "album",
        component: () => import("@/views/discover/album/album.vue"),
        name: ROUTENAME.ALBUM,
      },
    ],
  },
  {
    path: "/my",
    component: () => import("@/views/my/my.vue"),
  },
  {
    path: "/friend",
    component: () => import("@/views/friend/friend.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: (() => {
      let a: any = () => h("div", "ERROR");
      a.displayName = "xxxx";
      return a;
    })(),
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});
router.afterEach((to, from) => {
  window.scrollTo({
    top: 0,
  });
});

export default router;
