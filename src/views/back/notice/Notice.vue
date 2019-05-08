<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" size="medium" @click="editVisible = true">发布</el-button>
      <el-button type="danger" size="medium">删除</el-button>
    </div>
    <el-table :data="list" style="width: 100%" border stripe>
      <el-table-column type="selection" width="35">
      </el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="发布时间" prop="date"></el-table-column>
      <el-table-column label="发布者" prop="author"></el-table-column>
      <el-table-column label="操作" width="110">
        <template>
          <el-button size="small" type="primary">编辑</el-button>
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
          <el-form-item label="内容">
            <el-upload
              name="file"
              class="upload-demo"
              :action="uploadURL.uploadImgUrl"
              multiple
              :limit="3"
              :file-list="editItem.filePaths">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="editItem.content" type="textarea" :rows="10" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-right: 28px">
        <el-button @click="editVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" size="medium">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '../../../components/Pagination'
import { constant } from '../../../const/constant.js'
import { cloneDeep } from 'lodash'

const emptyItem = {
  id: null,
  title: null,
  content: null,
  filePaths: []
}

export default {
  name: 'BackNotice',
  data () {
    return {
      qry: {
        page: 1,
        size: 10
      },
      list: [
        { id: '1', title: 'biaoti1', date: '2015-03-06', author: 'zhao' },
        { id: '2', title: 'biaoti2', date: '2015-03-06', author: 'zhao' },
        { id: '3', title: 'biaoti3', date: '2015-03-06', author: 'zhao' },
        { id: '4', title: 'biaoti4', date: '2015-03-06', author: 'zhao' },
        { id: '5', title: 'biaoti5', date: '2015-03-06', author: 'zhao' }
      ],
      editVisible: false,
      isEdit: false,
      editItem: cloneDeep(emptyItem),
      uploadURL: {
        uploadImgUrl: constant.baseApiUrl + '/file/img',
        ImgUrl: constant.baseApiUrl + '/file/img'
      }
    }
  },
  components: {
    Pagination
  },
  methods: {
    getList () {
    },
    editHandleClose () {
      this.editVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
