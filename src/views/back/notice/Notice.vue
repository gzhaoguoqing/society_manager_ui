<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" size="medium" @click="showCreateDialog">发布</el-button>
      <el-button type="danger" size="medium" @click="deleteHandle" :disabled="selections.length === 0">删除</el-button>
    </div>
    <el-table
      :data="list"
      style="width: 100%"
      border
      stripe
      ref="tableRef"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="35">
      </el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="发布时间" prop="date"></el-table-column>
      <el-table-column label="发布者" prop="author.name"></el-table-column>
      <el-table-column label="操作" width="110">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="showEditDialog(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :current-page.sync="qry.page" :page-size.sync="qry.size" :total="total" @page-change="getList"></pagination>

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
          <el-form-item label="附件">
            <el-upload
              name="file"
              class="upload-demo"
              :action="uploadURL.uploadFileUrl"
              multiple
              :limit="3"
              :file-list="editItem.fileList"
              :on-success="uploadSuccess">
              <el-button size="small" type="primary">上传文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="editItem.content" type="textarea" :rows="10" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-right: 28px">
        <el-button @click="editVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" size="medium" @click="saveNewsHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '../../../components/Pagination'
import { fetchNotices, saveNotice, updateNotice, deleteNotice } from '../../../api/notice.js'
import { constant } from '../../../const/constant.js'
import { strJoin } from '../../../util/utils.js'
import { cloneDeep } from 'lodash'

const emptyItem = {
  id: null,
  title: null,
  content: null,
  filePaths: [],
  fileList: []
}

export default {
  name: 'BackNotice',
  data () {
    return {
      qry: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      editVisible: false,
      isEdit: false,
      editItem: cloneDeep(emptyItem),
      uploadURL: {
        uploadFileUrl: constant.baseApiUrl + '/file'
      },
      selections: []
    }
  },
  components: {
    Pagination
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      fetchNotices(this.qry).then(response => {
        this.list = response.data.data
        this.total = response.data.total
      })
    },
    editHandleClose () {
      this.editVisible = false
    },
    uploadSuccess (response, file, fileList) {
      if (response.code === 1) {
        this.editItem.fileList.push({ name: file.name, path: response.data })
      }
    },
    showCreateDialog () {
      this.editVisible = true
      this.isEdit = false
      this.editItem = cloneDeep(emptyItem)
    },
    showEditDialog (item) {
      this.editVisible = true
      this.isEdit = true
      this.editItem = cloneDeep(emptyItem)
      for (let name in this.editItem) {
        if (item[name]) {
          this.editItem[name] = item[name]
        }
      }
      this.editItem.filePaths.forEach(path => {
        this.editItem.fileList.push({ name: path.substring(path.lastIndexOf('/') + 1, path.length), path: path })
      })
    },
    saveNewsHandle () {
      this.editItem.fileList.forEach(item => {
        this.editItem.filePaths.push(item.path)
      })
      this.editItem.filePaths = strJoin(this.editItem.filePaths, ',')
      delete this.editItem.fileList
      if (this.isEdit) {
        updateNotice(cloneDeep(this.editItem)).then(response => {
          this.$notify({
            title: '成功',
            message: '公告编辑成功',
            type: 'success'
          })
          this.getList()
          this.editVisible = false
        })
      } else {
        saveNotice(cloneDeep(this.editItem)).then(response => {
          this.$notify({
            title: '成功',
            message: '公告发布成功',
            type: 'success'
          })
          this.getList()
          this.editVisible = false
        })
      }
    },
    handleSelectionChange (val) {
      this.selections = val
    },
    deleteHandle () {
      let idArr = []
      this.selections.forEach(item => {
        idArr.push(item.id)
      })
      deleteNotice(strJoin(idArr, ',')).then(response => {
        this.$notify({
          title: '成功',
          message: '公告删除成功',
          type: 'success'
        })
        this.getList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
