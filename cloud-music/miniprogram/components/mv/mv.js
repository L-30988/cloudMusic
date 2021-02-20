// components/mv/mv.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mv:Array
  },
  observers: {
  mv(item){
    console.log(item)
    for (let i = 0; i < item.length; i++) {
      let duration = item[i].duration
      let min = parseInt(duration / 1000 / 60)
      if (min < 10) {
        min = '0' + min
      }
      let sec = parseInt((duration / 1000) % 60)
      if (sec < 10) {
        sec = '0' + sec
      }
      //  console.log(min + '--'+ sec)

      item[i].duration = `${min}:${sec}`
      item[i].playCount = this._tranNumber(item[i].playCount, 2)
       
  this.setData({
    mvs:item
  })
   
    }
 
  }

  },

  /**
   * 组件的初始数据
   */
  data: {
    mvs : []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToMVDetail(event){
      console.log(event)
 console.log(event.currentTarget.dataset.mvid)
 const mvId = event.currentTarget.dataset.mvid
 wx.navigateTo({
   url: `../../pages/mv-detail/mv-detail?mvId=${mvId}`,
 })
    },


     //转换播放数量
    _tranNumber(num, point) {
      let numStr = num.toString().split('.')[0]
      if (numStr.length < 6) {
        return numStr
      } else if (numStr.length >= 6 && numStr.length <= 8) {
        1245812
        let xiaoshu = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
        return parseFloat(parseInt(num / 10000) + '.' + xiaoshu) + '万'
      } else if (numStr.length > 8) {
        let xiaoshu = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
        return parseFloat(parseInt(num / 100000000) + '.' + xiaoshu) + '亿'
      }
  
  
    },



  }
})
