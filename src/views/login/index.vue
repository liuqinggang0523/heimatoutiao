<template>
  <div class="login">
    <el-card class="card">
      <div class="title"><img src="../../assets/img/logo_index.png" alt=""></div>
      <!--el-form中的model属性绑定表单数据对象，el-form还需绑定rules规则-->
      <el-form :model="formdata" :rules="rules" ref="myForm">
        <!-- form-item  prop属性 绑定 下面表单组件的 字段名 -->
        <el-form-item prop="mobile">
          <el-input prefix-icon="el-icon-user" v-model="formdata.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input prefix-icon="el-icon-phone" v-model="formdata.code" placeholder="请输入验证码" class="code" style="width:65%"></el-input>
          <el-button type="info" style="float:right">获取验证码</el-button>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="formdata.agree">我同意该条款以及个人隐私政策</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callback) {
      value ? callback() : callback(new Error('必须同意才能登录'))
    }
    return {
      formdata: {
        mobile: '',
        code: '',
        agree: false
      }, // pattern 正则表达式
      rules: { // required如果为true,就表示该字段必填...message:当不满足规定时显示提示信息
        mobile: [{ required: true, message: '请输入手机号' }, { pattern: /^1[3456789]\d{9}$/, message: '手机格式不正确' }],
        code: [{ required: true, message: '请输入验证码' }, { pattern: /^\d{6}$/, message: '验证码格式不正确' }],
        agree: [{ validator }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.myForm.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: '/authorizations', // 请求地址,请求类型默认为get
            method: 'post', // 请求类型
            data: this.formdata
          }).then(res => {
            // 如果登陆成功,会返回给我们令牌token,然后把令牌存储到本地
            localStorage.setItem('token', res.data.token)
            // 跳转到主页
            this.$router.push('/home')
            // console.log(res)
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
   .login{
      background: url('../../assets/img/bgc.png');
      height: 100vh;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
      .card{
        width: 420px;
        height: 350px;
        .title{
          text-align: center;
          margin-bottom: 20px;
          img {
            height: 40px;
          }
        }
      }
}
</style>
