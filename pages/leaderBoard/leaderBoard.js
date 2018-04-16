var ip = getApp().globalData.ip;
var centerIp = getApp().globalData.centerIp;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    new:true,
    hot:false,
    ip,
    centerIp,
    msg:[],
    newArr:{},
    hotArr:[]
  },
  click: function (e) {
    console.log(e.target.id)
    wx.navigateTo({
      url: `../wares/wares?id=${e.target.id}`
    })
  },
 new:function(){
  this.setData({
    new:true,
    hot:false
  })
 },
 hot: function () {
   this.setData({
     new: false,
     hot: true
   })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData)
    let nowthis = this;
    wx.request({
      url: ip + '/shopping/find', //仅为示例，并非真实的接口地址
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
          newArr: res.data.rows[3]
        })
        console.log(nowthis.data.newArr)
      }
    })
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
    console.log(123)
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