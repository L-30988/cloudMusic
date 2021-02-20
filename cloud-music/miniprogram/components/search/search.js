// components/search/search.js
let keyword = ''
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder:{
      type:String,
      value:"搜索"
      
    }

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
    input(event){
      keyword = event.detail.value
    },
    search(){
      console.log( keyword)
      this.triggerEvent('search', {
        keyword
      })

    },
  

  }
})
