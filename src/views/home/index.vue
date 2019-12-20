<template>
<!--外部容器 -->
  <el-container>
    <!-- 侧边导航栏 -->
    <el-aside style="background-color:#353b4e;width:220px">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 一级容器 -->
      <el-container>
        <!-- 头部区域 -->
        <el-header>
          <layout-header></layout-header>
        </el-header>
        <el-main>内容部分</el-main>
      </el-container>
  </el-container>
</template>

<script>

export default {

}
</script>

<style>

</style>
