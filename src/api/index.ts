import axios from "axios";

export type ApiType<T extends (...args: any) => any> = Awaited<ReturnType<T>>;

const request = axios.create({
  baseURL: "http://localhost:3000",
});

// 歌曲
export interface Track {
  name: string;
  id: number;
  // 所属歌手
  ar: any;
  // 所属专辑
  al: any;
}

// 歌曲数据
export interface Song {
  id: number;
  url: string;
}

// 歌单
export interface Playlist {
  name: string;
  id: number;
  tags: string[];
  coverImgUrl: string;
}
export interface PlaylistWithTracks extends Playlist {
  tracks: Track[];
}
export interface PlaylistCategory {
  name: string;
}

// 榜单
interface Toplist {}

// 专辑
export interface Album {
  name: string;
  picUrl: string;
}

// 电台
interface DjRadioCategory {
  picWebUrl: string;
  name: string;
  id: number;
}

export interface DjRadio {
  name: string;
  picUrl: string;
  // 简介性描述
  rcmdtext: string;
  // 期数
  programCount: number;
  // 订阅数
  subCount: number;
  // dj
  dj: {
    nickname: string;
  };
}

// 歌手
export interface Artist {
  name: string;
  img1v1Url: string;
}

// ==============杂
export async function banner() {
  return (await request("/banner")).data.banners;
}
export async function newestAlbum() {
  return (await request("/album/newest")).data.albums;
}

export async function topAlist() {
  return (
    await request("/playlist/detail", {
      params: {
        id: "19723756",
      },
    })
  ).data.playlist.tracks;
}

export async function topBlist() {
  return (
    await request("/playlist/track/all", {
      params: {
        id: "3779629",
      },
    })
  ).data.songs;
}

export async function topClist() {
  return (
    await request("/playlist/track/all", {
      params: {
        id: "2884035",
      },
    })
  ).data.songs;
}

// =====歌曲相关======
export async function getSong(id: number) {
  return (
    await request("/song/url", {
      params: {
        id,
      },
    })
  ).data.data[0] as Song;
}

// =====歌单相关=====
// 获取歌单组
export async function getPlaylists(
  options: {
    order?: "hot" | "new";
    cat?: string;
    limit?: number;
    offset?: number;
  },
  flag: boolean
): Promise<{
  list: Playlist[];
  count: number;
}>;
export async function getPlaylists(options: {
  order?: "hot" | "new";
  cat?: string;
  limit?: number;
  offset?: number;
}): Promise<Playlist[]>;
export async function getPlaylists(
  options: {
    order?: "hot" | "new";
    cat?: string;
    limit?: number;
    offset?: number;
  },
  flag?: boolean
) {
  const data = (
    await request("/top/playlist", {
      params: options,
    })
  ).data;
  if (flag) {
    return {
      list: data.playlists,
      count: data.total,
    };
  } else return data.playlists;
}
// 获取歌单
export async function getPlaylist(playlist_id: number) {
  return (
    await request("/playlist/detail", {
      params: {
        id: playlist_id,
      },
    })
  ).data.playlist as PlaylistWithTracks;
}
// 获取歌单分类
export async function getPlaylistCategories() {
  const data = (await request("/playlist/catlist")).data;
  const playlist_categories = [];
  for (let category_id in data.categories) {
    const playlist_category = {
      name: data.categories[category_id] as string,
      list: [] as PlaylistCategory[],
    };
    for (let playlist of data.sub) {
      if (playlist.category === Number(category_id)) {
        playlist_category.list.push(playlist);
      }
    }
    playlist_categories.push(playlist_category);
  }
  return playlist_categories;
}

// =====专辑相关=====
// 获取专辑组
export async function getAlbums(options: {
  area?: "ALL" | "ZH" | "EA" | "KR" | "JP";
  limit?: number;
  offset?: number;
}) {
  return (await request("/album/new", { params: options })).data
    .albums as Album[];
}

export const shortGetAlbums = () => getAlbums({ limit: 10 });

// ====电台相关=====
// 获取电台分类
export async function getDjRadioCategory() {
  return (await request("/dj/catelist")).data.categories as DjRadioCategory[];
}

export async function getNewestDjRadios(cateId: number) {
  return (
    await request("/dj/recommend/type", {
      params: {
        type: cateId,
      },
    })
  ).data.djRadios as DjRadio[];
}

// 获得电台组
export async function getDjRadios(
  options: {
    cateId: number;
    limit?: number;
    offset?: number;
  },
  count_flag: boolean
): Promise<{
  djradios: DjRadio[];
  count: number;
}>;
export async function getDjRadios(options: {
  cateId: number;
  limit?: number;
  offset?: number;
}): Promise<DjRadio[]>;
export async function getDjRadios(
  options: {
    cateId: number;
    limit?: number;
    offset?: number;
  },
  count_flag?: boolean
) {
  const data = (
    await request("/dj/radio/hot", {
      params: options,
    })
  ).data;
  if (count_flag)
    return {
      djradios: data.djRadios,
      count: data.count,
    };
  else return data.djRadios;
}

// ====歌手相关=====
export async function getArtists(flag: "hot"): Promise<Artist[]>;
export async function getArtists(options: {
  type: number;
  area: number;
}): Promise<Artist[]>;
export async function getArtists(options: any) {
  if (options === "hot") {
    return (await request("/top/artists")).data.artists;
  } else {
    return (
      await request("/artist/list", {
        params: {
          ...options,
          limit: 100,
        },
      })
    ).data.artists;
  }
}
