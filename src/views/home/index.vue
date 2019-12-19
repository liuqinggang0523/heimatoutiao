<template>
<!--外部容器 -->
  <el-container>
    <!-- 侧边导航栏 -->
    <el-aside style="background-color:#353b4e;width:220px">
      <aside-nav></aside-nav>
    </el-aside>
    <!-- 一级容器 -->
      <el-container>
        <!-- 头部区域 -->
        <el-header>头部区域</el-header>
        <el-main>内容部分</el-main>
      </el-container>
  </el-container>
</template>

<script>
import aside from '../../components/aside/index'
export default {
  components:
    { 'aside-nav': aside }

}
</script>

<style>

</style>
