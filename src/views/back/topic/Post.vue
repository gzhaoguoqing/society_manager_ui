<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="danger" size="medium" @click="deleteHandle" :disabled="selections.length === 0">删除</el-button>
    </div>
    <el-table :data="list"
      style="width: 100%"
      border
      stripe
      ref="tablePostRef"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="35">
      </el-table-column>
      <el-table-column
        label="话题">
        <template slot-scope="scope">
          <el-tag v-for="(item, idx) in scope.row.topics" :key="item.id" size="small" :type="getLabelType(item.labels)" :style="idx>0 ? { 'margin-left': '6px' } : {}">{{item.labels}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="author.name"
        label="发布者">
      </el-table-column>
      <el-table-column
        label="赞数">
        <template slot-scope="scope">
          {{scope.row.ups.length}}
        </template>
      </el-table-column>
      <el-table-column
        label="评论数">
        <template slot-scope="scope">
          {{scope.row.comments.length}}
        </template>
      </el-table-column>
      <el-table-column
        label="内容">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.content" placement="bottom" effect="light">
            <span>{{shortText(scope.row.content)}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination :current-page.sync="qry.page" :page-size.sync="qry.size" :total="total" @page-change="getList"></pagination>
  </div>
</template>

<script>
import Pagination from '../../../components/Pagination'
import { fetchPosts, deletePost } from '../../../api/post.js'
import { getFixedNumber } from '../../../util/utils.js'

export default {
  name: 'BackPost',
  props: [
    'topicId'
  ],
  data () {
    return {
      qry: {
        page: 1,
        size: 10,
        topicId: null
      },
      list: [],
      total: 0,
      selections: [],
      labelTypes: ['', 'success', 'info', 'warning', 'danger']
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
      this.qry.topicId = this.topicId
      fetchPosts(this.qry).then(response => {
        this.list = response.data.data
        this.total = response.data.total
      })
    },
    handleSelectionChange (val) {
      this.selections = val
    },
    deleteHandle () {
      let idArr = []
      this.selections.forEach(item => {
        idArr.push(item.id)
      })
      deletePost(idArr.join(',')).then(response => {
        this.$notify({
          title: '成功',
          message: '帖子删除成功',
          type: 'success'
        })
        this.getList()
      })
    },
    getLabelType (type) {
      return this.labelTypes[getFixedNumber(type) % this.labelTypes.length]
    },
    shortText (text) {
      let newText = text.substring(0, 16)
      return newText.length < 10 ? newText : newText + '...'
    }
  },
  watch: {
    topicId (val) {
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
