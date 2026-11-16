# 商城素材生成记录

生成日期：2026-11-16。使用内置 `image_gen`，两张独立生成的图片；使用 macOS `sips` 缩放和导出。原素材保留，新素材通过 `-v2` 文件名接入。

| 素材 | 项目文件 | 导出尺寸 | 使用位置 |
| --- | --- | --- | --- |
| 分享卡片 | `common/share-v2.jpg` | 1000 × 800，JPEG 质量 85 | 我的、账号设置的分享入口（商品详情使用对应商品图片） |
| 默认头像 | `mine/avatar-v2.png` | 256 × 256，PNG | 我的、切换账号 |

风格延续项目的金色（`#DCAA6B`）与鲸鱼形象，搭配奶油色背景和柔和立体插画。分享图品牌名称沿用 `utils/config.js` 的 ITRITON MALL，中文文案沿用原分享图。

分享卡片通过 `utils/share.js` 复制到小程序本地文件目录后交给分享接口，避免当前开发者工具分享弹窗无法加载代码包路径的问题；复制失败则使用微信默认页面截图。`project.config.json` 显式包含该图片，防止无依赖文件过滤遗漏。

## 分享卡片最终提示词

```text
Use case: ads-marketing
Asset type: production WeChat mini program share card for an existing shopping mall called ITRITON MALL.
Create a finished premium ecommerce brand share illustration, landscape 5:4 aspect ratio, ideally 1000 by 800 pixels. Art direction: warm ivory #FFF8EE, champagne gold #DCAA6B, light sand #E3BB87, cocoa brown text. Restrained modern editorial design, charming tactile matte ceramic 3D illustration with sophisticated large clean typography, soft studio lighting, no noisy texture.
Layout: generous margin around all sides. Top-left brand text on two lines, line 1 exactly "ITRITON", line 2 exactly "MALL", bold elegant geometric sans serif, dark cocoa, very legible at thumbnail size. Below those two lines, one smaller but clear Chinese line exactly "随时随地 轻松快乐购". The entire text group occupies upper-left through middle-left, with breathing room.
Main visual in bottom-right half: a friendly chubby champagne-gold whale mascot, cream belly, small dark eyes, subtle smile, raised tail, gently floating beside two unbranded ivory and sand shopping bags on a softly curved ivory podium. This whale connects to the mall's existing golden whale emblem. Sculptural, polished, calm; no ocean scene, no water splash. A subtle large pale-gold circle in background gives depth.
Keep all content inset, within center 85% to tolerate crops. Background fills the rectangle edge to edge. This is one actual ready-to-use image, no UI, no mockup frame, no collage or contact sheet, no watermark, no QR code, no extra copy, no sale or discount claims.
```

## 默认头像最终提示词

```text
Use case: stylized-concept
Asset type: default user avatar for the existing ITRITON MALL WeChat ecommerce mini program.
Create one square 1:1 avatar image, ideally 1024 by 1024 pixels. A single adorable chubby golden whale mascot, warm champagne gold #DCAA6B back and ivory cream belly, simple tiny dark-brown dot eyes and subtle friendly smile, curved tail to the upper right, one rounded small side fin. Elegant matte ceramic 3D illustration with very subtle soft lighting, clean smooth surfaces, not shiny metallic or photoreal. Three-quarter side view with the face oriented slightly left toward the viewer. Distinct, simple silhouette readable at 40 pixels, no small decoration. Character centered and large, occupying about 70% width and 60% height, all fins and tail inside an imaginary central circle with 12% safe margins. Flat warm ivory #FFF8EE background filling the entire square, only a very soft minimal shadow. Calm, friendly, welcoming, gender-neutral. The mall already uses a golden whale logo; this is a matching new illustrated avatar, not a logo sheet. No letters, numbers, text, outlines, rings, badges, border, extra objects, accessories, watermark, mockup or contact sheet.
```

