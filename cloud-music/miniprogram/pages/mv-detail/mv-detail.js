// pages/mv-detail/mv-detail.js
import formatTime from '../../utils/formatTime.js'
let artistId = 0
let limit =8
let page = 1
let total = 0
let number = 0
let mvId= 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
  showIndex:0,
  showCommentIndex:0,
  mvurl:[],
  mvurlNull:true,
  artistName:'',
  artistImg:'',
  mvName:'',
  mvDesc:'',
  playCount:0,
  shareCount:0,
   likeCount:0,
  allComentCount:0,
  userComment:[],
  loading: false,
  loadingComplete: false,
  scroll:false


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log(options)
   mvId = options.mvId

   this._getmvUrl(options.mvId)
   this._getmvDetail(options.mvId)
   this._getComment(options.mvId)
   
   
   
   
  },

_getmvUrl(mvid){
 wx.cloud.callFunction({
   name:'music',
   data: {
     $url:'mvUrl',
     mvId:mvid
   }
 }).then((res) => {
  console.log(res)
   console.log(res.result.data.url)
   if(res.result.data.url == null){
     this.setData({
      mvurlNull:false
     })
    return
   }
   this.setData({
     mvurl:res.result.data.url
   })
 })
},
_getmvDetail(mvid){
wx.cloud.callFunction({
  name:'music',
  data:{
    $url:'mvDetail',
    mvId:mvid
  }
}).then((res) => {
  console.log(res)
  const mv = res.result.data
   artistId=mv.artists[0].id
 this._getArtistDetail(artistId)
const title = mv.name
 wx.setNavigationBarTitle({
  title:title,
})


 if(mv.desc == null){
   this.setData({
    mvDesc:[]
   })
 }else{
  this.setData({
    mvDesc:mv.desc
   })
 }
  console.log(artistId)
  this.setData({
    artistName:mv.artistName,
    mvName:mv.name,
    playCount:mv.playCount,
    likeCount:mv.subCount,
    shareCount:mv.shareCount,
    allComentCount:mv.commentCount
  })
})
},

_getArtistDetail(artistid){
  wx.cloud.callFunction({
    name:'music',
    data:{
      $url:'artistDetail',
      artistId:artistid

    }
  }).then((res) => {
    console.log(artistId)
    console.log(res)
    this.setData({
      artistImg:res.result.artist.picUrl
    })
  })

},
_getComment(mvid){
wx.cloud.callFunction({
  name:'music',
  data:{
    $url:'mvComment',
    mvId:mvid,
    limit:limit,
    offset:(page - 1)* limit
  }
}).then((res) => {
  console.log(res)

if(res.result.total){
  total = res.result.total
}
const comment = res.result.comments
//格式化时间
for(let i=0; i<comment.length; i++){
  let times = comment[i].time
 let time = formatTime(new Date(times))
  comment[i].time = time
}
  this.setData({
    userComment:this.data.userComment.concat(comment)

  })
})
},










  //折叠功能
  up(event){
console.log(event.currentTarget.dataset.index)
const index = event.currentTarget.dataset.index
if(index != this.data.showIndex){
  this.setData({
    showIndex:index
  })
}else{
  this.setData({
    showIndex:0
  })
}
  },

  comment(event){
    const commentindex = event.currentTarget.dataset.index
    console.log(commentindex)
    if(commentindex != this.data.showCommentIndex){
          this.setData({
            showCommentIndex:commentindex
          })
    }else{
      this.setData({
        showCommentIndex:0
      })
    }
  },
  onPageScroll(event){
// console.log(event.scrollTop)
if(event.scrollTop>200){
  
  this.setData({
    scroll:true
  })
}else{
  this.setData({
    scroll:false
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
   console.log(mvId)
 console.log(total)
 const allPage = Math.floor(total/limit)
 if(number < allPage){
   number += 1
   page =number + 1
 console.log(page)
 console.log(allPage)
  this._getComment(mvId)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})