<template>
  <div>
    <el-carousel :interval="4000" type="card" height="260px" style="margin: 0px 100px">
      <el-carousel-item v-for="item in 4" :key="item" style="vertical-align: middle">
        <img src="../../../assets/img/news1.jpg" style="height: 90%; width: 100%" @click="imgClick">
        <div style="height: 10%; text-align: center;">天梯赛</div>
      </el-carousel-item>
    </el-carousel>
    <hr style="height:1px; border:none; border-top:1px solid #ccc; margin: 40px 0px;">
    <div align="center">
      <el-table :data="list" style="width: 90%">
        <el-table-column label="标题">
          <template slot-scope="scope">
            <router-link :to="`/front/news/detail/${scope.row.id}`">{{scope.row.title}}</router-link>
          </template>
        </el-table-column>
        <el-table-column label="时间" prop="date" width="150px;"></el-table-column>
      </el-table>
    </div>
    <pagination :current-page="qry.page" :page-size="qry.size" :total="list.length" @page-change="getList"></pagination>
  </div>
</template>

<script>
import Pagination from '../../../components/Pagination'

export default {
  name: 'News',
  data () {
    return {
      qry: {
        page: 1,
        size: 10
      },
      list: [
        { id: '1', title: 'biaoti1', date: '2018-03-06' },
        { id: '2', title: 'biaoti2', date: '2018-03-07' },
        { id: '3', title: 'biaoti3', date: '2018-03-08' },
        { id: '4', title: 'biaoti4', date: '2018-03-09' },
        { id: '5', title: 'biaoti5', date: '2018-03-10' }
      ]
    }
  },
  components: {
    Pagination
  },
  methods: {
    getList () {
    },
    imgClick () {
      this.$router.push('/front/news/detail/12')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
