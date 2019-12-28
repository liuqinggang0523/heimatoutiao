<template>
  <div class='cover-image'>
   <div v-for="(item,index) in list" :key="index" @click="openDialog(index)" class='cover-image-item'>
     <img :src="item ? item : defaultImg" alt="">
   </div>
   <!-- 放置一个对话框 -->
   <el-dialog :visible="dialogVisible" @close="closeDialog">
         <!-- 放置另外一个组件 素材库组件 和上传组件 -->
         <!-- 监听谁在谁的标签上写监听的方法 -->
      <select-img @selectImg="receiveImg"></select-img>
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
      dialogVisible: false, // 控制弹窗是否关闭
      selectId: -1 // 用来存储点击此图片的下标
    }
  },
  methods: {
    receiveImg (url) { // 接受图片 接受子组件传过来的参数url,此时的url只能读取不能修改，必须再传到上一级组件修改
      this.$emit('selectImg', url, this.selectId) // 此selectImg自定义方法非字组件里的自定义方法，只是重名而已
      this.dialogVisible = false
    },
    openDialog (index) {
      this.dialogVisible = true
      this.selectId = index // 记录当前点击的是哪张图片
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
