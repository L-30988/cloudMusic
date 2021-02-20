<template>
  <div>
    <el-table v-loading.fullscreen.lock="loading" :data="bloglist" stripe>
      <el-table-column label="条数" type="index"> </el-table-column>
      <el-table-column prop="content" label="内容"> </el-table-column>
      <el-table-column prop="nickName" label="发布者"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="medium " type="danger" @click="del(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定删除该条内容？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchBlogList, del } from "@/api/blog.js";
import scroll from "@/utils/scroll.js";
export default {

  data() {
    return {
      count: 12,
      bloglist: [],
      dialogVisible: false,
      loading: false,
      blogParmas:[]
    
 
   
    };
  },
  

  created() {
    　//第一次进入页面刷新一次，仅一次
　　//location.href.indexOf("#")获取当前页面地址并在其中查找"#"首次出现位置，找不到就是-1
     if(location.href.indexOf("#")==-1){
　　//在当前页面地址加入"#"，使下次不再进入此判断

    location.href=location.href+"#博客管理";
   
    this.$router.go()
   
     }

 this.getBlogList();
  },
 

  mounted() {

     scroll.start(this.getBlogList);
  },
  methods: {

    getBlogList() {
      this.loading = true;
      fetchBlogList({
        count: this.count,
        start: this.bloglist.length
      }).then(res => {
        console.log(res.data.data);
        const list = res.data.data;
        const blog = [];
        for (let i = 0, len = list.length; i < len; i++) {
          blog.push(JSON.parse(list[i]));
        }
        this.bloglist = this.bloglist.concat(blog);
        if (list.length < this.count) {
          scroll.end();
        }
        this.loading = false;
      });
    },
    del(row) {
      console.log(row)
       this.dialogVisible = true;
       this.blogParmas = row;
    },
    ok() {
      console.log("res");
      del(this.blogParmas).then(res => {
        console.log(res.data[0].deleted>0);
           this.dialogVisible = false;
        if(res.data[0].deleted>0){
       this.$message.success("删除成功")
       this.bloglist = []
       this.getBlogList()
        }else{
          this.$message.error("删除失败")
        }
      });
      
    }
  }
};
</script>

<style></style>
