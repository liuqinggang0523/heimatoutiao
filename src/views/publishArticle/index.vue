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
        <quill-editor placeholder="请输入内容" v-model="formData.content" style="height:300px"></quill-editor>
      </el-form-item>
      <el-form-item label="选择封面:" prop="cover" style="margin-top:130px">  <!-- 封面默认0张 -1:自动 0:不上传 1:一张 3:三张-->
        <el-radio-group v-model="formData.cover.type" @change="changeType">
          <el-radio-button :label="1">单图</el-radio-button>
          <el-radio-button :label="3">三图</el-radio-button>
          <el-radio-button :label="0">无图</el-radio-button>
          <el-radio-button :label="-1">自动</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-row type="flex" class="cover-img">
        <cover-img :list="formData.cover.images"></cover-img>
        <!-- <el-upload
           style="margin-left:80px"
           class="upload-demo"
           drag
           action="https://jsonplaceholder.typicode.com/posts/"
           multiple
           v-for="(item,index) in formData.cover.images" :key="index">
           <i class="el-icon-upload"></i>
           <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
           <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload> -->
      </el-row>
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
        this.channels = res.data.channels
      })
    },
    publishArticle (draft) { // 发布文章
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) { // 此时判断是发布文章还是修改文章
          let { articleId } = this.$route.params // 获取动态路有参数
          this.$axios({ // 调用发布的接口
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft }, // 参数draft:true或 alse  是否存为草稿（true 为草稿）
            data: this.formData
          }).then(res => {
            this.$message({
              type: 'success',
              message: articleId ? '修改成功' : '发布成功'
            })
            this.$router.push('/home/articles')
          })
        }
      })
    },
    getArticleId (articleId) { // 通过id查询文章数据的方法
      this.$axios({
        url: `/articles/${articleId}`
      }).then(res => {
        this.formData = res.data // 将数据赋值给本身的formData
      })
    },
    changeType () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      }
    }
  },
  watch: {
    $route: function (to, from) { // 该方法在vue官网响应路由参数的变化里查看到
      if (to.params.articleId) {
        // 如果有to.params.articleId则表示修改
      } else {
        this.formData = { // 没有表示是发布，要清空输入框里内容，下拉菜单恢复默认值
          channel_id: null, // 文章频道默认不选
          tiele: '', // 文章标题
          content: '', // 文章内容
          cover: {
            type: 0, // 封面默认0张 -1:自动 0:不上传 1:一张 3:三张
            images: [] // 封面地址的数组
          }
        }
      }
    } // 监听封面类型的改变
    // 'formData.cover.type': function () { // 深度监听type值得变化
    //   if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
    //     this.formData.cover.images = []
    //   } else if (this.formData.cover.type === 1) {
    //     this.formData.cover.images = ['']
    //   } else if (this.formData.cover.type === 3) {
    //     this.formData.cover.images = ['', '', '']
    //   }
    // }
  },
  created () {
    this.getChannels() // 获取文章频道
    let { articleId } = this.$route.params // 获取动态路有参数
    articleId && this.getArticleId(articleId) // 如果id存在则执行这个查询数据的方法
  }
}
</script>

<style lang="less" scoped>
   .cover-img{
     display: flex;
     flex-wrap: wrap;
   }
</style>
