<template>
  <el-container>
    <el-header style="padding:0px">
      <navigation></navigation>
    </el-header>
    <el-main>
      <el-row style="margin: 0px 200px">
        <router-view></router-view>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import Navigation from './frame/Navigation'

export default {
  name: 'FrontHome',
  components: {
    Navigation
  }
}
</script>

<style lang="scss" scoped>

</style>
