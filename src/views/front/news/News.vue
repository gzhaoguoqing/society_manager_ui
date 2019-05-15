<template>
  <div>
    <el-carousel :interval="4000" type="card" height="260px" style="margin: 0px 100px">
      <el-carousel-item v-for="item in importantList" :key="item.id" style="vertical-align: middle">
        <img :src="item.importantImgPath" style="height: 90%; width: 100%" @click="imgClick(item.id)">
        <div style="height: 10%; text-align: center;">{{item.title}}</div>
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
        <el-table-column label="时间" prop="date" width="200px;"></el-table-column>
      </el-table>
    </div>
    <pagination :current-page.sync="qry.page" :page-size.sync="qry.size" :total="total" @page-change="getList"></pagination>
  </div>
</template>

<script>
import Pagination from '../../../components/Pagination'
import { constant } from '../../../const/constant.js'
import { fetchNewses, fetchImportNewses } from '../../../api/news.js'

export default {
  name: 'News',
  data () {
    return {
      qry: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      importantList: []
    }
  },
  components: {
    Pagination
  },
  created () {
    this.getList()
    this.getImportList()
  },
  methods: {
    getList () {
      fetchNewses(this.qry).then(response => {
        this.list = response.data.data
        this.castUrl(this.list)
        this.total = response.data.total
      })
    },
    getImportList () {
      fetchImportNewses({ size: 4 }).then(response => {
        this.importantList = response.data.data
        this.castUrl(this.importantList)
      })
    },
    castUrl (itemList) {
      itemList.forEach(item => {
        item.importantImgPath = `${constant.baseImgUri}?path=${encodeURIComponent(item.importantImgPath)}`
      })
    },
    imgClick (id) {
      this.$router.push(`/front/news/detail/${id}`)
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
