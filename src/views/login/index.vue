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
              <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button class="block" type="success">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button class="danger-btn block" type="danger" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
    </div>
  </div>
</template>

<script>
import { validateUser, validatepass } from '../../utils/validate'

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
        { text: '登录', current: true }, // current控制登录注册按钮切换
        { text: '注册', current: false }
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
      }
    }
  },
  methods: {
    toggleMenu (data) {
      // 控制注册登录按钮切换时的按钮背景
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
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
