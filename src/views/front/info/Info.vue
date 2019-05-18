<template>
  <div>
    <el-card class="card" v-for="item in list" :key="item.id">
      <div slot="header" class="card-header">
        <span>{{item.name}}</span>
        <span style="float: right">负责人：{{item.charity.name}}</span>
      </div>
      <div>
        <div>
          <div style="text-indent: 2em;">
            {{item.info}}
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { fetchInfos } from '../../../api/info'
export default {
  name: 'Info',
  data () {
    return {
      list: []
    }
  },
  components: {

  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      fetchInfos(this.qry).then(response => {
        this.list = response.data.data
      })
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
</style>
