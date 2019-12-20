<template>
   <div class="nav">
     <div class="title">
       <img src="../../assets/img/logo_admin.png" alt="">
     </div>
     <el-menu background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b" style="border-right:none">
        <el-menu-item>首页</el-menu-item>
        <el-submenu index='1'>
           <template slot="title">内容管理</template>
           <el-menu-item>1</el-menu-item>
           <el-menu-item>2</el-menu-item>
           <el-menu-item>3</el-menu-item>
           <el-menu-item>4</el-menu-item>
        </el-submenu>
        <el-submenu index='2'>
           <template slot="title">粉丝管理</template>
           <el-menu-item>1</el-menu-item>
           <el-menu-item>2</el-menu-item>
           <el-menu-item>3</el-menu-item>
           <el-menu-item>4</el-menu-item>
        </el-submenu>
        <el-menu-item>个人中心</el-menu-item>
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
