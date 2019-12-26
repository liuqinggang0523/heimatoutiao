<template>
  <div class='cover-image'>
   <div v-for="(item,index) in list" :key="index" @click="openDialog" class='cover-image-item'>
     <img :src="item ? item : defaultImg" alt="">
   </div>
   <!-- 放置一个对话框 -->
   <el-dialog title="选择封面图片" :visible="dialogVisible" @close="closeDialog">
         <!-- 放置另外一个组件 素材库组件 和上传组件 -->
      <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
   </el-dialog>
 </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../src/assets/img/pic_bg.png'),
      dialogVisible: false // 控制弹窗是否关闭
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
    },
    closeDialog () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
    .cover-image {
     margin: 20px 80px;
     display: flex;
     .cover-image-item {
       border: 1px solid #ccc;
       width: 250px;
       height: 250px;
       padding: 20px;
       img {
         width: 100%;
         height: 100%;
       }
     }
   }
</style>
