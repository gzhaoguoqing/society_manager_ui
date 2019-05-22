<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" size="medium" @click="showCreateDialog">添加</el-button>
      <el-button type="danger" size="medium" @click="deleteHandle" :disabled="selections.length === 0">删除</el-button>
      <el-button type="primary" size="medium" @click="exportCsv">导出</el-button>
    </div>
    <el-table :data="list"
      style="width: 100%"
      border
      stripe
      ref="tableApplicantRef"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="35">
      </el-table-column>
      <el-table-column
        prop="number"
        label="学号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        label="性别">
        <template slot-scope="scope">
          {{scope.row.sex === 0 ? '男' : '女'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="classes"
        label="班级">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话">
      </el-table-column>
      <el-table-column label="操作" width="110">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="showEditDialog(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :current-page.sync="qry.page" :page-size.sync="qry.size" :total="allList.length" @page-change="getList"></pagination>

    <el-dialog
      :title="isEdit ? '编辑' : '添加'"
      :visible.sync="editVisible"
      width="70%"
      :before-close="editHandleClose"
      append-to-body>
      <div>
        <el-form ref="itemApplicantForm" :model="editItem" label-width="80px" style="margin: 30px">
          <el-form-item label="学号">
            <el-input v-model="editItem.number" clearable></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="editItem.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="editItem.sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="班级">
            <el-input v-model="editItem.classes" clearable></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="editItem.phone" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-right: 28px">
        <el-button @click="editHandleClose" size="medium">取 消</el-button>
        <el-button type="primary" size="medium" @click="saveApplicantHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '../../../../components/Pagination'
import { strJoin } from '../../../../util/utils.js'
import { cloneDeep } from 'lodash'
import { apply, updateApplicant, deleteApplicant, fetchApplicant } from '../../../../api/activity'

const emptyItem = {
  id: null,
  activityId: null,
  number: null,
  name: null,
  sex: 0,
  classes: null,
  phone: null
}

export default {
  name: 'Applicant',
  props: [
    'activityId',
    'applicants'
  ],
  data () {
    return {
      qry: {
        page: 1,
        size: 10
      },
      list: [],
      editVisible: false,
      isEdit: false,
      editItem: cloneDeep(emptyItem),
      selections: [],
      allList: []
    }
  },
  components: {
    Pagination
  },
  created () {
    emptyItem.activityId = this.activityId
    this.getList()
  },
  methods: {
    getList () {
      fetchApplicant(this.activityId).then(response => {
        this.allList = response.data.data
        let start = (this.qry.page - 1) * this.qry.size
        let size = start + this.qry.size
        this.list = this.allList.slice(start, size)
      })
    },
    editHandleClose () {
      this.editVisible = false
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
    saveApplicantHandle () {
      if (this.isEdit) {
        updateApplicant(cloneDeep(this.editItem)).then(response => {
          this.$notify({
            title: '成功',
            message: '报名信息修改成功',
            type: 'success'
          })
          this.editVisible = false
          this.getList()
        })
      } else {
        apply(cloneDeep(this.editItem)).then(response => {
          this.$notify({
            title: '成功',
            message: '报名信息添加成功',
            type: 'success'
          })
          this.editVisible = false
          this.getList()
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
      deleteApplicant(this.editItem.activityId, strJoin(idArr, ',')).then(response => {
        this.$notify({
          title: '成功',
          message: '活动删除成功',
          type: 'success'
        })
        this.getList()
      })
    },
    exportCsv () {
      let exportFile = document.createElement('a')
      exportFile.href = `/api/activity/applicant/export/${this.activityId}`
      exportFile.click()
    }
  },
  watch: {
    activityId (val) {
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
