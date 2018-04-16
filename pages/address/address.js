var ip = getApp().globalData.ip;
var centerIp = getApp().globalData.centerIp;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],               // 地址列表
    hasList: false,          // 列表是否有数据
    selectAllStatus: true,    // 全选状态，默认全选
    addressSelect: {},          //选中的地址，默认地址
    ip,
    centerIp
  },
  //删除收获地址
  del: function (e) {
    let nowthis = this;
    console.log(e.target.id)
     wx.request({
      url: ip+'/address/del',
      data: {
        _id: e.target.id
      },
      success: function (res) {
        wx.request({
          url: ip+'/address/find',
          data: {},
          success: function (res) {
            if (res.data.length != 0) {
              nowthis.setData({
                hasList: true,
                carts: res.data
              })
            } else {
              nowthis.setData({
                hasList: false,
                carts: res.data
              })
            }
          },

        })

      },
    })
  },
  //修改收货地址
  revise: function (e) {
    wx: wx.navigateTo({
      url: `../reviseAddress/reviseAddress?id=${e.target.id}`,

    })
  },
  /**
 * 当前商品选中事件
 */
  selectList(e) {
    let nowthis=this
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = false;
    }
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
   
  //设置默认地址的状态
     wx.request({
      url: ip+'/address/update',
      data: {
        _id: carts[index]._id,
        selected:"true"
      },
      success: function (res) {
        console.log(res)
      }
    })
    //把原来的默认状态修改掉
    wx.request({
      url: ip+'/address/update',
      data: {
        _id: nowthis.data.addressSelect[0]._id,
        selected: ""
      },
      success: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index, 1);
    this.setData({
      carts: carts
    });
    if (!carts.length) {
      this.setData({
        hasList: false
      });
    } else {
      this.getTotalPrice();
    }
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    console.log(selectAllStatus)
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    // for (let i = 0; i < carts.length; i++) {
    //   carts[i].selected = selectAllStatus;
    // }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(2)
    let nowthis = this;
     wx.request({
      url: ip+'/address/find',
      data: {},
      success: function (res) {
        if (res.data.length != 0) {
          nowthis.setData({
            hasList: true,
            carts: res.data
          })
        }
        nowthis.data.addressSelect = nowthis.data.carts.filter(item => { return item.selected })
        console.log(nowthis.data.addressSelect)
      }
      
    })
    

  },
  newAddress: function () {

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