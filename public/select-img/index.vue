<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="图片素材" name="material">
      <div class="coverImg">
        <el-card class="img" v-for="(item,index) in list" :key="index">
          <img :src="item.url" alt="" @click="changeImg(item.url)">
        </el-card>
        <el-row type="flex" justify="center" align="middle" style="height:60px;margin-top:15px">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :page-size="page.pageSize"
            :current-page="page.currentPage"
            @current-change="changePage">
          </el-pagination>
        </el-row>
      </div>
    </el-tab-pane>
    <el-tab-pane label="上传图片">
      <el-upload  class="dialogImg" :http-request="uploadImg" :show-file-list="false">
         <i class="el-icon-plus"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [], // 获取用户图片素材的列表
      page: {
        total: 100,
        currentPage: 1,
        pageSize: 8
      }
    }
  },
  methods: {
    changeImg (url) { // 点击图片时把图片传给显示的封面,此时涉及到子传父 自定义事件
      this.$emit('selectImg', url)
    },
    getCoverImg () { // 获取用户图片素材
      this.$axios({
        url: '/user/images',
        params: { collect: false, page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    changePage (newPage) { // 分页切换功能
      this.page.currentPage = newPage
      this.getCoverImg()
    },
    uploadImg (params) { // 点击上传图片
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(res => {
        this.$emit('selectImg', res.data.url)
      })
    }
  },
  created () {
    this.getCoverImg()
  }
}
</script>

<style lang="less" scoped>
 .coverImg{
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   .img{
     width: 150px;
     height: 130px;
     margin-top: 15px;
     img{
       width: 100%;
       height: 100%;
     }
   }
 }
   .dialogImg{
     display: flex;
     justify-content: center;
     align-items: center;
     i{
       font-size: 50px;
       padding: 50px;
       border: 1px dashed #ccc;
     }
   }
</style>
