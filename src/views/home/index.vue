<template>
<!--外部容器 -->
  <el-container>
    <!-- 侧边导航栏 -->
    <el-aside style="width:220px">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 一级容器 -->
      <el-container>
        <!-- 头部区域 -->
        <el-header>
          <layout-header></layout-header>
        </el-header>
        <el-main>
          <!-- 二级路由容器 -->
          <router-view></router-view>
        </el-main>
      </el-container>
  </el-container>
</template>

<script>

export default {

}
</script>

<style>

</style>
