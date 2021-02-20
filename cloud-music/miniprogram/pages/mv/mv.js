
let limit =12
let total = 0
let page = 1
let number = 0


Page({

  /**
   * 页面的初始数据
   */
  data: {
    Area: [{name: '全部'}, {name: '内地'}, {name: '港台'}, {name: '欧美'}, {name: '日本'}, {name: '韩国'}],
    areaName: '全部',
    Type: [{name: '全部'}, {name: '官方版'}, {name: '原声'}, {name: '现场版'}, {name: '网易出品'}],
    typeName: '全部',
    Order: [{name: '上升最快'}, {name: '最热'}, {name: '最新'}],
    orderName: '上升最快',
    mv: [],
    a: '最热',
    loading: false,
    loadingComplete: false,



  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
      this._getAllMV()
   
     
   
  
    
  },
  
  area(event) {
    
    const name = event.currentTarget.dataset.name
    console.log(name)
    this.setData({
      areaName: name,
      mv:[]
   
    })
  
      this._getAllMV()
  },
 


 
  type(event) {
    console.log(event.currentTarget.dataset.name)
    const name = event.currentTarget.dataset.name
    this.setData({
      typeName: name,
      mv:[]
    })
    this._getAllMV()
 
  },
  order(event) {
    console.log(event.currentTarget.dataset.name)
    const name = event.currentTarget.dataset.name
    this.setData({
      orderName: name,
      mv:[]
    })
    this._getAllMV()
 
  },
  _getAllMV() {
    wx.cloud.callFunction({
      name: 'music',
      data: {
        $url: 'allMV',
        area: this.data.areaName,
        type: this.data.typeName,
        orders: this.data.orderName,
        limit: limit,
        offset: (page - 1) * limit
      }
    }).then((res) => {
      console.log(res.result.data)
      if (res.result.count) {
        total = res.result.count
      }
      console.log(res)
      const allmv = res.result.data
      this.setData({
          mv: this.data.mv.concat(res.result.data)
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      mv: []
    })
    this._getAllMV()
 },


  /**
   * 页面上拉触底事件的处理函数
   */
    onReachBottom: function () {
      // 总条数/一次取的数据个数=总分页的数
      console.log(total)
      const ALLPage = total / limit

      //  条件判断-判断每次数字自加是否小于总分页数，是的话就继续自加，大于总分页数的话就给用户提示加载数据完毕
     // number表示每次自加的数
      if (number < ALLPage) {
        number += 1
         console.log(number)
      
        page = number + 1 //进行+1的操作，是因为进入mv页面时就调用_getAllMV()函数，所以数据占了一页，加1就是让它从第二页获取数据，而不导致重复
        console.log(page)
        this._getAllMV()
        this.setData({
          loading: true,
          loadingComplete: false
        })
      } else {
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