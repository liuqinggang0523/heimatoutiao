<template>
  <el-card>
    <bread-crumb slot="header">
       <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form label-width="80px" style="padding-left:50px" :model="formData" :rules="publishRules" ref="publishForm">
      <el-form-item label="标题:" prop="title">
        <el-input placeholder="请输入文章标题" v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="内容:" prop="content">
        <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="formData.content"></el-input>
      </el-form-item>
      <el-form-item label="选择封面:" prop="cover">  <!-- 封面默认0张 -1:自动 0:不上传 1:一张 3:三张-->
        <el-radio-group v-model="formData.cover.type">
          <el-radio-button :label="1">单图</el-radio-button>
          <el-radio-button :label="3">三图</el-radio-button>
          <el-radio-button :label="0">无图</el-radio-button>
          <el-radio-button :label="-1">自动</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-upload
         style="margin-left:80px"
         class="upload-demo"
         drag
         action="https://jsonplaceholder.typicode.com/posts/"
         multiple>
         <i class="el-icon-upload"></i>
         <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
         <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-form-item label="频道:" style="margin-top:30px" prop="channel_id">
        <el-select placeholder="请选择" v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" plain @click="publishArticle()">发表</el-button>
      <el-button type="info" plain @click="publishArticle(true)">存入草稿</el-button>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        channel_id: null, // 文章频道默认不选
        tiele: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面默认0张 -1:自动 0:不上传 1:一张 3:三张
          images: [] // 封面地址的数组
        }
      },
      publishRules: { // 校验规则
        title: [{ required: true, message: '标题不能为空' }, { min: 5, max: 30, message: '必须5-30个字符' }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道必选' }]
      },
      channels: [] // 文章频道列表
    }
  },
  methods: {
    getChannels () { // 获取文章频道
      this.$axios({
        url: '/channels'
      }).then(res => {
        console.log(res)
        this.channels = res.data.channels
      })
    },
    publishArticle (draft) { // 发布文章
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          this.$axios({ // 调用发布的接口
            url: '/articles',
            method: 'post',
            params: { draft }, // 参数draft:true或 alse  是否存为草稿（true 为草稿）
            data: this.formData
          }).then(res => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '发布成功'
            })
            this.$router.push('/home/articles')
          })
        }
      })
    }
  },
  created () {
    this.getChannels() // 获取文章频道
  }
}
</script>

<style>

</style>
