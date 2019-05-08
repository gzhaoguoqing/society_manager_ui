<template>
  <div>
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
        prop="association"
        label="社团"
        width="280">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="120">
      </el-table-column>
    </el-table>
    <pagination :current-page="qry.page" :page-size="qry.size" :total="list.length" @page-change="getList"></pagination>
  </div>
</template>

<script>
import Pagination from '../../../components/Pagination'

export default {
  name: 'Notice',
  data () {
    return {
      qry: {
        page: 1,
        size: 10
      },
      list: [
        { id: '1', title: 'biaoti1', association: '与马者自行车协会', date: '2018-03-06' },
        { id: '2', title: 'biaoti2', association: '66轮滑社', date: '2018-03-07' },
        { id: '3', title: 'biaoti3', association: '青年志愿者协会', date: '2018-03-08' },
        { id: '4', title: 'biaoti4', association: '与马者自行车协会', date: '2018-03-09' },
        { id: '5', title: 'biaoti5', association: '66轮滑社', date: '2018-03-10' }
      ]
    }
  },
  components: {
    Pagination
  },
  methods: {
    getList () {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
