var WxSearch = require('../../wxSearch/wxSearch.js')
var ip = getApp().globalData.ip;
var centerIp = getApp().globalData.centerIp;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:[],
    maxpage:'',
    ip,
    centerIp
  },
  click: function (e) {
    console.log(e.target.id)
    wx.navigateTo({
      url: `../wares/wares?id=${e.target.id}`
    })
  },

  wxSearchFn: function (e) {//点击搜索
  let nowthis = this;
     WxSearch.wxSearchAddHisKey(this);
     console.log(this.data.wxSearchData.value)
     wx.request({
       url: ip + '/shopping/find',
       data: {
         type: nowthis.data.wxSearchData.value,
       },
       success: function (res) {
          console.log(res)
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].picture[0] = res.data[i].picture[0].replace(/\\/g, '/')
          }
          nowthis.setData({
            msg: res.data,
          })
       },

     })
  },
  wxSearchInput: function (e) {
    WxSearch.wxSearchInput(e, this);
    console.log(1)
  },
  wxSerchFocus: function (e) {
    WxSearch.wxSearchFocus(e, this);
    console.log(2)
  },
  wxSearchBlur: function (e) {
    WxSearch.wxSearchBlur(e, this);
    console.log(3)
  },
  wxSearchKeyTap: function (e) {
    WxSearch.wxSearchKeyTap(e, this);
    console.log(4)
    console.log(this.data.wxSearchData.value)
  },
  wxSearchDeleteKey: function (e) {
    WxSearch.wxSearchDeleteKey(e, this);
    console.log(5)
  },
  wxSearchDeleteAll: function (e) {
    WxSearch.wxSearchDeleteAll(this);
    console.log(6)
  },
  wxSearchTap: function (e) {
    WxSearch.wxSearchHiddenPancel(this);
    console.log(7)
    console.log(this)    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData)
    let nowthis = this;
    wx.request({
      url: ip+'/shopping/find', //仅为示例，并非真实的接口地址
      data: {
        page: 1,
        rows: 10
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        for (let i = 0; i < res.data.rows.length; i++) {
          res.data.rows[i].picture[0] = res.data.rows[i].picture[0].replace(/\\/g, '/')
        }
        nowthis.setData({
          msg: res.data.rows,
          maxpage: res.data.maxpage
        })
        console.log(nowthis.data.msg)
      }
    })

    //初始化的时候渲染wxSearchdata
    WxSearch.init(this, 43, ['橘猫', '康贝尔狗粮', '金毛狗粮', '哈士奇', '狗粮']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
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