// pages/newsong/newsong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:[
      {id:0,name:"全部"},
      {id:7,name:"华语"},
      {id:96,name:"欧美"},
      {id:8,name:"日本"},
      {id:16,name:"韩国"}
    ],
    img:[
    {id:0,url:"https://icweiliimg1.pstatp.com/weili/bl/237277109021835282.jpg"},//全部
    {id:7,url:"http://n1.itc.cn/img8/wb/recom/2016/04/16/146079400520823519.JPEG"},//华语
    {id:96,url:"http://pic13.nipic.com/20110401/5945050_100314699000_2.jpg"},//欧美
    {id:8,url:"http://img.sucaijishi.com/uploadfile/2020/0903/20200903040340681.jpg"},//日本
    {id:16,url:"http://5b0988e595225.cdn.sohucs.com/images/20180519/aaea7c2119004289b9f9bcc8e5fce134.jpeg"},//韩国
    ],
 
    imgIndex:0,
    titleId:0,
    newSong:[],
    playerId:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 this._getTopSong(0)

  },

  _getTopSong(data){
wx.cloud.callFunction({
  name:'music',
  data: {
    type:data,
    $url: 'topsong'
  }
}).then((res) => {
  console.log(res)
  this.setData({
       newSong:res.result.data
  })
  wx.stopPullDownRefresh()
})
},

  activeTitle(event){
   console.log(event.currentTarget.dataset.titleid)
   console.log(event.currentTarget.dataset.index)
 
  const titleIds = event.currentTarget.dataset.titleid
  const index = event.currentTarget.dataset.index

   this.setData({
    newSong:[],
    titleId :titleIds,
    imgIndex:index
   })
   this._getTopSong(titleIds)


   

  },

  goToPlayer(event){
    console.log(event.currentTarget.dataset.id)
   const playerid = event.currentTarget.dataset.id
   const index = event.currentTarget.dataset.index
    this.setData({
      playerId: playerid,
    })
    wx.navigateTo({
      url: `../player/player?musicId=${playerid}&index=${index}`,
    })
  },
  goToMVDetail(event){
console.log(event.currentTarget.dataset.mvid)
const mvId = event.currentTarget.dataset.mvid
wx.navigateTo({
  url: `../mv-detail/mv-detail?mvId=${mvId}`,
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
  newSong:[],
})
this._getTopSong(0)

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