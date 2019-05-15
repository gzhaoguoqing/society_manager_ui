<template>
  <div style="margin-top: 30px" align="center">
    <el-pagination
      @size-change="changePage"
      @current-change="changePage"
      :current-page.sync="locCurrPage"
      :page-sizes="pageSizes"
      :page-size.sync="locPageSize"
      :layout="layout"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: [
    'currentPage',
    'pageSize',
    'total'
  ],
  created () {
    this.locCurrPage = this.currentPage
    this.locPageSize = this.pageSize
  },
  data () {
    return {
      pageSizes: [10, 20, 30, 40, 50, 100],
      layout: 'total, sizes, prev, pager, next, jumper',
      locCurrPage: 1,
      locPageSize: 10
    }
  },
  methods: {
    changePage () {
      this.$emit('update:current-page', this.locCurrPage)
      this.$emit('update:page-size', this.locPageSize)
      this.$emit('page-change')
    }
  },
  watch: {
    currentPage (val) {
      this.locCurrPage = val
    },
    pageSize (val) {
      this.locPageSize = val
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
