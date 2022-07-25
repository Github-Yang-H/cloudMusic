// pages/personal/personal.js
import request from '../../utils/request'
let startY = 0 //手指起始坐标
let moveY = 0 //手指移动坐标
let moveDistance = 0 //手指移动距离
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: 'translateY(0)',
    coverTranstion: '',
    userInfo: '', //用户信息
    recentlyPlayedList:[]  //最近播放
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo')
 
    if (userInfo) {
      this.setData({
        userInfo: JSON.parse(userInfo)
      })
    }
    this.getRecentlyPlayedList(this.data.userInfo.userId)
    
  },

  // 手指开始触摸
  handleTouchStart(event) {
    this.setData({
      coverTranstion: ''
    })
    // console.log(event.touches);
    startY = event.touches[0].clientY
  },
  // 手指移动
  handleTouchMove(event) {
    // console.log(event.touches[0].clientY);
    moveY = event.touches[0].clientY
    moveDistance = moveY - startY
    if (moveDistance <= 0) {
      return
    }
    if (moveDistance >= 80) {
      moveDistance = 80
    }
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`
    })
  },
  // 手指动作结束
  handleTouchEnd() {
    this.setData({
      coverTransform: 'translateY(0rpx)',
      coverTranstion: 'transform 1s linear'
    })
  },

  // 跳转页面
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  async getRecentlyPlayedList(userId) {
    let res = await request('/user/record', {
      uid: userId,
      type: 1
    })
    let index = 0
    let recentlyPlayedList = res.weekData.splice(0,10).map(item => {
      item.id = index++
      return item
    })
    this.setData({recentlyPlayedList})
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