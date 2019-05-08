<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" size="medium">发布</el-button>
      <el-button type="danger" size="medium">删除</el-button>
    </div>
    <el-table :data="list" style="width: 100%" border stripe>
      <el-table-column type="selection" width="35">
      </el-table-column>
      <el-table-column
        label="标题">
        <template slot-scope="scope">
          <router-link :to="`/front/activity/detail/${scope.row.id}`">{{scope.row.title}}</router-link>
        </template>
      </el-table-column>
      <el-table-column
        label="标签">
        <template slot-scope="scope">
          <el-tag v-for="(item, idx) in scope.row.labels" :key="item" size="small" :type="getLabelType(item)" :style="idx>0 ? { 'margin-left': '6px' } : {}">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="association"
        label="社团">
      </el-table-column>
      <el-table-column
        label="报名时间"
        width="200">
        <template slot-scope="scope">
          {{scope.row.applyStartTime}} - {{scope.row.applyEndTime}}
        </template>
      </el-table-column><el-table-column label="操作" width="110">
        <template>
          <el-button size="small" type="primary">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :current-page="qry.page" :page-size="qry.size" :total="list.length" @page-change="getList"></pagination>
  </div>
</template>

<script>
import Pagination from '../../../components/Pagination'
import { getFixedNumber } from '../../../util/utils.js'

export default {
  name: 'BackActivity',
  data () {
    return {
      qry: {
        page: 1,
        size: 10
      },
      list: [
        { id: '1', title: 'biaoti1', labels: ['旅行', '野外'], association: '与马者自行车协会', applyStartTime: '2018-03-06', applyEndTime: '2018-03-20' },
        { id: '2', title: 'biaoti2', labels: ['互动'], association: '66轮滑社', applyStartTime: '2018-03-07', applyEndTime: '2018-03-20' },
        { id: '3', title: 'biaoti3', labels: ['公益', '互助'], association: '青年志愿者协会', applyStartTime: '2018-03-08', applyEndTime: '2018-03-20' },
        { id: '4', title: 'biaoti4', labels: ['西藏', '长途'], association: '与马者自行车协会', applyStartTime: '2018-03-09', applyEndTime: '2018-03-20' },
        { id: '5', title: 'biaoti5', labels: [], association: '66轮滑社', applyStartTime: '2018-03-10', applyEndTime: '2018-03-20' }
      ],
      labelTypes: ['', 'success', 'info', 'warning', 'danger']
    }
  },
  components: {
    Pagination
  },
  methods: {
    getList () {
    },
    getLabelType (type) {
      return this.labelTypes[getFixedNumber(type) % this.labelTypes.length]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
