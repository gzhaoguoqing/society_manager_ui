<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" size="medium" @click="createNews">发布</el-button>
      <el-button type="danger" size="medium">删除</el-button>
    </div>
    <el-table :data="list" style="width: 100%" border stripe>
      <el-table-column type="selection" width="35">
      </el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="发布时间" prop="date"></el-table-column>
      <el-table-column label="发布者" prop="author"></el-table-column>
      <el-table-column label="点击数" prop="clicks"></el-table-column>
      <el-table-column label="是否重要新闻" prop="important"></el-table-column>
      <el-table-column label="操作" width="110">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="editNews(scope.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :current-page="qry.page" :page-size="qry.size" :total="list.length" @page-change="getList"></pagination>

    <el-dialog
      :title="isEdit ? '编辑' : '发布'"
      :visible.sync="editVisible"
      width="60%"
      :before-close="editHandleClose">
      <div>
        <el-form ref="itemForm" :model="editItem" label-width="80px" style="margin: 30px">
          <el-form-item label="标题">
            <el-input v-model="editItem.title" clearable></el-input>
          </el-form-item>
          <el-form-item label="发布时间">
            <el-date-picker v-model="editItem.date" type="datetime" placeholder="选择发布时间" style="width: 45%" :picker-options="pickerOptions" :editable="false"></el-date-picker>
          </el-form-item>
          <el-form-item label="重要新闻">
            <el-switch v-model="editItem.important" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <div v-if="editItem.important">
            <span style="margin-left: 40px; padding-bottom: 20px; display: inline-block; float: left;">封面</span>
            <el-upload
              name="img"
              class="avatar-uploader"
              :action="uploadURL.uploadImgUrl"
              :show-file-list="false"
              :on-success="handlePictureUploadSuccess"
              :before-upload="handlePictureUpload"
              style="margin-left: 80px">
              <img v-if="editItem.importantImgPath !== null" :src="`${uploadURL.ImgUrl}?path=${encodeURIComponent(editItem.importantImgPath)}`" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div style="margin-top: 30px;">
            <span style="margin-left: 40px; padding-bottom: 20px; display: inline-block; float: left">内容</span>
            <div style="padding-left: 10px; margin-bottom: 50px; margin-left: 70px;">
              <editor v-model="editItem.content" :options="uploadURL" height="500px"></editor>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-right: 28px">
        <el-button @click="editVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="saveNews" size="medium">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '../../../components/Pagination'
import Editor from '../../../components/Editor'
import { constant } from '../../../const/constant.js'

import { cloneDeep } from 'lodash'

const emptyItem = {
  id: null,
  title: null,
  content: null,
  date: null,
  author: null,
  clicks: 0,
  important: false,
  importantImgPath: null
}

export default {
  name: 'BackNews',
  data () {
    return {
      qry: {
        page: 1,
        size: 10
      },
      list: [
        { id: '1', title: 'biaoti1', content: 'aaa', date: '2015-03-06', author: 'zhao', clicks: 2, important: '是' },
        { id: '2', title: 'biaoti2', content: 'bbbb', date: '2015-03-06', author: 'zhao', clicks: 3, important: '否' },
        { id: '3', title: 'biaoti3', content: 'cccc', date: '2015-03-06', author: 'zhao', clicks: 1, important: '是' },
        { id: '4', title: 'biaoti4', content: 'ddd', date: '2015-03-06', author: 'zhao', clicks: 5, important: '否' },
        { id: '5', title: 'biaoti5', content: 'ffff', date: '2015-03-06', author: 'zhao', clicks: 2, important: '是' }
      ],
      editVisible: false,
      isEdit: false,
      editItem: cloneDeep(emptyItem),
      pickerOptions: {
        disabledDate: this.banSelectPastTime
      },
      uploadURL: {
        uploadImgUrl: constant.baseApiUrl + '/file/img',
        ImgUrl: constant.baseApiUrl + '/file/img'
      }
    }
  },
  components: {
    Pagination,
    Editor
  },
  methods: {
    getList () {
    },
    editHandleClose () {
      this.editVisible = false
    },
    createNews () {
      this.editVisible = true
      this.editItem = cloneDeep(emptyItem)
    },
    editNews (id) {
      this.editVisible = true
      this.editItem = cloneDeep(emptyItem)
    },
    banSelectPastTime (currTime) {
      return currTime.getTime() < Date.now() - 8.64e7
    },
    saveNews () {
    },
    handlePictureUpload (file) {

    },
    handlePictureUploadSuccess (response, file, fileList) {
      this.editItem.importantImgPath = response.data
    }
  }
}
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.avatar-uploader, .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 270px;
  height: 178px;
  display: block;
}
.avatar-uploader, .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 270px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 270px;
  height: 178px;
  display: block;
}

</style>
