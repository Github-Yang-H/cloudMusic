import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [], // 轮播图数据
    recommendList: [], // 推荐歌单
    topList: [], // 排行榜数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 轮播图
    let res = await request('/banner', {
      type: 2
    })
    console.log('请求成功!', res);
    this.setData({
      bannerList: res.banners
    })
    // 获取推荐歌单数据
    let recommendListData = await request('/personalized', {
      limit: 10
    });
    this.setData({
      recommendList: recommendListData.result
    })

    // 排行榜
    let index = 0
    let topListArr = []
    while (index < 5) {
      // console.log(index++);
      let topListData = await request('/top/list', {
        idx: index++
      })
      // console.log(topListData.playlist.tracks.slice(0, 3));
      let topListItem = {
        name: topListData.playlist.name,
        tracks: topListData.playlist.tracks.slice(0, 3)
      }
      topListArr.push(topListItem)
      this.setData({
        topList: topListArr
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