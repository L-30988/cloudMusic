// pages/playlist/playlist.js
const MAX_LIMIT = 18
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playlist:[],
    loading: false, 
    loadingComplete: false  

   

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getPlaylist()
  
   

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
    this.setData({
      playlist:[]
    })
    this._getPlaylist()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getPlaylist()
   
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  _getPlaylist(){
  
    wx.cloud.callFunction({
      name: 'music',
      data: {
        start:this.data.playlist.length,
        count: MAX_LIMIT,
        $url: 'playlist'
      }
    }).then((res) => {
      if (res.result.data != 0){
      console.log(res)
      this.setData({
        playlist:this.data.playlist.concat(res.result.data),
        loading: true 
      })
      } else {
      this.setData({
       loadingComplete: true, 
       loading: false  
        });
      }  
      wx.stopPullDownRefresh()
    })
    
  }
})