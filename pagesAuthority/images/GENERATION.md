# 登录页插画

日期：2026-11-16。使用内置 `image_gen`，以 `images/mine/avatar-v2.png` 为角色参考改编，保留金色小鲸鱼形象，加入购物袋和小星光。输出为真实透明背景 PNG。

项目文件：`login-whale.png`，512 × 512，约 134 KB。使用 `sips` 缩放导出并保留 alpha 通道；素材位于登录分包，仅由登录页引用。

## 最终提示词

```text
Use case: identity-preserve / compositing
Asset type: transparent illustration for the login page of ITRITON MALL, a WeChat shopping mini program.
Edit the attached golden whale avatar into a polished login welcome illustration. The input is the character reference and edit target: preserve the same adorable rounded golden whale, warm champagne-gold back (#DCAA6B), ivory cream belly, tiny dark brown dot eyes, curved friendly smile, one small side fin, raised split tail, matte ceramic 3D surface and very soft lighting. Preserve the recognizable face and simple proportions.
Remove the ivory square background completely. The output must have genuine transparent alpha around the objects, no painted white rectangle and no checkerboard baked into the image.
Compose one complete full-body whale gently floating toward the viewer, turned slightly left, with a single small unbranded ivory shopping bag with golden rounded handles below and slightly left of the whale. Add only one tiny champagne-gold four-point sparkle near the tail as a restrained welcoming accent. Smooth clean forms, soft warm studio light. Whale is the focal point, bag secondary; no platform, no floor, no room, no backdrop. Self-contained compact composition with 8% clear margin on all sides. Square 1:1. The entire character including tail must fit fully inside canvas.
For a refined cream-and-gold mobile login interface. Readable at 160px wide. No letters, words, text, numbers, QR code, logo, button, UI, frame or watermark. Deliver only this one transparent illustration.
```
