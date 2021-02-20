// components/new-playlist/new-playlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    newPlaylist:Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToMusiclist(event){
  console.log(event.currentTarget.dataset.id)
  const playlistId = event.currentTarget.dataset.id
  wx.navigateTo({
    url: `../../pages/musiclist/musiclist?playlistId=${playlistId}`,
  })
    }
  }
})
