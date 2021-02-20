// components/lyric/lyric.js
let lyricHeight = 0
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowLyric:{
      type: Boolean,
      value:false,
    },
    lyric:String

  },
  observers: {
    lyric(lrc) {
      if (lrc == '👀暂无歌词,亲＞﹏＜'){
        this.setData({
          lrcList:[{
            lrc,
            time: 0,
          }],
          nowLyricIndex: -1
        })
      }else{
        this._parseLyric(lrc)
      }
   
      // console.log(lrc)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    lrcList: [],
    nowLyricIndex: 0, //当前选中歌词下标
    scrollTop: 0 //滚动条的滚动高度

  },
  lifetimes:{
    ready(){
      wx.getSystemInfo({
        success(res) {
          console.log(res)
          //求出1rpx大小
           lyricHeight = res.screenWidth / 750 * 64

        },
      })

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    update(currentTime){
      console.log(currentTime)
      let lrcList = this.data.lrcList
      if(lrcList.length == 0){
        return
      }

      if(currentTime >=lrcList[lrcList.length - 1].time){
        if(this.data.nowLyricIndex != -1){
          this.setData({
            nowLyricIndex: -1,
            scrollTop: lrcList.length * lyricHeight
          })
        }
      }

      for(let i=0, len = lrcList.length; i<len; i++){
        if(currentTime <= lrcList[i].time){
          this.setData({
            nowLyricIndex: i - 1,
            scrollTop: (i - 1) * lyricHeight
          })
          break
        }
      }
    },
    _parseLyric(sLyric) {
      let line = sLyric.split('\n')
      // console.log(line)
      let _lrcList = []
      line.forEach((elem) => {
        let time = elem.match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g)
        if (time != null) {
          let lrc = elem.split(time)[1]
          let timeReg = time[0].match(/(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/)
          // console.log(timeReg)
          // 把时间转换为秒
          let time2Seconds = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3]) / 1000
          _lrcList.push({
            lrc,
            time: time2Seconds,
          })
        }
      })
      this.setData({
        lrcList: _lrcList
      })
    }

  }
})
