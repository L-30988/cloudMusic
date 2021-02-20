<template>
  <el-form ref="form" :model="playlist" label-width="80px" size="medium">
    <el-form-item label="歌单名称">
      <el-input v-model="playlist.name"></el-input>
    </el-form-item>
    <el-form-item label="歌单描述">
      <el-input v-model="playlist.copywriter"></el-input>
    </el-form-item>
    <el-form-item label="封面">
      <template>
        <div class="img">
          <img
            :src="playlist.picUrl"
            height="80"
            :class="isChangImg == true ? 'hidden' : ''"
          />
          <img :src="img.imgUrl" height="80" />
          <el-upload
            class="upload-demo"
            ref="upload"
            action="http://localhost:3000/playlist/imgUrl"
            :show-file-list="false"
            :on-success="uploadSuccess"
          >
            <el-button size="mini" type="info" round >更换封面</el-button>
          </el-upload>
        </div>
      </template>
    </el-form-item>

    <el-form-item size="large">
      <el-button type="primary" @click="onSubmit">更新</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { fetchSingleId, update, delStorage } from "@/api/playlist.js";
export default {
  data() {
    return {
      playlist: {},
      img: {
        imgUrl:''
      },
      isChangImg: false,
      fileId:'',
      
    };
  },

  created() {
   

    fetchSingleId({
      id: this.$route.params.id
    }).then(res => {
      console.log(res);
      //页面创建初期，从云数据库里拿到fileid值并赋值
    this.fileId = res.data.fileId
  
      this.playlist = res.data;
    });
  },

  methods: {
    onSubmit() {
    
       const params = {}
      //  从sessionStorage里拿到存储的fileid之后，赋值给 const fileId之后作为参数向后端更新数据，同时在后端将fileid拿到并存在数据库中
         this.fileId =  sessionStorage.getItem('fileId')
     console.log('学习了'+this.fileId)
       const fileId = {
         fileid :this.fileId
       }
       //将多个对象合并成一个对象作为参数
       Object.assign(params,this.playlist,this.img,fileId)
       
       if(params.imgUrl == ''){
         params.imgUrl = params.picUrl
       }
       console.log(params.imgUrl)
        console.log(params)
    // console.log(this.playlist)
    
       update(params).then((res) => {
         console.log(res)
        //  返回值里有个modified，若modified值不为0，则是更新成功
         if(res.data.modified > 0){
             this.$message.success('更新成功')
        this.$router.push('/playlist/list')

         }else{
           this.$message.error('更新失败')
         }
       });
     
    },
    onCancel(){
       this.$router.push('/playlist/list')
    },
    uploadSuccess(res) {
      console.log("上传成功");
      this.$message.success("更换成功");
     
      this.img.imgUrl = res.data.url;
      this.isChangImg = true;
     
console.log('看看'+res.data.fileid)

      //后端管理员多次对同一条数据更换图片时，在云存储上会存同一条数据的多张图片，造成存储空间的浪费
      //因此使用sessionStorage保存上一条fileid，再更换图片时，后端会根据fileid去云存储删除之前的图片，从而不会造成存储空间的浪费
      sessionStorage.setItem('fileId',res.data.fileid)
    //用setTimeout的原因是每次上传的时候都会更新sessionStorage里的存储，为了让它删除之前的fileid，所以就延迟5秒来获取最新的fileid，从而即能删除之前的id，也能获得最新id
       setTimeout(() => {
             this.fileId =  sessionStorage.getItem('fileId')
       },5000)

       //若刚进入当前页面则从fetchSingleId()这个函数拿到云数据库里的fileid，如果是在当前页面多次更换图片，则从sessionStorage里拿到fileid，调用delStorage函数去云存储删除图片，目的为了减少云存储的不必要空间，充分利用
       delStorage(this.fileId).then((res) => {
         console.log(res)
        
       })
    },
   

   
  }
};
</script>

<style>
.el-form {
  margin-top: 20px;
}
.el-button {
  margin-left: 20px;
}
.img {
  display: flex;
  align-items: flex-end;
}
.hidden {
  display: none;
}
</style>
