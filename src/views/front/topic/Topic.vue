<template>
  <div>
    <el-card class="card" v-for="item in 10" :key="item">
      <div slot="header" class="card-header">
        <span>admin</span>
      </div>
      <div>
        <div>
          <div>
            据说上院宿舍又停水了，上院宿舍经常性停水，已经成为新常态，不知道各位童鞋有什么看法，发表一下吧。
          </div>
          <div style="margin: 10px 0px">
            本次话题：
            <span style="color: blue">#</span>
            <router-link :to="`/front/topic/post/${item}`" style="text-decoration: none;"><span style="color: red">宿舍停水</span></router-link>
            <span style="color: blue">#</span>
          </div>
        </div>
      </div>
      <div>
        <hr style="height:1px; border:none; border-top:1px solid #eee; margin: 20px 0px 15px 0px">
        <el-button size="small">发帖</el-button>
        <el-badge :value="1">
          <router-link :to="`/front/topic/post/${item}`" style="text-decoration: none;">
            <el-button size="small" style="margin-left: 20px">帖子</el-button>
          </router-link>
        </el-badge>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Topic'
}
</script>

<style lang="scss" scoped>
.card {
  margin: 8px 100px;
}

.card-header {
  height: 5px;
}

.img {
  margin: 3px 3px;
}
</style>
