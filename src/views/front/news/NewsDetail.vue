<template>
  <div>
    <div align="center"><h2>{{item.title}}</h2></div>
    <div align="right">日期：{{item.date}}  作者：{{item.author}} 点击数：5</div>
    <div align="right"></div>
    <hr style="height:1px; border:none; border-top:1px solid #ccc; margin: 20px 0px;">
    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.content}}</div>
  </div>
</template>

<script>
export default {
  name: 'NewsDetail',
  data () {
    return {
      item: { id: '1', title: 'biaoti1', content: 'aaa1234433333333333333333333334444333', date: '2015-03-06', author: 'zhao', clicks: 2, important: '是' }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
