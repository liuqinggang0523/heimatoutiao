<template>
  <el-card>
    <bread-crumb slot="header">
       <template slot="title">
         评论管理
       </template>
    </bread-crumb>
    <!-- 表格 -->
    <!-- stripe="true" highlight-current-row="true" border="true" -->
    <el-table :data="commentList" stripe="true" highlight-current-row="true" border="true">
        <el-table-column label="标题" width="500" prop="title"></el-table-column>
        <el-table-column label="评论状态" :formatter="formatterBoolean" prop="comment_status"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="操作" width="200">
          <!-- 作用域插槽 -->
          <template slot-scope="obj">
             <el-button size="mini" type="info">修改</el-button>
             <!-- 需要根据当前状态来判断评论是否关闭 -->
             <el-button size="mini" type="danger" @click="openOrcloseComment(obj.row)">{{obj.row.comment_status?"关闭":"打开"}}评论</el-button>
           </template>
        </el-table-column>
  </el-table>
    <!-- 分页 -->
    <div class="page">
      <el-pagination  background  layout="prev, pager, next"  :total="1000" ></el-pagination>
    </div>
  </el-card>

</template>

<script>
export default {
  data () {
    return {
      commentList: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(res => {
        console.log(res)
        this.commentList = res.data.results
      })
    },
    //  定义一个格式化数据的函数
    formatterBoolean (row, column, cellVaule, index) {
      // row当前行数据  column当前列信息 cellValue当前单元格的值 index索引
      return cellVaule ? '正常' : '关闭'
    },
    // 打开或者关闭评论函数方法
    openOrcloseComment (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`确定要${mess}评论吗, 是否继续?`, '提示', {
      }).then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: { article_id: 'row.id' }, // 文章id
          data: { allow_comment: !row.comment_status }
        }).then(res => {
          this.getComment() // 修改完评论状态后重新渲染页面
        })
      })
    }
  },
  // 渲染页面
  created () {
    this.getComment()
  }
}
</script>

<style>
  .page{
    display: flex;
    justify-content: center
  }
</style>
