// pages/index/index.js
const MAX_LIMIT = 6

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView: 'green',
    swiperUrl:[],
    playlist:[],
    newSong:[],
    recommendMV:[]
    

  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getPlaylist(),
    this._getBanner(),
    this._getNewSong(),
    this._getRecommendMV()
    

  },
  goToSearch(){
wx.navigateTo({
  url: `../search/search`,
})
  },
  goToNewsong(){
    wx.navigateTo({
      url: '../newsong/newsong',
    })
  },
  goToPlaylist(){
    wx.navigateTo({
      url: '../playlist/playlist',
    })
  },

  goToMV(){
  wx.navigateTo({
    url: '../mv/mv',
  })
  },
  goToPlayer(event){
    console.log(event.currentTarget.dataset.musicid)
    const ds = event.currentTarget.dataset
    const musicid = ds.musicid
    wx.navigateTo({
      url: `../player/player?musicId=${musicid}&index=${ds.index}`,
    })
   },
   goToMVDetail(event){
console.log(event.currentTarget.dataset.mvid)
const mvId =event.currentTarget.dataset.mvid
wx.navigateTo({
  url: `../mv-detail/mv-detail?mvId=${mvId}`,
})
   },
  _getPlaylist(){
  
    wx.cloud.callFunction({
      name: 'music',
      data: {
        start: this.data.playlist.length,
        count: MAX_LIMIT,
        $url: 'playlist'
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        playlist:res.result.data
      })
      wx.stopPullDownRefresh()

    })
    
  },
  _getBanner(){
    wx.cloud.callFunction({
      name: 'music',
      data: {
        $url: 'banner'
      }
    }).then((res) => {
      //console.log(res.result)
      this.setData({
        swiperUrl:res.result.banners
      })
      wx.stopPullDownRefresh()
    })

  },
  _getNewSong(){
    wx.cloud.callFunction({
      name: 'music',
      data: {
        $url: 'newsong'
      }
    }).then((res) => {
     // console.log(res.result.result)
    this.setData({
      newSong:res.result.result
    })
    wx.stopPullDownRefresh()
    })

  },
  _getRecommendMV(){
    wx.cloud.callFunction({
      name: 'music',
      data: {
        $url: 'recommendMV'
      }
    }).then((res) => {
      console.log(res.result.result)
      this.setData({
        recommendMV:res.result.result
      })
      wx.stopPullDownRefresh()
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
     this.setData({
      swiperUrl:[],
      playlist:[],
      newSong:[],
      recommendMV:[]      
     })
     this._getPlaylist(),
     this._getBanner(),
     this._getNewSong(),
     this._getRecommendMV()
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