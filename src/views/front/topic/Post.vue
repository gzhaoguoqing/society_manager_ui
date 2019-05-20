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
    <el-card v-for="item in itemlist" :key="item.data.id" class="card">
      <div slot="header" class="card-header">
        <span>{{item.data.author.name}}</span>
      </div>
      <div>
        <div>
          <span v-for="topic in item.data.topics" :key="topic.id">
            <span style="color: blue">#</span>
            <router-link :to="`/front/topic/post/${topic.id}`" style="text-decoration: none;"><span style="color: red">{{topic.labels}}</span></router-link>
            <span style="color: blue">#</span>
          </span>
          {{item.data.content}}
        </div>
        <div style="width: 400px">
          <img v-for="imgPath in item.data.imgPaths" :key="imgPath" :src="`${imgUrl}?path=${encodeURIComponent(imgPath)}`" width="100px" height="100px" class="img">
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
        <div style="margin: 15px 0px 0px 10px" v-if="item.showInput && showComment">
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
import { fetchPosts } from '../../../api/post.js'
import { constant } from '../../../const/constant.js'
import { cloneDeep } from 'lodash'

let emptyItem = {
  data: null,
  showInput: false,
  newComment: null
}

export default {
  name: 'Topic',
  data () {
    return {
      qry: {
        page: 1,
        size: 10,
        topicId: null
      },
      showComment: false,
      itemlist: [],
      total: 0,
      imgUrl: constant.baseApiUrl + '/file/img'
    }
  },
  created () {
    this.qry.topicId = this.$route.params['id']
    this.getList()
  },
  methods: {
    getList () {
      fetchPosts(this.qry).then(response => {
        response.data.data.forEach(element => {
          let item = cloneDeep(emptyItem)
          item.data = element
          this.itemlist.push(item)
        })
        this.total = response.data.total
      })
    }
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
