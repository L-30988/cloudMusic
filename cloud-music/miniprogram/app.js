//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'chen-wei-lin',
        traceUser: true,
      })
    }
    this.getOpenid()

    this.globalData = {
      playingMusicId: -1,
      openid:-1
    }
  },
  setPlayMusicId(musicId){
    this.globalData.playingMusicId = musicId
  },
  getPlayMusicId(){
    return this.globalData.playingMusicId
  },
  getOpenid(){
    wx.cloud.callFunction({
      name: 'login'
    }).then((res) => {
      const openid = res.result.openid
      this.globalData.openid =  openid
      if(wx.getStorageSync( openid) == ''){
        wx.setStorageSync( openid, [])
      }
    })
  }
})
