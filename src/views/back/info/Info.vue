<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" size="medium" @click="editVisible = true">添加</el-button>
      <el-button type="danger" size="medium">删除</el-button>
    </div>
    <el-table :data="list" style="width: 100%" border stripe>
      <el-table-column type="selection" width="35">
      </el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="负责人" prop="charity"></el-table-column>
      <el-table-column label="介绍" prop="info"></el-table-column>
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
          <el-form-item label="名称">
            <el-input v-model="editItem.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="负责人">
            <el-input v-model="editItem.charity" clearable></el-input>
          </el-form-item>
          <el-form-item label="介绍">
            <el-input v-model="editItem.info" type="textarea" :rows="10" clearable></el-input>
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
import { cloneDeep } from 'lodash'

const emptyItem = {
  id: null,
  name: null,
  charity: null,
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
      list: [
        { id: '1', name: '与马者自行车协会', charity: '弓志成', info: '与马者自行车协会成立于2003年1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111' },
        { id: '2', name: '66轮滑社', charity: '哈哈哈', info: '2221111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111' },
        { id: '3', name: '青年志愿者协会', charity: '呃呃呃', info: '2222111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111' }
      ],
      editVisible: false,
      isEdit: false,
      editItem: cloneDeep(emptyItem)
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
