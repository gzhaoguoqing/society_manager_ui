<template>
  <div v-if="item !== null">
    <div align="center"><h2>{{item.title}}</h2></div>
    <div align="right" style="margin: 0px 20px 0px 0px">日期：{{item.date}}  作者：{{item.author.name}}  点击数：{{item.clicks}}</div>
    <hr style="height:1px; border:none; border-top:1px solid #ccc; margin: 20px 0px;">
    <div v-html="item.content"  style="white-space:pre; margin: 0px 20px;" class="ql-editor"></div>
  </div>
</template>

<script>
import { fetchNews } from '../../../api/news.js'

export default {
  name: 'NewsDetail',
  data () {
    return {
      item: null
    }
  },
  created () {
    this.getItem()
  },
  methods: {
    getItem () {
      fetchNews(this.$route.params['id']).then(response => {
        this.item = response.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
