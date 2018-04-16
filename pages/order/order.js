var ip = getApp().globalData.ip;
var centerIp = getApp().globalData.centerIp;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    entire: false,//全部
    pendingPayment: false,//待付款
    pendingDelivery: false,//待发货
    receiveGoods: false,//待收货
    BeEvaluated: false,//待评价
    refundSale: false,//退款/售后
    orderAllArr: [],//订单
    anOrder:[],//一个订单
    centerIp
  },
  btn: function (e) {
    let nowthis= this;
    this.setData({
      entire: false,//全部
      pendingPayment: false,//待付款
      pendingDelivery: false,//待发货
      receiveGoods: false,//待收货
      BeEvaluated: false,//待评价
      refundSale: false//退款/售后
    })
    switch (`${e.target.id}`) {
      case "entire": this.setData({
        [e.target.id]: true
      })
      break;
      case "pendingDelivery": this.setData({
        [e.target.id]: true,
        anOrder: nowthis.data.orderArr.filter(item => { return item.status ==`待发货`})
      })
      break;
      case "pendingPayment": this.setData({
        [e.target.id]: true,
        anOrder: nowthis.data.orderArr.filter(item => { return item.status == `待付款` })
      })
      break;
      case "receiveGoods": this.setData({
        [e.target.id]: true,
        anOrder: nowthis.data.orderArr.filter(item => { return item.status == `待收货` })
      })
        break;
      case "BeEvaluated": this.setData({
        [e.target.id]: true,
        anOrder: nowthis.data.orderArr.filter(item => { return item.status == `待评价` })
      })
        break;
      case "refundSale": this.setData({
        [e.target.id]: true,
        anOrder: nowthis.data.orderArr.filter(item => { return item.status == `退款/售后` })
      })
        break;
      default: console.log('没有订单了')
    }
    console.log(nowthis.data.anOrder)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.name)

    let nowthis = this;
    wx.request({
      url: ip+'/goodsOrder/find', //仅为示例，并非真实的接口地址
      data: {
        page: 1,
        rows: 5
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        nowthis.setData({
          orderArr: res.data.rows,
          [options.name]: true
        })
        console.log(nowthis.data.orderArr)
      }
    })
    //  this.setData({
    //    orderArr:res.data.rows,
    //    [options.name]:true
    //  })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})