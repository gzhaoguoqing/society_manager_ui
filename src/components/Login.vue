<template>
  <div>
    <el-dropdown v-if="$store.state.loginedUser !== null" placement="bottom-start" @command="dropdownHandle">
      <span class="el-dropdown-link">
        <i class="iconfont icon-yonghu3 navigationIconPosition"></i>{{$store.state.loginedUser.name}}
      </span>
      <el-dropdown-menu slot="dropdown" style="margin-left: 10px;">
        <el-dropdown-item command="per_info">个人信息</el-dropdown-item>
        <el-dropdown-item v-if="!isFront" command="goto_front">前台</el-dropdown-item>
        <el-dropdown-item v-else-if="$store.state.loginedUser !== null && $store.state.loginedUser.role.name !== '普通成员'" command="goto_back">后台</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div v-else style="padding-bottom: 14px">
      <el-button type="text" @click="loginVisible = true">登录</el-button>
    </div>
    <el-dialog
      title="登录"
      :visible.sync="loginVisible"
      width="35%"
      :before-close="loginHandleClose"
      center>
      <div align="center">
        <div style="margin: 30px 5px;">
          <i class="iconfont icon-yonghu3"></i>
          <el-input placeholder="请输入学号" v-model="loginUser.number" @keyup.enter.native="userLogin" clearable style="width: 70%;margin-left: 15px;"></el-input>
        </div>
        <div style="margin: 30px 5px 0px 5px;">
          <i class="iconfont icon-password"></i>
          <el-input placeholder="请输入密码" type="password" v-model="loginUser.password" @keyup.enter.native="userLogin" clearable  style="width: 70%;margin-left: 15px;"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="userLogin" :loading="logining">登陆</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { login, logout, getLoginedUser } from '../api/login.js'

export default {
  name: 'Login',
  props: [
    'isFront'
  ],
  data () {
    return {
      loginVisible: false,
      logining: false,
      loginUser: {
        number: '',
        password: ''
      },
      interval: null
    }
  },
  created () {
    this.interval = window.setInterval(this.validateLoginState, 3000)
    this.validateLoginState()
  },
  methods: {
    validateLoginState () {
      getLoginedUser().then(response => {
        if (response.data.code === 1) {
          this.$store.commit('logined', response.data.data)
        } else {
          this.$store.commit('logined', null)
          window.clearInterval(this.interval)
        }
      })
    },
    loginHandleClose () {
      this.loginVisible = false
    },
    userLogin () {
      this.logining = true
      login(this.loginUser).then(response => {
        if (response.data.code === 1) {
          this.$store.commit('logined', response.data.data)
          this.loginVisible = false
          this.interval = window.setInterval(this.validateLoginState, 3000)
        } else {
          this.$message.error('用户名或密码错误')
        }
      }).finally(() => {
        this.logining = false
      })
    },
    dropdownHandle (command) {
      if (command === 'per_info') {

      } else if (command === 'goto_front') {
        this.$router.push({ path: '/' })
      } else if (command === 'goto_back') {
        this.$router.push({ path: '/back' })
      } else if (command === 'logout') {
        logout().then(response => {
          this.$store.commit('logined', response.data.data)
          this.$router.push({ path: '/' })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.navigationIconPosition {
  margin-right: 8px;
}

.el-dropdown-link {
  cursor: pointer;
  color: rgb(246, 248, 250);
}

</style>
