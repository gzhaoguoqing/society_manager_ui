<template>
  <div>
    <el-table
        :data="list"
        style="width: 100%">
      <el-table-column
        label="标题">
        <template slot-scope="scope">
          <router-link :to="`/front/activity/detail/${scope.row.id}`">{{scope.row.title}}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="标签"
        width="220">
        <template slot-scope="scope">
          <el-tag v-for="(item, idx) in scope.row.labels" :key="item" size="small" :type="getLabelType(item)" :style="idx>0 ? { 'margin-left': '6px' } : {}">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="社团"
        width="180">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.author.associations" :key="item.id" size="small">{{item.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="报名时间"
        width="280">
        <template slot-scope="scope">
          <span v-if="scope.row.applyUp" style="font-size: 12px">
            {{scope.row.applyStartTime}} 至 {{scope.row.applyEndTime}}
          </span>
          <span v-else>
            未开启报名
          </span>
        </template>
      </el-table-column>
    </el-table>
    <pagination :current-page.sync="qry.page" :page-size.sync="qry.size" :total="total" @page-change="getList"></pagination>
  </div>
</template>

<script>
import Pagination from '../../../components/Pagination'
import { fetchActivitys } from '../../../api/activity.js'
import { getFixedNumber } from '../../../util/utils.js'

export default {
  name: 'Activity',
  data () {
    return {
      qry: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
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
      fetchActivitys(this.qry).then(response => {
        this.list = response.data.data
        this.total = response.data.total
      })
    },
    getLabelType (type) {
      return this.labelTypes[getFixedNumber(type) % this.labelTypes.length]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
