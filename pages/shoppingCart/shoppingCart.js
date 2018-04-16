// page/component/new-pages/cart/cart.js
var ip = getApp().globalData.ip;
var centerIp = getApp().globalData.centerIp;
Page({
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: true,    // 全选状态，默认全选
    obj: {
      name: "hello"
    },
    ip,
    centerIp,
    allID:[]
  },
  //跳转我的订单
  order: function () {
    wx.navigateTo({
      url: '../order/order',
    })
  },
  //去付款
  payment: function () {
    let nowthis =this;
    getApp().globalData.shoppingCarArr = this.data.carts.filter(item => {
      return item.selected
    });
    for (let i = 0; i < nowthis.data.carts.length;i++){
      if (nowthis.data.carts[i].selected=='true')
        nowthis.data.allID.push(nowthis.data.carts[i]._id)
    }

        wx.request({
          url: ip +'/shoppingCar/del' ,
      data:{
        ids: nowthis.data.allID
      } ,   
      success: function(res) {
        console.log(res)
      },
    })

    nowthis.setData({
      carts: nowthis.data.carts
    })
    wx.navigateTo({
      url: `../payment/payment`,
    })
  },

  onLoad:function(options){
    console.log(2)
    let nowthis = this;
      wx.request({
        url: ip+'/shoppingCar/find',
        data: {},
        success: function(res) {
          console.log(res)
          for(let i = 0;i<res.data.length;i++){
            res.data[i].num = parseInt(res.data[i].num)
            res.data[i].price = parseInt(res.data[i].price)
            res.data[i].sum = parseInt(res.data[i].sum)
          }        
          nowthis.setData({
            hasList: true,
            carts:res.data
          })
          nowthis.getTotalPrice();
          console.log(nowthis.data.carts)
        },
      
      })
  },


  // onShow() {
  //   this.setData({
  //     hasList: true,
  //     carts: [
  //       { id: 1, title: '新鲜芹菜 半斤', image: '../imgs/s5.png', num: 1, price: 1, sum: 1, selected: true },
  //       { id: 2, title: '素米 500g', image: '../imgs/s4.png', num: 1, price: 1, sum: 1, selected: true }
  //     ]
  //   });
  //   this.getTotalPrice();
  // },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let nowthis= this;
    console.log(carts[index])
    console.log(carts[index]._id)
      wx.request({
        url: ip+'/shoppingCar/del',
        data: {
          _id: carts[index]._id
        },
        success: function(res) {
          console.log(res)
        },
      })
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

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    //获取当前的下标
    const index = e.currentTarget.dataset.index;
    //获取当前的数据
    let carts = this.data.carts;
    //获取当前的数量
    let num = carts[index].num;
    //数量+1
    num = num + 1;
    //重新赋值数量
    carts[index].num = num;

    let price = carts[index].price;
    let sum = carts[index].sum;
    sum = price * num;
    carts[index].sum = sum;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;//获取下标
    console.log(e.currentTarget)
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;//获取数据             
    let num = carts[index].num;//获取数量
    if (num <= 1) {
      return false;
    }
    num = num - 1;//数量减一
    let price = carts[index].price; //获取价钱
    let sum = carts[index].sum; //获取总价
    sum = price * num;  //改变总价
    carts[index].num = num; //重新赋值数量
    carts[index].sum = sum; //重新赋值总价
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].num * carts[i].price;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },

     /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(2)
    let nowthis = this;
    wx.request({
      url: ip+'/shoppingCar/find',
      data: {},
      success: function (res) {
        console.log(res)
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].num = parseInt(res.data[i].num)
          res.data[i].price = parseInt(res.data[i].price)
          res.data[i].sum = parseInt(res.data[i].sum)
        }
        nowthis.setData({
          hasList: true,
          carts: res.data
        })
        nowthis.getTotalPrice();
        console.log(nowthis.data.carts)
      },

    })
  },


})