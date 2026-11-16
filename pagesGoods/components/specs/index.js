// component/specs/index.js
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    mainColor: {
      type: String,
      value: ''
    },
    subColor: {
      type: String,
      value: ''
    }
  },
  data: {
    goods: {},
    images: '',
    selected: {},
    action: 'select',
    skuList:[
      {
        id: "1",
        name: "颜色",
        children: [
          {name: "灰色"},
          {name: "白色"}
        ]
      },
      {
        id: "2",
        name: "产地",
        children: [
          {name: "南京"},
          {name: "东郡"}
        ]
      },
      {
        id: "3",
        name: "尺寸",
        children: [
          {name: "ML"},
          {name: "XL"}
        ]
      }
    ]
  },
  attached(){
    // this.showSpecs()
  },
  methods: {
    open(goods, action) {
      this.setData({
        goods: goods || {},
        images: goods && goods.url || '',
        action: action || 'select',
        selected: {}
      })
      this.showSpecs()
    },
    showSpecs(){
      this.selectComponent("#popup").show()
    },
    hideSpecs(){
      this.selectComponent("#popup").hide()
    },
    selectSku(e) {
      const group = e.currentTarget.dataset.group
      const name = e.currentTarget.dataset.name
      this.setData({
        [`selected.${group}`]: name
      })
    },
    confirm(e) {
      const names = this.data.skuList.map((group) => this.data.selected[group.id]).filter(Boolean)
      if (names.length < this.data.skuList.length) {
        wx.showToast({ title: '请选择规格', icon: 'none' })
        return
      }
      this.triggerEvent('confirm', {
        action: e.currentTarget.dataset.action || this.data.action,
        spec: names.join(' / ')
      })
      this.hideSpecs()
    },
  }
})
