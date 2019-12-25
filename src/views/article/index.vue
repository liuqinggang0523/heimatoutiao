<template>
  <el-card>
    <bread-crumb slot="header">
       <template slot="title">文章列表</template>
    </bread-crumb>
    <el-form class="form">
      <el-radio-group  v-model="articleSearch.status" @change="changeStatus">
           <el-form-item label="文章状态:" class="status">
             <el-radio-button :label="5">全部</el-radio-button>
             <el-radio-button :label="0">草稿</el-radio-button>
             <el-radio-button :label="1">待审核</el-radio-button>
             <el-radio-button :label="2">审核通过</el-radio-button>
             <el-radio-button :label="3">审核失败</el-radio-button>
           </el-form-item>
      </el-radio-group>
      <el-form-item label="频道列表:">
          <el-select v-model="articleSearch.channels_id" @change="changeStatus" placeholder="请输入频道">
              <el-option
                v-for="item in channels"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="时间选择:">
        <el-date-picker
        @change="changeStatus"
        value-format="yyyy-MM-dd"
        v-model="articleSearch.date"
         type="daterange"
         range-separator="至"
         start-placeholder="开始日期"
         end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <span style="color:#606266;font-size:14px">共找到{{total_count}}条符合条件的内容</span>
    </el-form>
    <el-row class="box" type="flex" align="middle" v-for="item in articleList" :key="item.id.toString()">
      <div class="left">
        <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt="">
        <div class="info">
          <span>{{item.title}}</span>
          <el-tag class="statu" :type="item.status | filterType">{{item.status | filterStatus }}</el-tag>
          <span>{{item.pubdate}}</span>
        </div>
      </div>
      <div class="right">
        <el-button type="warning" icon="el-icon-edit" size="mini">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="delArticle(item.id)">删除</el-button>
      </div>
    </el-row>
    <el-row type="flex" align="middle" justify="center" style="height:60px">
      <el-pagination background
      layout="prev,pager,next"
      :total="page.total"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      @current-change="changePage"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      articleSearch: {
        status: 5,
        channels_id: null, // 默认不选中任何
        date: '' // 日期范围
      },
      total_count: '',
      articleList: [], // 文章列表
      channels: [], // 频道列表
      defaultImg: require('../../assets/img/bgc.png'), // 频道数据
      page: { // 分页数据
        currentPage: 1, // 当前页数，默认为第一页
        pageSize: 10, // 每页文章数
        total: 1000 // 文章总数
      }
    }
  },
  filters: {
    filterStatus (value) { // 过滤器
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) { // 过滤器
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    delArticle (id) { // 删除文章
      this.$confirm('确定要删除该文章吗').then(() => {
        this.$axios({
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getConditionArticle()
        })
      })
    },
    changeStatus () { // 搜索文章
      this.page.currentPage = 1
      this.getConditionArticle()
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getConditionArticle()
    },
    getConditionArticle () {
      let params = { // 5是自己定义的,如果为5传全部
        page: this.page.currentPage, // 当前页码
        per_page: this.page.pageSize, // 每页条数
        status: this.articleSearch.status === 5 ? null : this.articleSearch.status,
        channel_id: this.articleSearch.channels_id,
        begin_pubdate: this.articleSearch.date.length ? this.articleSearch.date[0] : null, // 开始时间
        end_pubdate: this.articleSearch.date.length > 1 ? this.articleSearch.date[1] : null // 截止时间
      }
      this.getArticle(params)
    },
    getArticle (params) { // 获取文章信息
      this.$axios({
        params,
        url: '/articles'
      }).then(res => {
        this.page.total = res.data.total_count
        this.total_count = res.data.total_count
        this.articleList = res.data.results
      })
    },
    getChannels () { // 获取文章频道
      this.$axios({
        url: '/channels'
      }).then(res => {
        // console.log(res)
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getArticle({ page: 1, per_page: 10 }) // 获取文章列表
    this.getChannels() // 获取文章状态
  }
}
</script>

<style lang="less" scoped>
  .form{
    padding-left :50px;
    .status{
      display: flex;
    }
  }
  .box{
    display: flex;
    justify-content: space-between;
    padding-left:50px;
    height: 200px;
    border-bottom: 1px dashed #ccc;
    .left{
      display: flex;
      img{
        width: 150px;
        height: 150px;
        border-radius: 5px;
        margin-right: 10px;
      }
      .info{
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-around;
        .statu{
          width: 60px;
        }
      }
    }
  }
</style>
