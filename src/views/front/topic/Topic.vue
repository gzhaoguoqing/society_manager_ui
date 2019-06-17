<template>
  <div>
    <div style="text-align: left; margin: 0px 100px 10px 100px;">
      <el-button size="mini" type="primary" style="margin: 0px 0px 0px 5px;" @click="showPostDiglog">发帖</el-button>
    </div>
    <el-card class="card" v-for="item in list" :key="item.id">
      <div slot="header" class="card-header">
        <span>{{item.author.name}}</span>
      </div>
      <div>
        <div>
          <div>
            {{item.content}}
          </div>
          <div style="margin: 10px 0px">
            本次话题：
            <span style="color: blue">#</span>
            <router-link :to="`/front/topic/post/${item.id}`" style="text-decoration: none;"><span style="color: red">{{item.labels}}</span></router-link>
            <span style="color: blue">#</span>
          </div>
        </div>
      </div>
      <div>
        <hr style="height:1px; border:none; border-top:1px solid #eee; margin: 20px 0px 15px 0px">
        <el-badge :value="item.postNum">
          <router-link :to="`/front/topic/post/${item.id}`" style="text-decoration: none;">
            <el-button size="small">帖子</el-button>
          </router-link>
        </el-badge>
      </div>
    </el-card>
    <div align="center">
      <el-button style="width:150px" @click="loadMoreData" v-if="hasMoreData">加载更多</el-button>
      <div v-else>没有更多数据</div>
    </div>
    <el-dialog
      title="发帖"
      :visible.sync="postDialogVisable"
      width="60%"
      :before-close="postDialogHandleClose"
      center>
      <el-form ref="itemForm" :model="editItem" label-width="80px" style="margin: 5px 15px;" :rules="rules">
        <el-form-item label="话题" style="display: inline-block; width: 55%" prop="topicIds">
          <el-select v-model="editItem.topicIds" placeholder="请选择" style="width: 100%" filterable clearable multiple default-first-option>
            <el-option v-for="item in list" :key="item.id" :label="item.labels" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="editItem.content" type="textarea" :rows="10" clearable></el-input>
        </el-form-item>
        <div>
          <span style="margin-left: 40px; padding-bottom: 20px; display: inline-block; float: left;">配图</span>
          <el-upload
            name="img"
            :action="uploadURL.uploadImgUrl"
            list-type="picture-card"
            :on-remove="handleUploadRemove"
            :on-success="handleUploadSuccess"
            style="margin-left: 80px"
            :file-list="editItem.fileList">
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
import { fetchTopics } from '../../../api/topic.js'
import { savePost } from '../../../api/post.js'
import { cloneDeep } from 'lodash'

const emptyItem = {
  content: null,
  topicIds: [],
  imgPaths: [],
  fileList: []
}

export default {
  name: 'Topic',
  data () {
    var topicValidator = (rule, value, callback) => {
      if (!value || value.length === 0) {
        callback(new Error('话题不能为空'))
      }
    }
    return {
      qry: {
        page: 1,
        size: 10
      },
      editItem: cloneDeep(emptyItem),
      postDialogVisable: false,
      list: [],
      total: 0,
      uploadURL: {
        uploadImgUrl: constant.baseApiUrl + '/file/img',
        imgUrl: constant.baseApiUrl + '/file/img'
      },
      hasMoreData: true,
      rules: {
        topicIds: [
          { required: true, validator: topicValidator, trigger: 'change' }
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      fetchTopics(this.qry).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        if (this.total === this.list.length) {
          this.hasMoreData = false
        }
      })
    },
    postDialogHandleClose () {
      this.$refs['itemForm'].resetFields()
      this.postDialogVisable = false
    },
    showPostDiglog () {
      if (this.$store.state.loginedUser === null) {
        this.$message.error('请先登录')
        return
      }
      this.editItem = cloneDeep(emptyItem)
      this.postDialogVisable = true
    },
    postHandle () {
      let isLegal = true
      this.$refs['itemForm'].validate((valid) => {
        if (!valid) {
          isLegal = false
          return false
        }
      })
      if (!isLegal) {
        return
      }
      this.editItem.topicIds = this.editItem.topicIds.join(',')
      this.editItem.fileList.forEach(item => {
        this.editItem.imgPaths.push(item.path)
      })
      this.editItem.imgPaths = this.editItem.imgPaths.join(',')
      delete this.editItem.fileList
      savePost(this.editItem).then(response => {
        this.$notify({
          title: '成功',
          message: '发帖成功',
          type: 'success'
        })
        this.getList()
        this.postDialogVisable = false
      })
    },
    handleUploadSuccess (response, file, fileList) {
      this.editItem.fileList.push({ name: file.name, path: response.data, url: `${this.uploadURL.imgUrl}?path=${encodeURIComponent(response.data)}` })
    },
    handleUploadRemove (file, fileList) {
      let index = -1
      for (let i = 0; i < this.editItem.fileList.length; i++) {
        if (this.editItem.fileList[i].uid === file.uid) {
          index = i
          break
        }
      }
      this.editItem.fileList.splice(index, 1)
    },
    loadMoreData () {
      this.qry.size *= 2
      fetchTopics(this.qry).then(response => {
        this.list = response.data.data
        if (this.total === this.list.length) {
          this.hasMoreData = false
        }
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
