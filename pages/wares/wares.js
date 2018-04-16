var ip = getApp().globalData.ip;
var centerIp = getApp().globalData.centerIp;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:{},
    maxpage: '',
    nowpage: 1,
    centerIp
  },
  //加入到购物车
  addShopping:function(){
    let nowthis = this;
    var warn = "";
      wx.request({
        url: ip+'/shoppingCar/add',
        data: {
          title: nowthis.data.msg.shopName,
          image: nowthis.data.msg.picture[0],
          num: nowthis.data.msg.num,
          price: nowthis.data.msg.price, 
          sum: nowthis.data.msg.sum,
          selected:true,
          imgPath: nowthis.data.msg._id
        },
        success: function(res) {
          console.log(res)
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        },
       
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id=options.id;
    let nowthis = this;
    console.log(id)
    wx.request({
      url: ip+'/shopping/find', //仅为示例，并非真实的接口地址
      data: {
        _id: id
      },
      success: function (res) {
        console.log(res)
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].picture[0] = res.data[i].picture[0].replace(/\\/g, '/')
        }
        nowthis.setData({
          msg: res.data,
        })
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