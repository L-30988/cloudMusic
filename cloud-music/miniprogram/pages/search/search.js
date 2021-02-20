
//获取本地历史数据
let record = []
//获取搜索值
 let keyword = ''
 let key = ''
// 保存搜索值的数组
let keywordArr = []
let a = []
let limit =20
let page =1
let songCount=0
let playlistCount =0
let mvCount =0
let number = 0

let searchType = 1

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',
    showKeyword:'',
    searchSuggest:[],
    history: [],
    hotSearch:[],
    musiclist:[],
    newPlaylist:[],
    mv:[],
    info:[{type:1, name:'单曲'},
          {type:1000, name:'歌单'},
          {type:1004, name:'视频'}],
    infoIndex:0,
    searchTipWord:'',
    back:true,
    searchTip: true,
    isShowModel: false,
    isShowHistory: false,
    loading: false,
    loadingComplete: false,
    a:false
   
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.historyRecords()
    this.isEmptyHistory()
    this._getDefaultSearch()
    this._getHotSearch()

  },
  input(event) {
    // console.log(event.detail.value)
    keyword = event.detail.value
     this._getSearch(keyword)
    
   this.setData({
    searchTip:true,
    back:false,
   })

   this.saveHistory(keyword)


  },
  // 搜索的历史保存在本地
  saveHistory(keys){
    keywordArr.push(keys)
     a = keywordArr.concat(this.data.history)

    // 过滤删除数组中的空格
    const historyArr = a.filter(function (i) {
      return i && i.trim()
    })
    // 将搜索的历史保存在本地
    console.log(keywordArr)
    wx.setStorageSync('history',historyArr)
  },

  searchSuggest(event) {
    //一有输入值就显示搜索提示框
    console.log(event.detail.value)
    const words = event.detail.value
  

    console.log(typeof(words))
    if(words.trim()){
      this._getSearchSuggest(words)
    }
    if(words.trim()){
      this.setData({
        searchTip:false,
        searchTipWord:words
      })
    }else{
      this.setData({
        searchTip:true
      })
    }


   
  
  },
  toSearchResult(event){
console.log(event.currentTarget.dataset.keyword)
 key = event.currentTarget.dataset.keyword
 this.searchType(key)
 this.saveHistory(key)
this.setData({
  searchTip:true,
  a:true,
  back:false,
  inputValue:key
 })

  },
  removeInputValue(){
     this.setData({
         inputValue:'',
         searchTip:true,
      })
  },
  remove() {
    this.setData({
      isShowModel: true
    })
  },
  cancel() {
    this.setData({
      isShowModel: false
    })
  },
  sure() {
    // 清除本地存储数据
    wx.removeStorageSync('history')
    this.setData({
      history: [],
      isShowModel: false,
      isShowHistory: true
    })
  },


  historyRecords() {
    //获取本地历史记录
    record = wx.getStorageSync('history')

    this.setData({
      history: record

    })
  },
  //判断本地历史记录是否为空，为空则隐藏history这个view
  isEmptyHistory() {
    if (this.data.history.length === 0) {
      this.setData({
        isShowHistory: true
      })
    } else {
      this.setData({
        isShowHistory: false
      })
    }
  },

  info(event){
 
// console.log(event.currentTarget.dataset.index)
// console.log(event.currentTarget.dataset.type)
searchType = event.currentTarget.dataset.type
// console.log(searchType)
// console.log(keyword)
if(keyword){
  key = ''
  this.searchType(keyword)
}
if(key){
  keyword = ''
  this.searchType(key)
}

this.setData({
  infoIndex:event.currentTarget.dataset.index,
})

  },
  // 判断searchType类型为1或1000或1004，从而去调用_getSearch()方法
  searchType(word){
    if(searchType == 1){
      this.setData({
        musiclist:[],
        loading: true,
        
      })
  
       this._getSearch(word)
   
    }
    if(searchType == 1000){
      this.setData({
       newPlaylist:[],
       loading: true,
      })
 
     this._getSearch(word)
    }
    if(searchType == 1004){
      this.setData({
       mv:[],
       loading: true,
      })
 
      this._getSearch(word)
   
    }
  },
  back(){
    this.setData({
      back:true,
       inputValue:''
    })
    this.historyRecords()

  },

  stopCancel(){

  },

  _getSearch(keywords){
    wx.cloud.callFunction({
      name:'music',
      data:{
        $url:'search',
         limit,
         offset:(page-1)*limit,
        words:keywords,
        type:searchType
      }
    }).then((res) => {
  
      songCount = res.result.result.songCount
      playlistCount = res.result.result.playlistCount
      mvCount = res.result.result.mvCount
    
      if(searchType == 1){
        this.setData({
          loading: false,
          musiclist:this.data.musiclist.concat(res.result.result.songs)
          
        })
      }
      if(searchType == 1000){
        this.setData({
          loading: false,
          newPlaylist:this.data.newPlaylist.concat(res.result.result.playlists)
    
        })
      }
      if(searchType == 1004){
        this.setData({
          loading: false,
          mv:this.data.mv.concat(res.result.result.mvs)
        })
      }
 
    })
  },

  _getDefaultSearch(){
wx.cloud.callFunction({
  name:'music',
  data:{
    $url:'defaultSearch'
  }
}).then((res) => {
  console.log(res.result.data.showKeyword)
  this.setData({
    showKeyword:res.result.data.showKeyword
  })
})
  },
 
 
_getSearchSuggest(word){
wx.cloud.callFunction({
  name:'music',
  data:{
    $url:'searchSuggest',
    keyword:word
  
   
  }
}).then((res) => {
  console.log(res)
  console.log(res.result.result.allMatch)
  this.setData({
    searchSuggest:res.result.result.allMatch
  })
})
},


_getHotSearch(){
 wx.cloud.callFunction({
   name:'music',
   data:{
     $url:'hotSearch'
   }
 }).then((res) => {
   console.log(res.result.result.hots)
   this.setData({
    hotSearch:res.result.result.hots
   })
 })
},



//scroll-view组件滚动到底部触发的事件
allpages(allPage){
  if(number<allPage){
    number +=1
    page = number + 1
    this._getSearch(this.data.inputValue)
    this.setData({
      loading: true,
      loadingComplete: false
  
    })
   
   }else{
    this.setData({
      loading: false,
      loadingComplete: true
    })
   }
},
ReachBottomMusiclist(){
  //求出总页数
  let allPage = Math.floor(songCount/limit)
  this.allpages(allPage)

},
ReachBottomPlaylist(){
  let allPage = Math.floor(playlistCount/limit)
  this.allpages(allPage)
},
ReachBottomMV(){
  let allPage = Math.floor(mvCount/limit)
  this.allpages(allPage)
},
  
  //转换播放数量
_tranNumber(num, point){
  let numStr = num.toString().split('.')[0]
  if(numStr.length<6){
    return numStr
}else if(numStr.length>=6 && numStr.length<=8){
  1245812
  let xiaoshu = numStr.substring(numStr.length-4, numStr.length-4+point)
  return parseFloat(parseInt(num/10000)+'.'+xiaoshu)+'万'
}else if(numStr.length>8){
  let xiaoshu = numStr.substring(numStr.length-8,numStr.length-8+point)
  return parseFloat(parseInt(num/100000000)+'.'+xiaoshu)+'亿'
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