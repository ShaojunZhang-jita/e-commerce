

<template>
  <div class="login_container">
    <div class="login_box">
      <div class="logo">
        <img src="../assets/logo.png"
             alt="">
      </div>
      <el-form label-width="0"
               class="form"
               :model="loginform"
               :rules="loginFormRules"
               ref="loginFormRef">
        <el-form-item prop='username'>
          <el-input placeholder="请输入用户名"
                    prefix-icon="iconfont icon-user"
                    v-model="loginform.username"></el-input>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input type='password'
                    placeholder="请输入密码"
                    prefix-icon="iconfont icon-3702mima"
                    v-model="loginform.password"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary"
                     @click='login()'>登录</el-button>
          <el-button type="info"
                     @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginform: {
        username: 'admin', password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm () {
      //  在表单中，ref就是一个引用表单对象。所以我们可以通过this.$refs.引用对象来调用的 以下为重置方法
      this.$refs.loginFormRef.resetFields();
    },
    login () {
      // jjie'kou接口
      // 判断是否验证成功  
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginform)
        if (res.meta.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功')
        // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
        //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中  token是从服务器得来的
        window.sessionStorage.setItem('token', res.data.token)
        // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    }

  }
}
</script>
<style >
@import "../assets/css/login/login.css";
</style>>


