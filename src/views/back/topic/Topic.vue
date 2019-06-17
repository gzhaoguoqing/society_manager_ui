<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" size="medium" @click="showCreateDialog">发布</el-button>
      <el-button type="danger" size="medium" @click="deleteHandle">删除</el-button>
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
      <el-table-column label="名称" prop="labels"></el-table-column>
      <el-table-column label="发布时间" prop="date"></el-table-column>
      <el-table-column label="发布者" prop="author.name"></el-table-column>
      <el-table-column label="内容" prop="content"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="showEditDialog(scope.row)">编辑</el-button>
          <el-button size="small" type="primary" @click="showPostDiglog(scope.row)">查看帖子</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :current-page.sync="qry.page" :page-size.sync="qry.size" :total="total" @page-change="getList"></pagination>

    <el-dialog
      :title="isEdit ? '编辑' : '发布'"
      :visible.sync="editVisible"
      width="70%"
      :before-close="editHandleClose">
      <div>
        <el-form ref="itemForm" :model="editItem" label-width="80px" style="margin: 30px" :rules="rules">
          <el-form-item label="名称" prop="labels">
            <el-input v-model="editItem.labels" clearable></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input v-model="editItem.content" type="textarea" :rows="12" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-right: 28px">
        <el-button @click="editHandleClose" size="medium">取 消</el-button>
        <el-button type="primary" size="medium" @click="saveTopicHandle">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="帖子"
      :visible.sync="postDialogVisible"
      width="70%"
      :before-close="postHandleClose">
      <post :topicId="topic !== null ? topic.id : ''"></post>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '../../../components/Pagination'
import Post from './Post'
import { fetchTopics, saveTopic, deleteTopic, updateTopic } from '../../../api/topic.js'
import { cloneDeep } from 'lodash'

const emptyItem = {
  id: null,
  labels: null,
  content: null
}

export default {
  name: 'BackTopic',
  data () {
    return {
      qry: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      editVisible: false,
      postDialogVisible: false,
      isEdit: false,
      editItem: cloneDeep(emptyItem),
      selections: [],
      topic: null,
      rules: {
        labels: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    Pagination,
    Post
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      fetchTopics(this.qry).then(response => {
        this.list = response.data.data
        this.total = response.data.total
      })
    },
    editHandleClose () {
      this.$refs['itemForm'].resetFields()
      this.editVisible = false
    },
    postHandleClose () {
      this.postDialogVisible = false
    },
    showPostDiglog (topic) {
      this.topic = topic
      this.postDialogVisible = true
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
    },
    saveTopicHandle () {
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
      if (this.isEdit) {
        updateTopic(cloneDeep(this.editItem)).then(response => {
          this.$notify({
            title: '成功',
            message: '话题编辑成功',
            type: 'success'
          })
          this.getList()
          this.editVisible = false
        })
      } else {
        saveTopic(cloneDeep(this.editItem)).then(response => {
          this.$notify({
            title: '成功',
            message: '话题发布成功',
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
      deleteTopic(idArr.join(',')).then(response => {
        this.$notify({
          title: '成功',
          message: '话题删除成功',
          type: 'success'
        })
        this.getList()
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
