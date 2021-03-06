<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" size="medium" @click="showCreateDialog" v-if="$store.state.loginedUser !== null && $store.state.loginedUser.role.name === '管理员'">添加</el-button>
      <el-button type="danger" size="medium" @click="deleteHandle" :disabled="selections.length === 0" v-if="$store.state.loginedUser !== null && $store.state.loginedUser.role.name === '管理员'">删除</el-button>
      <el-button type="danger" size="medium" @click="resetPwdHandle" :disabled="selections.length === 0" v-if="$store.state.loginedUser !== null && $store.state.loginedUser.role.name === '管理员'">重置密码</el-button>
      <el-button type="primary" size="medium" @click="exportCsv">导出</el-button>
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
      <el-table-column label="社团" v-if="$store.state.loginedUser !== null && $store.state.loginedUser.role.name === '管理员'">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.associations" :key="item.id" size="small">{{item.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110" v-if="$store.state.loginedUser !== null && $store.state.loginedUser.role.name === '管理员'">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="showEditDialog(scope.row)">编辑</el-button>
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
        <el-form ref="itemForm" :model="editItem" label-width="85px" style="margin: 30px" :rules="rules">
          <el-form-item label="学号/工号" prop="number">
            <el-input v-model="editItem.number" clearable></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editItem.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="editItem.sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="班级" prop="classes">
            <el-input v-model="editItem.classes" clearable></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="contactWay">
            <el-input v-model="editItem.contactWay" clearable></el-input>
          </el-form-item>
          <el-form-item label="角色" style="display: inline-block; width: 50%" prop="roleId">
            <el-select v-model="editItem.roleId" placeholder="请选择" style="width: 100%" @change="changeRole">
              <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="editItem.roleId !== 'a6ae79cace744ec08f1bc506de066e37'" label="社团" style="display: inline-block; width: 50%" prop="associationIds">
            <el-select v-model="editItem.associationIds" placeholder="请选择" style="width: 100%" clearable :multiple="editItem.roleId === '2f58614346604c1383c6d9aca063f01d'">
              <el-option v-for="item in infoList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-right: 28px">
        <el-button @click="editHandleClose" size="medium">取 消</el-button>
        <el-button type="primary" size="medium" @click="saveUserHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '../../../components/Pagination'
import { fetchUsers, saveUser, deleteUser, updateUser, resetPwd } from '../../../api/user.js'
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
        size: 10,
        infoId: null
      },
      total: 0,
      list: [],
      infoList: [],
      roleList: [],
      editVisible: false,
      isEdit: false,
      editItem: cloneDeep(emptyItem),
      selections: [],
      rules: {
        number: [
          { required: true, message: '学号/工号不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性别不能为空', trigger: 'blur' }
        ],
        classes: [
          { required: true, message: '班级不能为空', trigger: 'blur' }
        ],
        contactWay: [
          { required: true, message: '联系方式不能为空', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '角色不能为空', trigger: 'change' }
        ],
        associationIds: [
          { required: true, message: '社团不能为空', trigger: 'change' }
        ]
      }
    }
  },
  components: {
    Pagination
  },
  created () {
    window.setTimeout(this.getList, 300)
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
      if (this.$store.state.loginedUser.role.name === '社团负责人') {
        this.qry.infoId = this.$store.state.loginedUser.associations[0].id
      }
      fetchUsers(this.qry).then(response => {
        this.list = response.data.data
        this.total = response.data.total
      })
    },
    editHandleClose () {
      this.$refs['itemForm'].resetFields()
      this.editVisible = false
    },
    showCreateDialog () {
      this.editVisible = true
      this.isEdit = false
      this.editItem = cloneDeep(emptyItem)
      this.editItem.roleId = this.roleList[0].id
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
      this.editItem.roleId = item.role ? item.role.id : null
      let assocIds = []
      item.associations.forEach(it => {
        assocIds.push(it.id)
      })
      if (this.editItem.roleId === '2f58614346604c1383c6d9aca063f01d') {
        this.editItem.associationIds = assocIds
      } else {
        this.editItem.associationIds = strJoin(assocIds, ',')
      }
    },
    saveUserHandle () {
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
      if (this.editItem.roleId === '2f58614346604c1383c6d9aca063f01d') {
        this.editItem.associationIds = strJoin(this.editItem.associationIds, ',')
      }
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
    },
    resetPwdHandle () {
      let idArr = []
      this.selections.forEach(item => {
        idArr.push(item.id)
      })
      resetPwd(strJoin(idArr, ',')).then(response => {
        this.$notify({
          title: '成功',
          message: '密码重置成功',
          type: 'success'
        })
        this.$refs.tableRef.clearSelection()
      })
    },
    exportCsv () {
      let exportFile = document.createElement('a')
      exportFile.href = `/api/user/export`
      if (this.$store.state.loginedUser.role.name === '社团负责人') {
        exportFile.href += `?infoId=${this.qry.infoId !== null ? this.qry.infoId : ''}`
      }
      exportFile.click()
    },
    changeRole () {
      if (this.editItem.roleId === '2f58614346604c1383c6d9aca063f01d') {
        this.editItem.associationIds = []
      } else {
        this.editItem.associationIds = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
