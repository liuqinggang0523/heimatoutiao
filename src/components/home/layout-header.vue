<template>
    <el-row class="layout-header" type="flex" align="middle">
      <el-col :span='12' class="left"  type='flex' justify="center">
          <i class="el-icon-s-fold" style="font-size:24px"></i>
          <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span='12' class="right">
        <el-row type='flex' justify="end" align="middle">
          <!-- 输入框 -->
          <el-input
            style="width:150px;margin-right:15px;margin-top:8px"
            size="mini"
            placeholder="请输入内容"
            prefix-icon="el-icon-search">
          </el-input>
          <i class="el-icon-message-solid"></i>
          <span>消息</span>
          <img src="../../assets/img/avatar.jpg" alt="">
          <el-dropdown>
              <span>追梦人</span>
              <i class="el-icon-caret-bottom"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>github</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-row>
      </el-col>
    </el-row>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
  .layout-header {
    height: 60px;
    .left{
      i{
        color: #606266;
      }
      span {
        color: #606266;
        margin-left: 5px;
      }
    }
    .right {
      i{
        color: #606266;
      }
      span {
        color: #606266;
      }
       img {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        margin: 0 15px 0 15px;

      }
    }
  }
</style>
