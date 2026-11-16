import { articles } from '../../utils/catalog.js'
const app = getApp()
Page({
  ...app.globalData.function,
  data: {
    ...app.globalData.theme,
    tabList: [
      { name: '最新', key: 'new' },
      { name: '全部', key: 'all' }
    ],
    current: 'new',
    keyword: '',
    articleList: [],
  },
  apply() {
    const keyword = this.data.keyword
    const current = this.data.current
    const articleList = articles.filter((item) => {
      const tabOk = current === 'all' || item.latest
      const wordOk = !keyword || item.title.includes(keyword) || item.desc.includes(keyword)
      return tabOk && wordOk
    })
    this.setData({ articleList })
  },
  handleChange({ detail }) {
    this.setData({ current: detail.key })
    this.apply()
  },
  onSearch(e) {
    this.setData({ keyword: e.detail.value || '' })
    this.apply()
  },
  openArticle(e) {
    this.router(`/pagesDiscover/detail/index?id=${e.currentTarget.dataset.id}`)
  },
  onReady() {
    this.hidePageLoading()
  },
  onLoad() {
    this.apply()
  },
})
