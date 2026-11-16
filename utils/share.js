const SHARE_IMAGE = '/images/common/share-v2.jpg'
let shareImagePath

// 将代码包图片转为本地文件路径，兼容开发者工具分享弹窗的图片加载。
export const getShareImage = () => {
  if (shareImagePath) return shareImagePath

  try {
    const path = `${wx.env.USER_DATA_PATH}/mall-share-v2.jpg`
    wx.getFileSystemManager().copyFileSync(SHARE_IMAGE, path)
    shareImagePath = path
    return path
  } catch (error) {
    // 读取失败时交由微信使用页面截图，避免返回无法加载的图片。
    console.warn('[share] 分享图准备失败，使用页面截图', error)
    return undefined
  }
}
