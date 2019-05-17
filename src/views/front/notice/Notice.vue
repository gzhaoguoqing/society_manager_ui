<template>
  <div>
    <div >
      <el-input v-model="qry.title" size="medium" placeholder="请输入标题" clearable style="width: 200px;" @keyup.enter.native="getList"></el-input>
      <el-button type="primary" size="medium" style="margin: 0px 10px;" @click="getList">查询</el-button>
    </div>
    <el-table
        :data="list"
        style="width: 100%">
      <el-table-column
        prop="title"
        label="标题">
        <template slot-scope="scope">
          <router-link :to="`/front/notice/detail/${scope.row.id}`">{{scope.row.title}}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="社团"
        width="250">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.author.associations" :key="item.id" size="small">{{item.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="210">
      </el-table-column>
    </el-table>
    <pagination :current-page.sync="qry.page" :page-size.sync="qry.size" :total="total" @page-change="getList"></pagination>
  </div>
</template>

<script>
import Pagination from '../../../components/Pagination'
import { fetchNotices } from '../../../api/notice.js'

export default {
  name: 'Notice',
  data () {
    return {
      qry: {
        page: 1,
        size: 10,
        title: null
      },
      list: [],
      total: 0
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
      fetchNotices(this.qry).then(response => {
        this.list = response.data.data
        this.total = response.data.total
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
