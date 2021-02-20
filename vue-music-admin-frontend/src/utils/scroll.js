const scroll = {
    isEnd:false,

    start(callback){
        let timer = null
        callback && window.addEventListener('scroll', () => {
          
            if(timer){
                clearTimeout(timer)
            }
            // 定时器防抖，防止浏览器每次滚动一直触发scroll事件
            timer = setTimeout(() => {
                //获取浏览器向上的滚动的高度
                const scrollTop =document.documentElement.scrollTop || document.body.scrollTop
                //文档即所有数据的真实高度
                const scrollHeight = document.documentElement.scrollHeight
                //浏览器可视窗口的高度
                const clientHeight = document.documentElement.clientHeight
            //    console.log(Math.ceil(scrollTop))
            //    console.log(scrollHeight)
            //    console.log(clientHeight)
            //    console.log(scrollHeight == Math.ceil(scrollTop) + clientHeight)
            //经测试在edge浏览器中scrollHeight == scrollTop + clientHeight返回值为false，
            //所以就不能触发触底加载数据，在ie或者360浏览器中它的严格程度不那么严，所以即使为false也能触发，要解决edge浏览器的严格模式，因此对scrollTop向上取整，这样它们相加起来就为true
                if(!this.isEnd && scrollHeight == Math.ceil(scrollTop) + clientHeight) {
                    //设置滚动条的位置，以免未设置滚动条一直触底加载数据
                     window.scrollTo(0,scrollTop - 100)   
                     console.log('触底')
                     callback()
                  
                
                  
                   
                }


            }, 300)

        })
  
    },
    end(){
        console.log('完了')
       this.isEnd = true
    }

}

export default scroll