<template>
  <el-row class="navigationBgColor">
    <el-col :span="6">
      <div style="color: #545c64">a</div>
    </el-col>
    <el-col :span="15">
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo navigationCenter"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-bottom-width:0px"
        router>
        <el-menu-item index="/back/staff" class="navigationItemWidth">
          <i class="iconfont icon-chengyuan2 navigationIconPosition"></i>成员管理
        </el-menu-item>
        <el-menu-item index="/back/info" class="navigationItemWidth">
          <i class="iconfont icon-xinxi2 navigationIconPosition"></i>信息管理
        </el-menu-item>
        <el-menu-item index="/back/news" class="navigationItemWidth">
          <i class="iconfont  icon-xinwen navigationIconPosition"></i>新闻管理
        </el-menu-item>
        <el-menu-item index="/back/notice" class="navigationItemWidth">
          <i class="iconfont icon-bulletin navigationIconPosition"></i>公告管理
        </el-menu-item>
        <el-menu-item index="/back/activity" class="navigationItemWidth">
          <i class="iconfont icon-shouye navigationIconPosition"></i>活动管理
        </el-menu-item>
        <el-menu-item index="/back/topic" class="navigationItemWidth">
          <i class="iconfont icon-huati2 navigationIconPosition"></i>话题管理
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="3" class="userInfo">
      <login></login>
    </el-col>
  </el-row>
</template>

<script>
import Login from '../../../components/Login'

export default {
  name: 'Navigation',
  components: {
    Login
  },
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.navigationItemWidth {
  width: 130px;
  text-align: center;
}

.navigationIconPosition {
  margin-right: 8px;
}

.navigationBgColor {
  background-color:  #545c64;
}

.el-dropdown-link {
  cursor: pointer;
  color: rgb(246, 248, 250);
}

.el-icon-arrow-down {
  font-size: 14px;
}

.userInfo {
  text-align: center;
  margin-top: 16px;
}
</style>
