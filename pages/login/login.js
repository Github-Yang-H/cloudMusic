// pages/login/login.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '15536078759',
    password: 'yh990930...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  handleInput(){},

 async handleLogin(){
    let {phone,password}  =this.data
    if(!phone){
      wx.showToast({
        title: '手机号不能为空!',
        icon:'error'
      })
      return
    }
    let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
    if(!regs.test(phone)){
      wx.showToast({
        title: '手机号格式不正确!',
        icon:'error'
      })
      this.setData({
        phone:''
      })
      return
    }
    if(!password){
      wx.showToast({
        title: '请输入密码!',
        icon:'error'
      })
      return
    }

    let res =await request('/login/cellphone',{phone,password,isLogin:true})
    console.log(res);
    if(res.code === 200){
      wx.showToast({
        title: '登录成功!',
        icon:'success'
      }) 
      wx.setStorageSync('userInfo',JSON.stringify(res.profile))
      wx.reLaunch({
        url:'/pages/personal/personal'
      })
    }else if(res.code === 400){
      wx.showToast({
        title: '手机号错误!',
        icon:'error'
      })
    }else if(res.code === 502){
      wx.showToast({
        title: '密码错误!',
        icon:'error'
      })
    }else{
      wx.showToast({
        title: '登陆失败',
        icon:'error'
      })
    }
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