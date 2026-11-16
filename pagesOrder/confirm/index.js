import images from '../../utils/images.js'
const app = getApp()
Page({
  ...app.globalData.function,
  data: {
    ...app.globalData.theme,
    subsectionList:[
      {name: '自提', key: 1},
      {name: '配送', key: 2},
    ],
    shoppingCartList: [
      {id: 1, name: '贴布日式圆盘特殊日本木质茶盘', spec: '默认', url: images.goods1, price: 198, num: 1},
      {id: 2, name: '商务办公用茶-水仙', spec: '一斤装', url: images.goods2, price: 122, num: 2},
    ],
    info:{
      1:{
        name:'黄先生',
        phone: '',
        address:'福建省厦门市思明区湖滨南路227号之7号（屋后茶山香苑）'
      },
      2:{
        name: '',
        phone: '',
        address: ''
      }
    },
    current: 1,
    totalNum:0,
    totalPrice:0,
    confirmPrice:0,
    discountPrice:0,
    discountId:0,
  },
  onLoad(options){
    const discountPrice = Number(options.discountPrice) || 0
    const checkoutGoods = this.getStorage('checkoutGoods')
    const data = { discountPrice, current: 1 }
    if (Array.isArray(checkoutGoods) && checkoutGoods.length) {
      data.shoppingCartList = checkoutGoods
    }
    this.setData(data)
    this.computedData()
  },
  // 计算价格
  computedData(){
    let totalNum = 0
    let totalPrice = 0
    this.data.shoppingCartList.forEach((ele) => {
      const num = Number(ele.num) || 0
      const price = Number(ele.price) || 0
      totalNum += num
      totalPrice += num * price
    })
    const discountPrice = Number(this.data.discountPrice) || 0
    const confirmPrice = Math.max(totalPrice - discountPrice, 0)
    this.setData({
      totalNum,
      totalPrice: totalPrice.toFixed(2),
      confirmPrice: confirmPrice.toFixed(2)
    })
  },
  bindInputNumber(e){
    const num = Number(e.detail.value)
    const index = Number(e.currentTarget.dataset.index)
    const current = this.data.shoppingCartList[index]
    if (!current) return
    if (num <= 0) {
      this.$showModal({ content: '确定要删除此商品？' }).then((res) => {
        if (!res.confirm) {
          this.setData({ [`shoppingCartList[${index}].num`]: current.num })
          return
        }
        const shoppingCartList = this.data.shoppingCartList.filter((item) => item.id !== current.id)
        this.setData({ shoppingCartList })
        this.computedData()
      })
      return
    }
    this.setData({ [`shoppingCartList[${index}].num`]: num })
    this.computedData()
  },
  // 分段器change方法
  subsectionChange(e){
    this.setData({current:e.detail})
  },
  confirm(){
    if (!this.data.shoppingCartList.length) {
      this.$showToast('请先选择商品')
      return
    }
    if (this.data.current === 2 && !this.data.info[2].name) {
      this.$showToast('请添加收货地址')
      return
    }
    this.$showModal({ content: '确定支付' }).then((res) => {
      if (res.confirm) {
        this.$showToast('支付功能开发中')
      }
    })
  }
})