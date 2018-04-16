var index = 0;
var ip = getApp().globalData.ip;
Page({
  data:{
    name:"请填写您的姓名",
    tel:"请填写您的联系方式",
  },
   
  formSubmit: function(e) {
    var warn ="";
    var that = this;
    var flag = false;
    if(e.detail.value.name==""){
      warn = "请填写您的姓名！";
    }else if(e.detail.value.phone==""){
      warn = "请填写您的手机号！";
    }else if(!(/^1\d{10}$/.test(e.detail.value.phone))){
      warn = "手机号格式不正确";
    }else if(e.detail.value.addre=='0'){
      warn = "请选择您的所在区域";
    }else if(e.detail.value.door==""){
      warn = "请输入您的具体地址";
    }else{
      flag=true;
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
        
      wx:wx.request({
        url:ip+'/address/add',
        data: e.detail.value,
        success: function(res) {
          console.log(res)
          wx:wx.navigateTo({
            url: '../address/address',
          })
        },
    
      })

    }
    if(flag==false){
      wx.showModal({
      title: '提示',
      content:warn
    })
    }
    
  },
  
  })