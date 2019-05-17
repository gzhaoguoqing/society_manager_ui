<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" size="medium" @click="showCreateDialog">添加</el-button>
      <el-button type="danger" size="medium" @click="deleteHandle" :disabled="selections.length === 0">删除</el-button>
    </div>
    <el-table :data="list"
      style="width: 100%"
      border
      stripe
      ref="tableRef"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="35">
      </el-table-column>
      <el-table-column label="名称" prop="name" width=""></el-table-column>
      <el-table-column label="负责人" prop="charity.name" width="120"></el-table-column>
      <el-table-column label="介绍" prop="info" width="700"></el-table-column>
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
          <el-form-item label="名称">
            <el-input v-model="editItem.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="负责人" style="display: inline-block; width: 50%">
            <el-select v-model="editItem.charityId" placeholder="请选择" style="width: 100%" clearable filterable>
              <el-option v-for="item in userList" :key="item.id" :label="`${item.name}:${item.number}`" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="介绍">
            <el-input v-model="editItem.info" type="textarea" :rows="10" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-right: 28px">
        <el-button @click="editHandleClose" size="medium">取 消</el-button>
        <el-button type="primary" size="medium" @click="saveInfoHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '../../../components/Pagination'
import { fetchInfos, saveInfo, updateInfo, deleteInfo } from '../../../api/info.js'
import { fetchUsers } from '../../../api/user.js'
import { strJoin } from '../../../util/utils.js'
import { cloneDeep } from 'lodash'

const emptyItem = {
  id: null,
  name: null,
  charityId: null,
  info: null
}

export default {
  name: 'BackInfo',
  data () {
    return {
      qry: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      userList: [],
      editVisible: false,
      isEdit: false,
      editItem: cloneDeep(emptyItem),
      selections: []
    }
  },
  components: {
    Pagination
  },
  created () {
    this.getList()
    fetchUsers(this.qry).then(response => {
      this.userList = response.data.data
    })
  },
  methods: {
    getList () {
      fetchInfos(this.qry).then(response => {
        this.list = response.data.data
        this.total = response.data.total
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
      this.editItem.charityId = item.charity ? item.charity.id : null
    },
    saveInfoHandle () {
      if (this.isEdit) {
        updateInfo(cloneDeep(this.editItem)).then(response => {
          this.$notify({
            title: '成功',
            message: '信息编辑成功',
            type: 'success'
          })
          this.getList()
          this.editVisible = false
        })
      } else {
        saveInfo(cloneDeep(this.editItem)).then(response => {
          this.$notify({
            title: '成功',
            message: '信息添加成功',
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
      deleteInfo(strJoin(idArr, ',')).then(response => {
        this.$notify({
          title: '成功',
          message: '信息删除成功',
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
