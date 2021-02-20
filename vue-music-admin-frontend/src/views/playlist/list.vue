<template>
  <div>
    <el-table v-loading.fullscreen.lock="loading" :data="playlist" stripe>
      <el-table-column type="index" label="条数" width="60"></el-table-column>
      <el-table-column prop="date" label="封面" width="150">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" alt="" height="80" width="80" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="copywriter" label="描述"></el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
          <el-button size="medium" @click="toEdit(scope.row)">编辑</el-button>
          <el-button size="medium " type="danger" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定删除该条歌单？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchPlaylist, remove } from "@/api/playlist.js";
import scroll from "@/utils/scroll.js";

export default {
  data() {
    return {
      playlist: [],
      count: 40,
      loading: false,
      dialogVisible: false,
      id: "",
      b:true
    };
  },
  created() {
    //做这个进入页面刷新的原因是vue单页面的路由地址不改变的话就不会刷新路由，这样如果切换页面的话就会缓存上一个，导致我的下拉加载功能加载出来的不是当前页面数据，所以做了个刷新就可正常加载
    　//第一次进入页面刷新一次，仅一次
　　//location.href.indexOf("#")获取当前页面地址并在其中查找"#"首次出现位置，找不到就是-1
     if(location.href.indexOf("#")==-1){
　　//在当前页面地址加入"#"，使下次不再进入此判断
    location.href=location.href+"#歌单管理";
   
    this.$router.go()
   
     }
    this.getPlaylist();

  },
 
  mounted() {

      scroll.start(this.getPlaylist)
  
   
  },
  methods: {
    getPlaylist() {
      this.loading = true;
      fetchPlaylist({
        start: this.playlist.length,
        count: this.count
      }).then(res => {
        console.log(res);
        
        this.playlist = this.playlist.concat(res.data);
        if (res.data.length < this.count) {
          scroll.end();
        }
        this.loading = false
      });
    },
    toEdit(row) {
      console.log(row);
      this.$router.push(`/playlist/edit/${row._id}`);
    },
    remove(row) {
      this.dialogVisible = true;
      console.log(row._id);
      this.id = row._id;
    },
    sure() {
      remove(this.id).then(res => {
        console.log(res)
        this.dialogVisible = false
        if (res.data.deleted > 0) {
          this.$message.success("删除成功")
          this.playlist = []
          this.getPlaylist()
        }else{
          this.$message.error("删除失败")
        }
      })
    }
  }
};
</script>

<style></style>
