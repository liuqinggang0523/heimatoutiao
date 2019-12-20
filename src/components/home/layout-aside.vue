<template>
   <div class="nav">
     <div class="title">
       <img src="../../assets/img/logo_admin.png" alt="">
     </div>
     <!-- 左侧到黄组件，开启路由 -->
     <el-menu :router="true" background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b" style="border-right:none">
        <el-menu-item index="/home">
          <i class="el-icon-s-home">首页</i>
        </el-menu-item>
        <el-submenu index='1'>
            <template slot="title">
              <i class="el-icon-document-copy">内容管理</i>
            </template>
           <el-menu-item index="/home/publish">发布文章</el-menu-item>
           <el-menu-item index="/home/articles">文章列表</el-menu-item>
           <el-menu-item index="/home/comment">评论管理</el-menu-item>
           <el-menu-item index="/home/material">素材管理</el-menu-item>
        </el-submenu>
        <el-submenu index='2'>
            <template slot="title">
              <i class="el-icon-s-custom"> 粉丝管理</i>
            </template>
           <el-menu-item index="picture">图文数据</el-menu-item>
           <el-menu-item index="fansInfo">粉丝概况</el-menu-item>
           <el-menu-item index="fanspicture">粉丝画像</el-menu-item>
           <el-menu-item index="fansList">粉丝列表</el-menu-item>
        </el-submenu>
        <el-menu-item index="userInfo">
           <i class="el-icon-setting">账户信息</i>
        </el-menu-item>
     </el-menu>

   </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
   .nav{
     height: 100vh;
     .title{
       text-align: center;
       background-color:  #323745;
       padding: 10px 0;
     }
   }
</style>
