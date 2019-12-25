<template>
   <div class="nav">
     <div class="title">
       <img src="../../assets/img/logo_admin.png" alt="">
     </div>
     <!-- 左侧到黄组件，开启路由 -->
     <el-menu :router="true"
      :collapse-transition="false"
      :collapse="isOpen"
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="skyblue"
      style="border-right:none">
       <el-row class="openOrClose" type="flex" justify="center">
         <span @click="isClose">|||</span>
       </el-row>
        <el-menu-item index="/home">
          <i class="el-icon-s-home"></i>
          <span>首页</span>
        </el-menu-item>
        <el-submenu index='1'>
            <template slot="title">
              <i class="el-icon-document-copy"></i>
              <span>内容管理</span>
            </template>
           <el-menu-item index="/home/publish">发布文章</el-menu-item>
           <el-menu-item index="/home/articles">文章列表</el-menu-item>
           <el-menu-item index="/home/comment">评论管理</el-menu-item>
           <el-menu-item index="/home/material">素材管理</el-menu-item>
        </el-submenu>
        <el-submenu index='2'>
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span> 粉丝管理</span>
            </template>
           <el-menu-item index="picture">图文数据</el-menu-item>
           <el-menu-item index="fansInfo">粉丝概况</el-menu-item>
           <el-menu-item index="fanspicture">粉丝画像</el-menu-item>
           <el-menu-item index="fansList">粉丝列表</el-menu-item>
        </el-submenu>
        <el-menu-item index="userInfo">
           <i class="el-icon-setting"></i>
           <span>账户信息</span>
        </el-menu-item>
     </el-menu>

   </div>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    isClose () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang='less' scoped>
   .nav{
     height: 100vh;
     width: 220px;
     background-color:#353b4e;
     .title{
       text-align: center;
       background-color:  #353b4e;
       padding: 10px 0;
     }
     .openOrClose{
       color: #fff;
       height: 20px;
       cursor: pointer;
       letter-spacing:0.2em;
     }
   }
</style>
