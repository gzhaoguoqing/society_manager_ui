<template>
  <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" :style="`height: ${height}`" @change="onEditorChange"></quill-editor>
</template>

<script>
import { quillEditor, Quill } from 'vue-quill-editor'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
import { ImageExtend, container, QuillWatch } from 'quill-image-extend-module'
Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/ImageExtend', ImageExtend)

export default {
  name: 'Editor',
  props: [
    'value',
    'options',
    'height'
  ],
  components: {
    quillEditor
  },
  data () {
    return {
      content: '',
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true,
            name: 'img',
            action: this.options.uploadImgUrl,
            response: (res) => {
              return this.options.ImgUrl + `?path=${encodeURIComponent(res.data)}`
            }
          },
          toolbar: {
            container: container,
            handlers: {
              'image': function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          },
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
          }
        }
      }
    }
  },
  methods: {
    onEditorChange () {
      this.$emit('input', this.content)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
