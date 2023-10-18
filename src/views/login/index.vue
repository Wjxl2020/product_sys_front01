<template>
  <div class="Demo">
      <div class="Before" :class="isTop  ? 'contain-Before' : ''">
          <div class="login-container">
              <el-form ref="form"  :model="login" label-width="120px" >
                <h3 class="login-title">账号登录</h3>
                <el-form-item label="用户名"  prop="code">
                  <el-input v-model="login.username"></el-input>
                </el-form-item>
                <el-form-item label="密码"  prop="name">
                  <el-input v-model="login.password" type="password" show-password auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" plain @click="loginform">登录</el-button>
                  <el-link class="register_link" type="success" @click="handleBefore">忘记密码<i class="el-icon-view el-icon--right"></i></el-link>
                </el-form-item>
              </el-form>
          </div>
      </div>

      <div class="After" :class="isTop  ? 'contain-After' : ''">
          <div class="login-container">
              <el-form ref="form"  :model="mail" label-width="120px" >
                <h3 class="login-title">邮箱登录</h3>
                <el-form-item label="邮箱"  prop="code">
                  <el-input v-model="mail.to"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="name">
                  <el-row :gutter="13">
                      <el-col :span="8">
                          <el-input v-model="mail.content" type="password" show-password auto-complete="off" :inline="true"></el-input>
                      </el-col>
                      <el-col :span="5">
                          <el-button type="primary" plain @click="getToken">获取验证码</el-button>
                      </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" plain @click="loginMail">登录</el-button>
                  <el-link class="register_link" type="warning" @click="handleAfter" icon="el-icon-edit">账号登录</el-link>
                </el-form-item>
              </el-form>
          </div>
      </div>
  </div>
  </template>
  
  <script>
  import { mapMutations} from 'vuex'
  export default {
    name: 'Login',
    data() {
      return {
        login: {
          username: '',
          password: ''
        },
        mail: {
          to: '',
          content: '',
          take: ''
        },
        isTop:false
      }
    },
    created() {
    },
    methods: {
      ...mapMutations(['setToken']),
      loginform() {
        this.axios.post('/ums-user/token',response => {
          // 登录成功后 转到一个成功页面
          if(response.code == 200) {
            this.axios.setToken(response.obj)
            this.setToken(response.obj)
            this.$router.push({
              path: '/'
            })
          }
        },this.login)
      },
      loginMail(){
        if(this.mail.content == this.mail.take){
          this.axios.post('/ums-user/mail',response => {
          // 登录成功后 转到一个成功页面
          if(response.code == 200) {
            this.axios.setToken(response.obj)
            this.setToken(response.obj)
            this.$router.push({
              path: '/'
            })
          }
        },this.mail)
        }
      },
      getToken(){
        this.axios.post('/mail/send',response => {
          // 登录成功后 转到一个成功页面
          if(response.code == 200) {
            this.mail.take = response.obj
          }
        },this.mail)
      },
      handleBefore(){
        if(!this.isTop){
                this.isTop = true
            }
      },
      handleAfter(){
        if(this.isTop){
            this.isTop = false
        }
      }
    }
  }
  </script>
  <style scoped >
    .login-container{
      border-radius: 10px;
      margin: 180px auto;
      background-clip: padding-box;
      width: 500px;
      border: 1px solid #A9A9A9;
      padding: 35px 35px 15px 35px;
      box-shadow: 0 0 25px #8fbcd0 ;
    }
  
    .login-title{
      margin:  0 auto 20px 100px;
    }

    /*3D翻转*/
    .Demo{
      margin-left: 350px;
      position: relative;
      perspective: 800px;
      box-sizing: border-box;          
    }
    .Before{
        position: absolute;
        top:0;
        left: 0;
        background-repeat: no-repeat;
        background-position: center center;
        backface-visibility: hidden;
        transition: 1.5s;
    }
    .After{
        position: absolute;
        top:0;
        left: 0;
        transform: rotateY(-180deg);
        backface-visibility: hidden;
        transition: 1.5s;
    }
    .Demo .contain-Before{
        transform: rotateY(180deg);
    }
    .Demo .contain-After{
        transform: rotateY(0deg);
    }

    /*超链接*/
    .register_link {
      position: absolute;
      right: 0%;
      
  }
  
  </style>
  