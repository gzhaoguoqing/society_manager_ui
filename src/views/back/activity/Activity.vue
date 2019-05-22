<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" size="medium" @click="showCreateDialog">发布</el-button>
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
      <el-table-column
        label="标题">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column
        label="标签">
        <template slot-scope="scope">
          <el-tag v-for="(item, idx) in scope.row.labels" :key="item" size="small" :type="getLabelType(item)" :style="idx>0 ? { 'margin-left': '6px' } : {}">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="社团"
        v-if="$store.state.loginedUser.role.name === '管理员'">
        <template slot-scope="scope">
          <el-tag size="small">{{scope.row.association !== null ? scope.row.association.name : ''}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="发布者"
        prop="author.name">
      </el-table-column>
      <el-table-column
        label="报名时间"
        width="290">
        <template slot-scope="scope">
          <span v-if="scope.row.applyUp" style="font-size: 12px">
            {{scope.row.applyStartTime}} 至 {{scope.row.applyEndTime}}
          </span>
          <span v-else>
            未开启报名
          </span>
        </template>
      </el-table-column><el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="showEditDialog(scope.row)">编辑</el-button>
          <el-button size="small" type="primary" @click="showApplicantDialog(scope.row)">报名信息</el-button>
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
        <el-form ref="itemForm" :model="editItem" label-width="80px" style="margin: 30px">
          <el-form-item label="标题">
            <el-input v-model="editItem.title" clearable></el-input>
          </el-form-item>
          <el-form-item label="标签" style="display: inline-block; width: 55%">
            <el-select v-model="editItem.labels" placeholder="请输入" style="width: 100%" filterable clearable multiple allow-create default-first-option>
              <el-option v-for="item in []" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开启报名">
            <el-switch v-model="editItem.applyUp" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item label="报名时间" v-if="editItem.applyUp">
            <el-date-picker v-model="editItem.applyStartTime" type="datetimerange" style="width: 50%"
                :picker-options="pickerOptions" :editable="false" value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="开始时间" range-separator="至" end-placeholder="结束时间">
            </el-date-picker>
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
          <div style="margin-top: 30px;">
            <span style="margin-left: 40px; padding-bottom: 20px; display: inline-block; float: left">内容</span>
            <div style="padding-left: 10px; margin-bottom: 50px; margin-left: 70px;">
              <editor :content.sync="editItem.content" :options="uploadURL" height="500px"></editor>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-right: 28px">
        <el-button @click="editHandleClose" size="medium">取 消</el-button>
        <el-button type="primary" size="medium" @click="saveInfoHandle">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="报名信息"
      :visible.sync="applicantVisible"
      width="70%"
      :before-close="applicantHandleClose">
      <applicant :activityId="activity.id"></applicant>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '../../../components/Pagination'
import Applicant from './components/Applicant'
import Editor from '../../../components/Editor'
import { fetchActivitys, updateActivity, saveActivity, deleteActivity } from '../../../api/activity.js'
import { getFixedNumber, strJoin } from '../../../util/utils.js'
import { constant } from '../../../const/constant.js'
import { cloneDeep } from 'lodash'

const emptyItem = {
  id: null,
  title: null,
  content: null,
  filePaths: [],
  applyUp: false,
  applyStartTime: null,
  applyEndTime: null,
  labels: [],
  fileList: []
}

export default {
  name: 'BackActivity',
  data () {
    return {
      qry: {
        page: 1,
        size: 10,
        associationId: null
      },
      list: [],
      total: 0,
      editVisible: false,
      applicantVisible: false,
      isEdit: false,
      editItem: cloneDeep(emptyItem),
      pickerOptions: {
        disabledDate: this.banSelectPastTime
      },
      selections: [],
      uploadURL: {
        uploadFileUrl: constant.baseApiUrl + '/file',
        uploadImgUrl: constant.baseApiUrl + '/file/img',
        ImgUrl: constant.baseApiUrl + '/file/img'
      },
      labelTypes: ['', 'success', 'info', 'warning', 'danger'],
      activity: cloneDeep(emptyItem)
    }
  },
  components: {
    Pagination,
    Editor,
    Applicant
  },
  created () {
    window.setTimeout(this.getList, 300)
  },
  methods: {
    getList () {
      if (this.$store.state.loginedUser.role.name !== '管理员') {
        this.qry.associationId = this.$store.state.loginedUser.associations.length > 0 ? this.$store.state.loginedUser.associations[0].id : null
      }
      fetchActivitys(this.qry).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.list.forEach(item => {
          item.applyUp = item.applyUp === 1
        })
      })
    },
    getLabelType (type) {
      return this.labelTypes[getFixedNumber(type) % this.labelTypes.length]
    },
    uploadSuccess (response, file, fileList) {
      if (response.code === 1) {
        this.editItem.fileList.push({ name: file.name, path: response.data })
      }
    },
    editHandleClose () {
      this.editVisible = false
    },
    applicantHandleClose () {
      this.applicantVisible = false
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
      this.editItem.applyStartTime = [this.editItem.applyStartTime, this.editItem.applyEndTime]
      this.editItem.filePaths.forEach(path => {
        this.editItem.fileList.push({ name: path.substring(path.lastIndexOf('/') + 1, path.length), path: path })
      })
      this.editItem.filePaths = []
    },
    showApplicantDialog (item) {
      this.activity = item
      this.applicantVisible = true
    },
    saveInfoHandle () {
      if (this.editItem.applyUp) {
        this.editItem.applyUp = 1
      } else {
        this.editItem.applyUp = 0
      }
      this.editItem.fileList.forEach(item => {
        this.editItem.filePaths.push(item.path)
      })
      this.editItem.filePaths = strJoin(this.editItem.filePaths, ',')
      if (this.editItem.applyUp) {
        this.editItem.applyEndTime = this.editItem.applyStartTime[1]
        this.editItem.applyStartTime = this.editItem.applyStartTime[0]
      } else {
        this.editItem.applyStartTime = null
      }
      this.editItem.labels = strJoin(this.editItem.labels, ',')
      delete this.editItem.fileList
      if (this.isEdit) {
        updateActivity(cloneDeep(this.editItem)).then(response => {
          this.$notify({
            title: '成功',
            message: '活动编辑成功',
            type: 'success'
          })
          this.getList()
          this.editVisible = false
        })
      } else {
        saveActivity(cloneDeep(this.editItem)).then(response => {
          this.$notify({
            title: '成功',
            message: '活动添加成功',
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
      deleteActivity(strJoin(idArr, ',')).then(response => {
        this.$notify({
          title: '成功',
          message: '活动删除成功',
          type: 'success'
        })
        this.getList()
      })
    },
    banSelectPastTime (currTime) {
      return currTime.getTime() < Date.now() - 8.64e7
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
