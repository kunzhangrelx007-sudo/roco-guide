# 网站图片/视频素材清单

> 将截图/GIF/视频放入此目录，然后替换 HTML 中的占位符即可。

## 📸 截图清单

| 文件名 | 位置 | 尺寸建议 | 内容 |
|--------|------|----------|------|
| `hero-banner.png` | 首页英雄区 | 1200×400 | 游戏Logo + 御三家合影 |
| `boss-legendary.png` | BOSS攻略页 | 800×400 | 传说精灵BOSS外观 |
| `boss-attack.gif` | BOSS攻略页 | 400×300 | BOSS大招动画GIF |
| `pet-spark.png` | 精灵百科 | 400×400 | 火花立绘 |
| `pet-water.png` | 精灵百科 | 400×400 | 水蓝蓝立绘 |
| `pet-grass.png` | 精灵百科 | 400×400 | 喵喵立绘 |
| `pet-mech.png` | 精灵百科 | 400×400 | 机幕方舟立绘 |
| `pet-snow.png` | 精灵百科 | 400×400 | 雪怪立绘 |
| `pet-blast.png` | 精灵百科 | 400×400 | 爆焰喷喷立绘 |
| `map-heishuixia.png` | 速查卡片 | 400×250 | 黑水峡藏宝图位置 |
| `map-chenchuan.png` | 速查卡片 | 400×250 | 沉船漩涡藏宝图位置 |
| `map-lanyufeng.png` | 速查卡片 | 400×250 | 岚语峰藏宝图位置 |
| `map-yueyahu.png` | 速查卡片 | 400×250 | 月牙湖岸藏宝图位置 |
| `map-gangkou.png` | 速查卡片 | 400×250 | 港口驻地藏宝图位置 |
| `map-gubiji.png` | 速查卡片 | 400×250 | 古币机路线图 |

## 🎬 视频清单

在 B站/抖音/小红书 找到优质攻略视频后，替换 `index.html` 中 iframe 的 `data-src` 属性：

```html
<!-- 修改 bvid 即可 -->
<iframe data-src="//player.bilibili.com/player.html?bvid=视频BV号&page=1"></iframe>
```

## 💡 快速上手

1. 游戏内截图 → 裁剪到建议尺寸 → 保存为 PNG
2. 把文件放到这个 `images` 目录
3. 在 HTML 中找到对应 `img-placeholder` → 替换为 `<img src="assets/images/xxx.png" class="media-img" alt="描述">`
4. 推送 → 图片自动上线

## 🎞️ GIF 录制建议

- **Boss 技能演示**：录 5-8 秒，展示技能动画
- **跑图路线**：录 15-20 秒，展示完整路线
- **捕捉技巧**：录 10 秒，展示星星魔法砸晕 + 背袭流程
- 工具推荐：ScreenToGif（Windows免费）、GIPHY Capture（Mac免费）
