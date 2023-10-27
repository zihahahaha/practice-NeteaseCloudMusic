# 简介

后端基于该项目[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

# 路由设计

## home

|                      路径                       |        页面        |
| :---------------------------------------------: | :----------------: |
|                    /discover                    | 发现音乐（根路由） |
|                   /discover/                    |        推荐        |
|                /discover/toplist                |       排行榜       |
|             /discover/playlist?cat              |        歌单        |
| /discover/djradio,/discover/djradio/category?id |      主播电台      |
|           /discover/artist?area&type            |        歌手        |
|                 /discover/album                 |      新碟上架      |

## my

| 路径 |   页面   |
| :--: | :------: |
| /my  | 我的音乐 |

## friend

|  路径   | 页面 |
| :-----: | :--: |
| /friend | 关注 |

# 警告

/dj/radio/hot 参数语义有误，暂时使用默认值
首页的热门推荐没有完全一样的接口，无法做到完全复现

# TODO

- 新碟上架页加个翻页
- 优化播放器
- 增加网络请求错误处理