<template>
  <div v-if="item !== null">
    <div align="center"><h2>{{item.title}}</h2></div>
    <div align="right" style="margin: 0px 20px 0px 0px">日期：{{item.date}}  作者：{{item.author.name}}</div>
    <hr style="height:1px; border:none; border-top:1px solid #ccc; margin: 20px 0px;">
    <div style="white-space:pre-wrap;word-break:break-all; margin: 0px 20px;">{{item.content}}</div>
    <hr style="height:1px; border:none; border-top:1px solid #ccc; margin: 20px 0px;">
    <div v-for="(file, idx) in files" :key="file.path" style="margin: 0px 20px;">
      附件{{idx+1}}:
      <a :href="`${uploadFileUrl}?path=${encodeURIComponent(file.path)}`">
        {{file.name}}
      </a>
    </div>
  </div>
</template>

<script>
import { fetchNotice } from '../../../api/notice.js'
import { constant } from '../../../const/constant.js'

export default {
  name: 'NoticeDetail',
  data () {
    return {
      item: null,
      uploadFileUrl: constant.baseApiUrl + '/file',
      files: []
    }
  },
  created () {
    this.getItem()
  },
  methods: {
    getItem () {
      fetchNotice(this.$route.params['id']).then(response => {
        this.item = response.data.data
        this.item.filePaths.forEach(path => {
          this.files.push({ name: path.substring(path.lastIndexOf('/') + 1, path.length), path: path })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
