<template>
  <el-card>
    <bread-crumb slot="header">
       <template slot="title">用户管理</template>
    </bread-crumb>
    <el-form label-width="100px" style="padding-left:30px" :model="userInfo" :rules="rules" ref="myForm">
      <el-form-item label="用户名:" prop="name">
        <el-input style="width:50%" v-model="userInfo.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="简介:" prop="intro">
        <el-input style="width:50%" v-model="userInfo.intro" placeholder="请输入个人简介"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input style="width:50%" v-model="userInfo.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号:" prop="mobile">
        <el-input style="width:50%" v-model="userInfo.mobile" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveUserInfo">保存用户信息</el-button>
      </el-form-item>
    </el-form>
    <el-upload :http-request="uploadUserPhoto" :show-file-list="false">
      <img :src="userInfo.photo?userInfo.photo:defaultImg" alt="">
    </el-upload>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventbus.js' // 引入事件公交车
export default {
  data () {
    return {
      userInfo: {
        name: '',
        intro: '',
        email: '',
        mobile: '',
        photo: ''
      },
      rules: {
        name: [{ required: true, message: '请输入用户名' }, { min: 1, max: 8, message: '1-8个字符' }],
        email: [{ required: true, message: '请输入邮箱' }, { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确' }],
        intor: [{ min: 10, message: '10个字符以上' }]
      },
      defaultImg: require('../../assets/img/bg2.jpg')
    }
  },
  methods: {
    async saveUserInfo () { // 修改用户信息
      await this.$refs.myForm.validate()
      await this.$axios({
        url: '/user/profile',
        method: 'patch',
        data: this.userInfo
      })
      this.$message({
        type: 'success',
        message: '保存用户信息成功'
      })// 此时认为保存成功,通知header组件更新头像和用户名
      eventBus.$emit('updateUserInfo')
    },
    async getUserInfo () { // 获取用户资料信息
      let res = await this.$axios({
        url: '/user/profile'
      })
      this.userInfo = res.data
    },
    async uploadUserPhoto (params) { // 上传用户头像
      let data = new FormData()
      data.append('photo', params.file)
      let res = await this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      })
      this.userInfo.photo = res.data.photo
      this.$message({
        type: 'success',
        message: '用户头像上传成功'
      })
      eventBus.$emit('updateUserInfo')
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
   img{
     width: 150px;
     height: 150px;
     border-radius: 50%;
     position: absolute;
     right: 200px;
     top: 200px;
   }
</style>
