// pages/profile-bloghistory/profile-bloghistory.js
const MAX_LIMIT =15
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blogList: [],
    loading: false, 
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getListByCloudFn()

  },
  _getListByCloudFn(){
  
    wx.cloud.callFunction({
      name:'blog',
      data:{
        $url: 'getListByOpenid',
        start:this.data.blogList.length,
        count: MAX_LIMIT
      }

    }).then((res)=>{
     
      console.log(res)
      if( res.result != 0){
        this.setData({
          loading: true ,
          blogList: this.data.blogList.concat(res.result)
        })
      }else{
        this.setData({
          loading:false
        })
      }
      
    })
  },
  goComment(event){
    wx.navigateTo({
      url: `../blog-comment/blog-comment?blogId=${event.target.dataset.blogid}`,
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getListByCloudFn()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (event) {
    const blog = event.target.dataset.blog
    return{
      title:blog.content,
      path:`/pages/blog-commment/blog-commment?blogId=${blog._id}`
    }

  }
})