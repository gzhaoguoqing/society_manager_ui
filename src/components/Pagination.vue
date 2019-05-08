<template>
  <div style="margin-top: 30px" align="center">
    <el-pagination
      @size-change="$emit('pageChange')"
      @current-change="$emit('pageChange')"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
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
  data () {
    return {
      pageSizes: [10, 20, 30, 40, 50, 100],
      layout: 'total, sizes, prev, pager, next, jumper'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
