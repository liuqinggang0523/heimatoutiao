<template>
  <el-card>
    <bread-crumb slot="header">
       <template slot="title">
         素材管理
       </template>
    </bread-crumb>
    <el-row type="flex" justify="end">
       <el-upload class="upload" :multiple="true" action="" :http-request="uploadImg" :show-file-list="false">
         <el-button type="primary">上传文件</el-button>
       </el-upload>
    </el-row>
    <el-tabs v-model="activeName" type="card"
     @tab-click="changeTab"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(225, 225, 225, 0.8)">
      <el-tab-pane label="所有图片" name="all"></el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect"></el-tab-pane>
      <el-tab-pane label="备用图片" name="ready"></el-tab-pane>
    </el-tabs>
    <div class="box">
      <el-card class="box1"
      v-for="(item,index) in list"
      :key="index">
        <img :src="item.url" alt="">
        <div class="bottom-box">
           <i @click="isCollect(item)" class="el-icon-star-on" :style="{color:item.is_collected?'red':'#000'}"></i>
           <i @click="delImg(item.id)" class="el-icon-delete-solid"></i>
        </div>
      </el-card>
    </div>
    <!-- 分页 -->
    <el-row type="flex" justify="center" style="height:60px" align="middle">
      <el-pagination  background  layout="prev, pager, next"
         :total="page.total"
         :page-size="page.pageSize"
         :current-page="page.currentPage"
         @current-change="changePage"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [], // 用于接收素材
      page: {
        total: 0, // 总条数默认0
        currentPage: 1, // 默认当前页码为1
        pageSize: 8 // 每页个数
      },
      loading: false // Loading加载状态
    }
  },
  methods: {
    async delImg (id) {
      await this.$confirm('确定要删除图片吗')
      await this.$axios({
        method: 'delete',
        url: `/user/images/${id}`
      })
      this.$message({
        type: 'success',
        message: '删除成功'
      })
      this.getImg()
    },
    async isCollect (item) { // 点击收藏或取消收藏
      await this.$axios({
        method: 'put',
        url: `/user/images/${item.id}`,
        data: { collect: !item.is_collected }
      })
      this.getImg()
    },
    async uploadImg (params) { // 上传图片方法
      this.loading = true // 加载状态
      let data = new FormData()
      data.append('image', params.file) // 文件加入到参数中
      await this.$axios({
        url: '/user/images',
        method: 'post',
        data
      })
      this.getImg()
      this.loading = false
      // setTimeout(() => { this.loading = false }, 300)
    },
    changePage (newPagae) { // 切换页码事件
      this.page.currentPage = newPagae
      this.getImg()
    },
    changeTab () {
      this.page.currentPage = 1 // 切换tab标签栏时默认第一页
      this.getImg()
    },
    async getImg () { // 获取素材
      // this.activeName === 'collect'
      let res = await this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect', // 参数collect为false表示全部图片,true为收藏图片
          page: this.page.currentPage,
          per_page: this.page.pageSize }
      })
      this.list = res.data.results
      this.page.total = res.data.total_count // 素材总个数
    }
  },
  created () {
    this.getImg()
  }
}
</script>

<style lang='less' scoped>
 .box {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   .box1{
     margin-bottom: 15px;
     img{
       width: 200px;
       height: 210px;
     }
     .bottom-box{
       background-color: #ccc;
       display: flex;
       height: 30px;
       align-items: center;
       justify-content: space-between;
       i{
         cursor: pointer;
         font-size: 20px;
       }
     }
   }

 }
</style>
