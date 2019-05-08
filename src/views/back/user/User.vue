<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" size="medium" @click="editVisible = true">添加</el-button>
      <el-button type="danger" size="medium">删除</el-button>
      <el-button type="danger" size="medium">重置密码</el-button>
      <el-button type="danger" size="medium">权限管理</el-button>
    </div>
    <el-table :data="list" style="width: 100%" border stripe>
      <el-table-column type="selection" width="35">
      </el-table-column>
      <el-table-column label="学号/工号" prop="number"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          {{scope.row.sex==0 ? '男' : '女'}}
        </template>
      </el-table-column>
      <el-table-column label="班级" prop="classes"></el-table-column>
      <el-table-column label="联系方式" prop="contactWay"></el-table-column>
      <el-table-column label="角色" prop="role"></el-table-column>
      <el-table-column label="社团" prop="association"></el-table-column>
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
            <el-select v-model="editItem.roleId" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="社团" style="display: inline-block; width: 50%">
            <el-select v-model="editItem.associationIds" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in 10" :key="item" :label="item" :value="item"></el-option>
            </el-select>
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
import { fetchUsers } from '../../../api/user.js'
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
      list: [
        { id: '1', number: '201520205015', name: '赵国庆', sex: '0', classes: '软件15-3', contactWay: '17611112222', role: '管理员', association: '' },
        { id: '2', number: '201520205014', name: '王杰', sex: '0', classes: '软件15-3', contactWay: '17611112222', role: '普通成员', association: '66轮滑社' },
        { id: '3', number: '201520205016', name: '潘坤', sex: '0', classes: '软件15-3', contactWay: '17611112222', role: '普通成员', association: '66轮滑社' },
        { id: '4', number: '201520205017', name: '樊成琦', sex: '1', classes: '软件15-3', contactWay: '17611112222', role: '普通成员', association: '青年志愿者协会' },
        { id: '5', number: '201520205049', name: '弓志成', sex: '0', classes: '软件15-3', contactWay: '17611112222', role: '社团负责人', association: '与马者自行车协会' },
        { id: '6', number: '201520205054', name: '李永昊', sex: '0', classes: '软件15-3', contactWay: '17611112222', role: '普通成员', association: '66轮滑社' }
      ],
      editVisible: false,
      isEdit: false,
      editItem: cloneDeep(emptyItem)
    }
  },
  components: {
    Pagination
  },
  created () {
    fetchUsers().then(response => {

    })
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
