<template>
  <div class="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class="{'current': tab.current}" v-for="(tab, index) in menuTab" :key="index" @click="toggleMenu(tab)">{{ tab.text }}</li>
      </ul>
      <!-- 登录表单 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form demo-ruleForm" size="small">
        <el-form-item prop="username" class="item-form">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-form" v-if="isShow">
          <label>重复密码</label>
          <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button class="block" type="success" :disabled="message.status" @click="getMessage()">{{ message.text }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            class="danger-btn block"
            type="danger"
            :disabled="canLogin"
            @click="submitForm('ruleForm')"
          >
            {{ isShow ? '注册' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
    </div>
  </div>
</template>

<script>
import sha1 from 'js-sha1'
import { validateUser, validatepass } from '../../utils/validate'
import { getSms, register } from '@/api/login'

export default {
  name: 'Login',
  data () {
    // 验证用户名邮箱
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (validateUser(value)) {
        callback(new Error('用户名格式有误'))
      } else {
        callback()
      }
    }
    // 验证密码
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (validatepass(value)) {
        callback(new Error('密码为6~20位的字母、下划线、数字组成!'))
      } else {
        callback()
      }
    }
    // 验证重复密码
    var validatePasswords = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error('两次输入的密码不同！'))
      } else {
        callback()
      }
    }
    // 验证码
    var checkcode = (rule, value, callback) => {
      const reg2 = /^[a-z0-9]{6}$/
      if (value === '') {
        return callback(new Error('验证码不能为空'))
      } else if (!reg2.test(value)) {
        return callback(new Error('验证码错误！'))
      } else {
        callback()
      }
    }
    return {
      menuTab: [
        { text: '登录', current: true, type: 'login' }, // current控制登录注册按钮切换
        { text: '注册', current: false, type: 'register' }
      ],
      isShow: false, // 注册中的重复密码框显示与否
      ruleForm: {
        username: '',
        password: '',
        passwords: '',
        code: ''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        passwords: [
          { validator: validatePasswords, trigger: 'blur' }
        ],
        code: [
          { validator: checkcode, trigger: 'blur' }
        ]
      },
      // 控制发送验证码按钮是否能点击和显示文字
      message: {
        status: false,
        text: '获取验证码'
      },
      // 控制登录按钮是否可以点击
      canLogin: false,
      // 定义一个定时器对象
      timer: null
    }
  },
  methods: {
    // 控制注册登录按钮切换时的按钮背景
    toggleMenu (data) {
      this.menuTab.forEach(el => {
        el.current = false
      })
      data.current = true
      // 控制登录注册按钮切换时重复密码框的显示
      if (data.text === '登录') {
        this.isShow = false
      } else {
        this.isShow = true
      }
      this.$refs.ruleForm.resetFields()
      // 切换时重置验证码按钮
      this.message.status = false
      this.message.text = '获取验证码'
      clearInterval(this.timer)
    },
    // 获取验证码
    getMessage () {
      // 在获取验证码之前先验证邮箱是否为空（前端验证）
      if (this.ruleForm.username === '') {
        this.$message.error('邮箱不能为空！')
        return false
      }
      // 发送验证码请求
      const data = {
        username: this.ruleForm.username,
        module: this.isShow ? 'register' : 'login'
      }
      this.message.status = true
      this.message.text = '发送中'
      getSms(data).then(response => {
        // 返回验证码 提示成功
        this.$message({
          message: '验证码已发送',
          type: 'success'
        })
        // 发送成功 启用登录/注册按钮
        this.canLogin = false

        // 启用倒计时
        // **********注意Vue中方法调用方法 子方法里的this指向methods对象
        let number = 60
        // 定时器启动之前先判断一下是否还有定时器未关闭
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          number--
          if (number === 0) {
            clearInterval(this.timer)
            this.message.status = false
            this.message.text = '再次获取'
          } else {
            this.message.text = `倒计时${number}秒`
          }
        }, 1000)
      }).catch(error => {
        console.log(error)
      })
    },
    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        // 验证通过
        if (valid) {
          // 判断是注册界面还是登录页面 分别调用不同的接口
          this.isShow ? this.Register() : this.Login()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 注册
    Register () {
      const requestData = {
        username: this.ruleForm.username,
        password: sha1(this.ruleForm.password), // sha1加密方式加密
        code: this.ruleForm.code,
        module: 'register'
      }
      // 调用注册接口
      register(requestData).then(response => {
        const data = response.data
        this.$message({
          message: data.message,
          type: 'success'
        })
        // 注册成功之后自动跳转登录页面 重置验证码并清除计时器
        this.toggleMenu(this.menuTab[0])
        this.message.status = false
        this.message.text = '获取验证码'
        clearInterval(this.timer)
      }).catch(error => {
        console.log(error)
      })
    },
    // 登录
    Login () {
      const requestData = {
        username: this.ruleForm.username,
        password: sha1(this.ruleForm.password),
        code: this.ruleForm.code
      }
      // 通过store的action进行异步处理接口
      this.$store.dispatch('Login', requestData)
    }
  }
}
</script>

<style scoped lang="less">
.login{
  background-color: #344a5f;
  height: 100vh;
  /deep/.login-wrap{
    width: 330px;
    height: auto;
    margin: 0px auto;
    .menu-tab{
      text-align: center;
      li{
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
      }
      // 选中时按钮的颜色
      .current{
        background-color: rgba(0, 0, 0, .1);
      }
    }
    .login-form{
      margin-top: 29px;
      label{
        display: block;
        font-size: 14px;
        color: #fff;
        margin-bottom: 3px;
      }
      .item-form{
        margin-bottom: 13px;
      }
      .danger-btn{
        margin-top: 19px;
      }
      .block{
        width: 100%;
      }
    }
  }
}
</style>
