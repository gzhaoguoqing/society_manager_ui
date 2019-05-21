<template>
  <el-container
    v-show="this.$store.state.loginedUser !== null
          && (this.$store.state.loginedUser.role.name === '管理员'
          || this.$store.state.loginedUser.role.name === '社团负责人')">
    <el-header style="padding:0px">
      <navigation></navigation>
    </el-header>
    <el-main>
      <el-row style="margin: 0px 100px">
        <router-view></router-view>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import Navigation from './frame/Navigation'

export default {
  name: 'BackHome',
  components: {
    Navigation
  },
  data () {
    return {
      roleName: null
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
