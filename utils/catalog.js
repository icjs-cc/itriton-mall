import images from './images.js'
import { getStorage, setStorage } from './storage.js'

export const goodsList = [
  { id: 1, category: '1', name: '贴布日式圆盘特殊日本木质茶盘', price: '128.00', url: images.goods1, stock: 36, desc: '日式圆盘茶盘，适合一人独酌，也适合作为礼品。', tags: ['茶盘', '礼品系列'] },
  { id: 2, category: '3', name: '商务办公用茶-水仙', price: '198.00', url: images.goods2, stock: 20, desc: '清香水仙，办公室冲泡方便，一斤装。', tags: ['水仙', '办公用茶'] },
  { id: 3, category: '3', name: '商务办公用茶-肉桂', price: '200.00', url: images.goods3, stock: 18, desc: '岩骨花香，适合会客分享。', tags: ['肉桂', '办公用茶'] },
  { id: 4, category: '4', name: '家用简约长方竹制茶盘', price: '218.00', url: images.goods4, stock: 12, desc: '轻质储水茶盘，家里院子随时可泡。', tags: ['茶盘', '茶具茶生活'] },
  { id: 5, category: '2', name: '花茶系列-玫瑰红茶', price: '68.00', url: images.goods2, stock: 40, desc: '玫瑰与红茶搭配，日常口粮花茶。', tags: ['花茶', '花茶系列'] },
  { id: 6, category: '4', name: '手工茶荷', price: '36.00', url: images.classify2, stock: 50, desc: '赏茶、取茶用的小茶荷。', tags: ['茶荷', '茶具茶生活'] },
  { id: 7, category: '4', name: '电热烧水壶', price: '159.00', url: images.classify3, stock: 15, desc: '煮水稳定，适合居家茶台。', tags: ['烧水壶', '茶具茶生活'] },
  { id: 8, category: '5', name: '存茶收藏-陈年肉桂', price: '860.00', url: images.goods3, stock: 6, desc: '适合存放收藏的陈年肉桂。', tags: ['存茶', '收藏'] },
  { id: 9, category: '6', name: '预定款-限量茶盘', price: '1280.00', url: images.goods1, stock: 3, desc: '限量预定，下单后按批次发出。', tags: ['预定款', '茶盘'] },
  { id: 10, category: '1', name: '礼品茶巾套装', price: '49.00', url: images.classify4, stock: 80, desc: '吸水茶巾，适合随手礼。', tags: ['茶巾', '礼品系列'] },
]

export const categoryChildren = {
  '1': [
    { id: '1-1', name: '茶盘', url: images.classify1 },
    { id: '1-2', name: '茶巾', url: images.classify4 },
    { id: '1-3', name: '礼品系列', url: images.goods1 },
  ],
  '2': [
    { id: '2-1', name: '花茶', url: images.goods2 },
    { id: '2-2', name: '花茶系列', url: images.classify2 },
  ],
  '3': [
    { id: '3-1', name: '水仙', url: images.goods2 },
    { id: '3-2', name: '肉桂', url: images.goods3 },
    { id: '3-3', name: '办公用茶', url: images.classify3 },
  ],
  '4': [
    { id: '4-1', name: '茶盘', url: images.classify1 },
    { id: '4-2', name: '茶荷', url: images.classify2 },
    { id: '4-3', name: '烧水壶', url: images.classify3 },
    { id: '4-4', name: '茶巾', url: images.classify4 },
  ],
  '5': [
    { id: '5-1', name: '存茶', url: images.goods3 },
    { id: '5-2', name: '收藏', url: images.goods1 },
  ],
  '6': [
    { id: '6-1', name: '预定款', url: images.goods1 },
    { id: '6-2', name: '茶盘', url: images.classify1 },
  ],
}

export const articles = [
  { id: 1, latest: true, title: '品茶，品的是茶味还是人生', desc: '茶，只是一杯茶，晨起日落，生命有它陪伴不曾离开，不可或缺。', content: '茶席上的第一口水，往往不是为了解渴。热气升起来的时候，人会慢下来。忙了一天，杯子端稳，已经是一种休息。', views: 68, image: images.goods1 },
  { id: 2, latest: true, title: '办公室里怎么泡一壶水仙', desc: '盖碗、热水和三分钟，足够把下午的会间隙过得干净。', content: '水刚开时先温杯，再投茶。第一道快出，第二道停十几秒。办公室不必摆整套茶具，一只盖碗就够。', views: 41, image: images.goods2 },
  { id: 3, latest: false, title: '茶盘怎么挑才不容易积水', desc: '看排水、看重量，也看它能不能一个人挪得动。', content: '居家茶盘优先选轻、能储水的。圆盘适合小茶台，长方盘适合两人以上。买之前先量一下桌子的进深。', views: 27, image: images.goods4 },
]

const goodsBrief = (goods, num, spec) => ({
  id: `${goods.id}-${spec}`,
  goodsId: goods.id,
  name: goods.name,
  spec,
  url: goods.url,
  price: Number(goods.price),
  num,
})

const seedOrders = [
  { id: '1001', status: 'unpaid', statusText: '待付款', time: '2026-11-12 09:20', delivery: '配送', total: '128.00', address: { name: '黄先生', phone: '13800000000', address: '福建省厦门市思明区湖滨南路227号' }, goods: [goodsBrief(goodsList[0], 1, '灰色 / 默认')] },
  { id: '1002', status: 'unshipped', statusText: '待发货', time: '2026-11-11 14:08', delivery: '自提', total: '198.00', address: { name: '黄先生', phone: '', address: '福建省厦门市思明区湖滨南路227号之7号' }, goods: [goodsBrief(goodsList[1], 1, '一斤装')] },
  { id: '1003', status: 'unreceived', statusText: '待收货', time: '2026-11-08 16:40', delivery: '配送', total: '200.00', address: { name: '黄先生', phone: '13800000000', address: '福建省厦门市思明区湖滨南路227号' }, goods: [goodsBrief(goodsList[2], 1, '一斤装')] },
  { id: '1004', status: 'done', statusText: '已完成', time: '2026-11-02 11:16', delivery: '自提', total: '218.00', address: { name: '黄先生', phone: '', address: '福建省厦门市思明区湖滨南路227号之7号' }, goods: [goodsBrief(goodsList[3], 1, '默认')] },
]

const defaultCart = [
  { id: '1-默认', goodsId: 1, name: goodsList[0].name, spec: '默认', url: goodsList[0].url, price: 128, num: 1, checked: true },
  { id: '2-一斤装', goodsId: 2, name: goodsList[1].name, spec: '一斤装', url: goodsList[1].url, price: 198, num: 1, checked: true },
]

export const findGoods = (id) => goodsList.find((item) => String(item.id) === String(id))

export const findArticle = (id) => articles.find((item) => String(item.id) === String(id))

export const queryGoods = ({ category = '', keyword = '' } = {}) => {
  const word = String(keyword || '').trim()
  const match = (item, useCategory) => {
    const hitCategory = !useCategory || !category || String(item.category) === String(category)
    const hitWord = !word || item.name.includes(word) || item.tags.some((tag) => tag.includes(word) || word.includes(tag))
    return hitCategory && hitWord
  }
  const scoped = goodsList.filter((item) => match(item, true))
  if (scoped.length || !word) return scoped
  return goodsList.filter((item) => match(item, false))
}

export const orderStatusText = {
  unpaid: '待付款',
  unshipped: '待发货',
  unreceived: '待收货',
  done: '已完成',
  cancelled: '已取消',
  returning: '退货中',
}

const withGoodsImage = (order) => ({
  ...order,
  goods: (order.goods || []).map((item) => {
    const goodsId = item.goodsId || String(item.id || '').split('-')[0]
    const goods = findGoods(goodsId)
    return {
      ...item,
      goodsId: item.goodsId || goodsId,
      url: item.url || (goods && goods.url) || '',
      name: item.name || (goods && goods.name) || '',
    }
  }),
})

export const getOrders = () => {
  const saved = getStorage('orders')
  const list = Array.isArray(saved) ? saved : seedOrders
  if (!Array.isArray(saved)) setStorage('orders', seedOrders)
  return list.map(withGoodsImage)
}

export const saveOrders = (list) => {
  setStorage('orders', list)
}

export const updateOrder = (id, patch) => {
  const orders = getOrders().map((item) => {
    if (String(item.id) !== String(id)) return item
    const next = { ...item, ...patch }
    if (patch.status) next.statusText = orderStatusText[patch.status] || next.statusText
    return next
  })
  saveOrders(orders)
  return orders
}

export const getCart = () => {
  const saved = getStorage('cart')
  if (Array.isArray(saved)) return saved
  setStorage('cart', defaultCart)
  return defaultCart.map((item) => ({ ...item }))
}

export const saveCart = (list) => {
  setStorage('cart', list)
}

export const addCartItem = (goods, spec) => {
  const cart = getCart()
  const id = `${goods.id}-${spec}`
  const found = cart.find((item) => item.id === id)
  if (found) {
    found.num += 1
  } else {
    cart.unshift({
      id,
      goodsId: goods.id,
      name: goods.name,
      spec,
      url: goods.url,
      price: Number(goods.price),
      num: 1,
      checked: true,
    })
  }
  saveCart(cart)
  return cart
}
