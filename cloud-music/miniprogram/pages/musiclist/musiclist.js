// pages/musiclist/musiclist.js
let trackId = []
let trackIds = []
let str = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    musiclist: [],
    listInfo: {},
    loading: true,
    coverImgUrl:'',
    name:''
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
   const fetchId = Number(options.playlistId)
    this.fetchDBpicUrl(fetchId)

    wx.cloud.callFunction({
      name: 'music',
      data: {
        playlistId: options.playlistId,
        $url: 'musiclist'
      }
    }).then((res) => {
      console.log(res.result.playlist)
      trackId = res.result.playlist.trackIds
      console.log(trackId)

      //循环遍历trackId
      for (const key in trackId) {
        str += trackId[key].id + ","
      }
      str = str.substring(0, str.length - 1)
      trackIds = str.split(",").map(Number)
      console.log(trackIds)
      //获取trackIds音乐详情
      wx.cloud.callFunction({
        name: 'music',
        data: {
          $url: 'songDetail',
          musiclistId: trackIds
        }
      }).then((res) => {
        console.log(res.result.songs)
        this.setData({
          musiclist: res.result.songs
        })
        this._setMusiclist()
      })
      //

      const playList = res.result.playlist
      console.log(playList.tracks)
      this.setData({
        loading: false,
       // musiclist: playList.tracks,

        listInfo: {
          // coverImgUrl: playList.coverImgUrl,
          // name: playList.name,
          avatarUrl: playList.creator.avatarUrl,
          nickname: playList.creator.nickname,
          description: playList.description,
        }
      })
     // this._setMusiclist()
    })


  },

  //小程序端对云数据库的操作，因若后端系统管理对云数据库的内容进行修改时，小程序端因同步，因此不可以在调用api接口，所以改成从云数据库中拿取数据，保证修改同步
fetchDBpicUrl(Id){
wx.cloud.database().collection('playlist').where({id:Id}).get().then((res) => {
  console.log(res)
  this.setData({
    coverImgUrl:res.data[0].picUrl,
     name:res.data[0].name
  })
})

},

  _setMusiclist() {
    wx.setStorageSync('musiclist', this.data.musiclist)

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