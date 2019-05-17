<template>
  <div>
    <div style="text-align: left; margin: 0px 100px 10px 100px;">
      <el-button size="mini" type="primary" style="margin: 0px 0px 0px 5px;" @click="showPostDiglog">发帖</el-button>
    </div>
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
        <el-badge :value="1">
          <router-link :to="`/front/topic/post/${item}`" style="text-decoration: none;">
            <el-button size="small">帖子</el-button>
          </router-link>
        </el-badge>
      </div>
    </el-card>
    <el-dialog
      title="发帖"
      :visible.sync="postDialogVisable"
      width="60%"
      :before-close="postDialogHandleClose"
      center>
      <el-form ref="itemForm" :model="editItem" label-width="80px" style="margin: 5px 15px;">
        <el-form-item label="话题" style="display: inline-block; width: 55%">
          <el-select v-model="editItem.topicIds" placeholder="请选择" style="width: 100%" filterable clearable multiple default-first-option>
            <el-option v-for="item in []" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="editItem.content" type="textarea" :rows="10" clearable></el-input>
        </el-form-item>
        <div>
          <span style="margin-left: 40px; padding-bottom: 20px; display: inline-block; float: left;">配图</span>
          <el-upload
            name="img"
            :action="uploadURL.uploadImgUrl"
            list-type="picture-card"
            :on-remove="handleRemove"
            style="margin-left: 80px">
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="postDialogHandleClose" size="medium">取 消</el-button>
        <el-button type="primary" size="medium" @click="postHandle">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { constant } from '../../../const/constant.js'
import { cloneDeep } from 'lodash'

const emptyItem = {
  content: null,
  topicIds: [],
  imgPaths: null
}

export default {
  name: 'Topic',
  data () {
    return {
      editItem: cloneDeep(emptyItem),
      postDialogVisable: false,
      uploadURL: {
        uploadImgUrl: constant.baseApiUrl + '/file/img',
        ImgUrl: constant.baseApiUrl + '/file/img'
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
    },
    postDialogHandleClose () {
      this.postDialogVisable = false
    },
    showPostDiglog () {
      this.editItem = cloneDeep(emptyItem)
      this.postDialogVisable = true
    },
    postHandle () {
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
