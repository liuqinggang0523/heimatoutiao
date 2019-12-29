<template>
<!--外部容器 -->
  <el-container>
    <!-- 侧边导航栏 -->
    <el-aside style="background-color:#353b4e;transition:all 0.5s" :style="{width:isCollapse?'60px':'230px'}">
      <layout-aside :collapse='isCollapse'></layout-aside>
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
import eventBus from '../../utils/eventbus.js'

export default {
  data () {
    return {
      isCollapse: false
    }
  },
  created () {
    eventBus.$on('changeCollapse', () => {
      this.isCollapse = !this.isCollapse
    })
  }
}
</script>

<style>

</style>
