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
        <el-header>
          <heima-header></heima-header>
        </el-header>
        <el-main>内容部分</el-main>
      </el-container>
  </el-container>
</template>

<script>
import aside from '../../components/aside/index'
import header from '../../components/header/index'
export default {
  components:
    { 'aside-nav': aside,
      'heima-header': header
    }
}
</script>

<style>

</style>
