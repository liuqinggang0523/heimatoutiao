<template>
    <el-row class="layout-header" type="flex" align="middle">
      <el-col :span='12' class="left"  type='flex' justify="center">
          <i class="el-icon-s-fold" style="font-size:20px">
            <span>江苏传智播客教育科技股份有限公司</span>
          </i>
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
          <!-- 利用三元表达式给图片一个默认地址,当获取不到用户的信息时就显示这个默认图片 -->
          <img :src="userInfo.photo?userInfo.photo:defaultImg" alt="">
          <el-dropdown @command="clickMenu">
              <span>{{userInfo.name}}</span>
              <i class="el-icon-caret-bottom"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command='userInfo'>个人信息</el-dropdown-item>
              <el-dropdown-item command='Git'>github</el-dropdown-item>
              <el-dropdown-item command='logOut'>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-row>
      </el-col>
    </el-row>
</template>

<script>
export default {
  data () {
    return {
      // 定义一个用户对象
      userInfo: {},
      // 将图片转换成一个变量
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  // 一进入页面就查询,利用生命周期的钩子函数去查询
  created () {
    // let token = localStorage.getItem('token') // 获取用户令牌
    this.$axios({
      url: '/user/profile'
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    }).then((res) => {
      this.userInfo = res.data
    })
  },
  methods: {
    clickMenu (command) {
      if (command === 'userInfo') {

      } else if (command === 'Git') {
        window.location.href = 'https://github.com/'
      } else {
        localStorage.removeItem('token')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .layout-header {
    height: 60px;
    .left{
      i{
        color: #606266;
        span {
          color: #606266;
          margin-left: 5px;
        }
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
