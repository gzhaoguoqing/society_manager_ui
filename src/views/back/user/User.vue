<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" size="medium" @click="showCreateDialog">添加</el-button>
      <el-button type="danger" size="medium" @click="deleteHandle">删除</el-button>
      <el-button type="danger" size="medium">重置密码</el-button>
      <el-button type="danger" size="medium">权限管理</el-button>
    </div>
    <el-table :data="list"
      style="width: 100%"
      border
      stripe
      ref="tableRef"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="35">
      </el-table-column>
      <el-table-column label="学号/工号" prop="number"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          {{scope.row.sex===0 ? '男' : (scope.row.sex===null ? '' : '女')}}
        </template>
      </el-table-column>
      <el-table-column label="班级" prop="classes"></el-table-column>
      <el-table-column label="联系方式" prop="contactWay"></el-table-column>
      <el-table-column label="角色" prop="role.name"></el-table-column>
      <el-table-column label="社团">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.associations" :key="item.id" size="small">{{item.name}}</el-tag>
        </template>
      </el-table-column>
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
          <el-form-item label="联系方式">
            <el-input v-model="editItem.contactWay" clearable></el-input>
          </el-form-item>
          <el-form-item label="角色" style="display: inline-block; width: 50%">
            <el-select v-model="editItem.roleId" placeholder="请选择" style="width: 100%" clearable>
              <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="社团" style="display: inline-block; width: 50%">
            <el-select v-model="editItem.associationIds" placeholder="请选择" style="width: 100%" clearable>
              <el-option v-for="item in infoList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-right: 28px">
        <el-button @click="editVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" size="medium" @click="saveUserHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '../../../components/Pagination'
import { fetchUsers, saveUser, deleteUser, updateUser } from '../../../api/user.js'
import { fetchInfos } from '../../../api/info.js'
import { fetchRoles } from '../../../api/role.js'
import { strJoin } from '../../../util/utils.js'
import { cloneDeep } from 'lodash'

const emptyItem = {
  id: null,
  number: null,
  name: null,
  sex: 0,
  classes: null,
  contactWay: null,
  roleId: null,
  associationIds: []
}

export default {
  name: 'UserStaff',
  data () {
    return {
      qry: {
        page: 1,
        size: 10
      },
      total: 0,
      list: [],
      infoList: [],
      roleList: [],
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
    fetchInfos().then(response => {
      this.infoList = response.data.data
    })
    fetchRoles().then(response => {
      this.roleList = response.data.data
    })
  },
  methods: {
    pageSizeChange (data) {
      this.qry.page = data.page
      this.qry.size = data.size
    },
    getList () {
      fetchUsers(this.qry).then(response => {
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
        debugger
        if (item[name]) {
          this.editItem[name] = item[name]
        }
      }
      this.editItem.roleId = item.role ? item.role.id : null
      let assocIds = []
      item.associations.forEach(it => {
        assocIds.push(it.id)
      })
      this.editItem.associationIds = strJoin(assocIds, ',')
    },
    saveUserHandle () {
      if (this.isEdit) {
        updateUser(cloneDeep(this.editItem)).then(response => {
          this.$notify({
            title: '成功',
            message: '成员编辑成功',
            type: 'success'
          })
          this.getList()
          this.editVisible = false
        })
      } else {
        saveUser(cloneDeep(this.editItem)).then(response => {
          this.$notify({
            title: '成功',
            message: '成员添加成功',
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
      deleteUser(strJoin(idArr, ',')).then(response => {
        this.$notify({
          title: '成功',
          message: '成员删除成功',
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
