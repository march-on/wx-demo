var ip = getApp().globalData.ip;
var centerIp = getApp().globalData.centerIp;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],               // 购物车列表
    hasList: true,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: true,    // 全选状态，默认全选
    addressAll:[],
    defaultAddress:[],
    ip:ip,
    centerIp
  },
  //提交订单 确定支付
  paymentBtn:function(){
    let nowthis = this;
    wx.request({
      url: ip+'/goodsOrder/add',
      data: {
        status:"待付款",
        shopCar: nowthis.data.carts
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {    
        console.log(res)
      //  wx.showToast({
      //    title: '成功',
      //    icon: 'success',
      //    duration: 2000
      //   })

        // wx.requestPayment(
        //   {
        //     'timeStamp': '20000000000',
        //     'nonceStr': 'wewqdxcsadas',
        //     'package': 'prepay_id=qwedsdwq',
        //     'signType': 'MD5',
        //     'paySign': 'MD5(appId=wxd678efh567hg6787&nonceStr=5K8264ILTKCH16CQ2502SI8ZNMTM67VS&package=prepay_id=wx2017033010242291fcfe0db70013231072&signType=MD5&timeStamp=1490840662&key=qazwsxedcrfvtgbyhnujmikolp111111) = 22D9B4E54AB1950F51E0649E8810ACD6',
        //     'success': function (res) {
        //       console.log(res)
        //      },
          
        //   })


      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData.shoppingCarArr)

     let carts = getApp().globalData.shoppingCarArr;                  // 获取购物车列表
     let total = 0;
     for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
       if (carts[i].selected) {                     // 判断选中才会计算价格
         total += carts[i].num * carts[i].price;   // 所有价格加起来
       }
     }
     this.setData({                        // 最后赋值到data中渲染到页面
       carts: getApp().globalData.shoppingCarArr,
       totalPrice: total
     });
    //默认收货地址
     let nowthis = this;
     let temp;
     wx: wx.request({
       url: ip+'/address/find',
       data: {},
       success: function (res) {
         nowthis.data.addressAll = res.data;
         temp = nowthis.data.addressAll.filter(item => { return item.selected })
       nowthis.setData({
         defaultAddress:temp
       })
         console.log(nowthis.data.defaultAddress)
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