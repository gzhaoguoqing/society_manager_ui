<template>
  <div v-if="item !== null">
    <div align="center"><h2>{{item.title}}</h2></div>
    <div align="right" style="margin: 0px 20px 0px 0px">社团：{{item.author.associations[0].name}}</div>
    <hr style="height:1px; border:none; border-top:1px solid #ccc; margin: 20px 0px;">
    <div style="white-space:pre; margin: 0px 20px;" class="ql-editor" v-html="item.content"></div>
    <hr style="height:1px; border:none; border-top:1px solid #ccc; margin: 20px 0px;">
    <div v-if="item.applyUp" style="margin: 0px 20px;">
      本次活动已经开启报名，当前报名人数：
      <span style="color: blue">{{item.participantors.length}}</span>，
      您可以&nbsp;
      <el-button type="primary" size="mini" style="padding: 3px;" @click="showApplyDiglog">报名</el-button>
    </div>
    <el-dialog
      title="报名"
      :visible.sync="applyDialogVisable"
      width="40%"
      :before-close="applyDialogHandleClose"
      center>
      <el-form ref="itemForm" :model="editItem" label-width="80px" style="margin: 5px 15px;">
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="applyDialogHandleClose" size="medium">取 消</el-button>
        <el-button type="primary" size="medium" @click="applyHandle">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchActivity, apply } from '../../../api/activity'
import { cloneDeep } from 'lodash'

let emptyItem = {
  activityId: null,
  number: null,
  name: null,
  sex: 0,
  classes: null,
  phone: null
}

export default {
  name: 'ActivityDetail',
  data () {
    return {
      item: null,
      applyDialogVisable: false,
      editItem: cloneDeep(emptyItem)
    }
  },
  created () {
    this.getItem()
  },
  methods: {
    getItem () {
      fetchActivity(this.$route.params['id']).then(response => {
        this.item = response.data.data
        this.item.applyUp = this.item.applyUp === 1
      })
    },
    applyDialogHandleClose () {
      this.applyDialogVisable = false
    },
    showApplyDiglog () {
      this.editItem = cloneDeep(emptyItem)
      this.editItem.activityId = this.$route.params['id']
      this.applyDialogVisable = true
    },
    applyHandle () {
      apply(this.editItem).then(response => {
        this.$notify({
          title: '成功',
          message: '活动报名成功',
          type: 'success'
        })
        this.getItem()
        this.applyDialogVisable = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
