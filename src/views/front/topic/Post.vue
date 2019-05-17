<template>
  <div>
    <div style="text-align: right; margin: 0px 100px 10px 100px;">
      显示评论
      <el-switch
        v-model="showComment"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
    </div>
    <el-card v-for="item in itemlist" :key="item" class="card">
      <div slot="header" class="card-header">
        <span>弓志成</span>
      </div>
      <div>
        <div>
          <span style="color: blue">#</span>
          <router-link :to="`/front/topic/post/${2}`" style="text-decoration: none;"><span style="color: red">宿舍停水</span></router-link>
          <span style="color: blue">#</span>
          宿舍又又又双双双叒叒叒叕叕叕停水了，我还没洗漱呢，怎么办？怎么办？快点来水吧。学校，求你了，不要再停水了。
        </div>
        <div style="width: 400px">
          <img src="../../../assets/img/tingshui1.jpg" width="100px" height="100px" class="img">
          <img src="../../../assets/img/tingshui2.jpg" width="100px" height="100px" class="img">
          <img src="../../../assets/img/tingshui3.jpg" width="100px" height="100px" class="img">
          <img src="../../../assets/img/tingshui4.jpg" width="100px" height="100px" class="img">
        </div>
        <div style="margin: 10px 20px 0px 0px; text-align: right;">
          <el-badge :value="1">
            <el-button size="mini">
              <i class="iconfont icon_likegood icon-icon_likegood"></i>
            </el-button>
          </el-badge>
          <el-badge :value="1">
            <el-button size="mini" style="margin-left: 20px" @click="item.showInput = !item.showInput;showComment = true">
              <i class="iconfont icon_message icon-icon_message"></i>
            </el-button>
          </el-badge>
        </div>
      </div>
      <hr style="height:1px; border:none; border-top:1px solid #eee; margin: 10px 0px 15px 0px">
      <div>
        <div style="margin: 15px 0px 0px 10px" v-if="showComment">
          <div v-for="item in 5" :key="item" style="margin: 5px 0px">qwer：哈哈</div>
        </div>
        <div style="margin: 15px 0px 0px 10px" v-if="item.showInput">
          <el-input type="textarea" placeholder="请输入评论内容" v-model="item.newComment" size="mini" autosize clearable style="width: 90%"></el-input>
          <el-button size="mini" style="padding: 5px 12px; margin-left: 6px;">
            <i class="iconfont icon-fasong"></i>
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Topic',
  data () {
    return {
      showComment: false,
      itemlist: [
        {
          data: {},
          showInput: false,
          newComment: ''
        },
        {
          data: {},
          showInput: false,
          newComment: ''
        },
        {
          data: {},
          showInput: false,
          newComment: ''
        }
      ]
    }
  },
  created () {
  },
  methods: {
  }
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
