<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" size="medium">发布</el-button>
      <el-button type="danger" size="medium">删除</el-button>
    </div>
    <el-table :data="list" style="width: 100%" border stripe>
      <el-table-column type="selection" width="35">
      </el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="发布时间" prop="date"></el-table-column>
      <el-table-column label="发布者" prop="author"></el-table-column>
      <el-table-column label="操作" width="200">
        <template>
          <el-button size="small" type="primary">编辑</el-button>
          <el-button size="small" type="primary">查看帖子</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :current-page="qry.page" :page-size="qry.size" :total="list.length" @page-change="getList"></pagination>
  </div>
</template>

<script>
import Pagination from '../../../components/Pagination'

export default {
  name: 'BackTopic',
  data () {
    return {
      qry: {
        page: 1,
        size: 10
      },
      list: [
        { id: '1', title: 'biaoti1', date: '2015-03-06', author: 'zhao', labels: ['宿舍停水'] },
        { id: '2', title: 'biaoti2', date: '2015-03-06', author: 'zhao', labels: ['选修', '选课'] },
        { id: '3', title: 'biaoti3', date: '2015-03-06', author: 'zhao', lables: ['数据学院'] },
        { id: '4', title: 'biaoti4', date: '2015-03-06', author: 'zhao', labels: ['金川北门修路'] },
        { id: '5', title: 'biaoti5', date: '2015-03-06', author: 'zhao', labels: ['小吃街'] }
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
.card {
  margin: 8px 100px;
}

.card-header {
  height: 5px;
}

.img {
  margin: 3px 3px;
}
</style>
