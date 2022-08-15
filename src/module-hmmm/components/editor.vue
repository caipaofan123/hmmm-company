<template>
    <div class="edit_container">
        <quill-editor
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
    </div>
</template>
<script>

import { quillEditor } from 'vue-quill-editor' // 调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  components: {

    quillEditor

  },
  data () {
    return {
      editorOption: {
        placeholder: '请在这里输入',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'], // 引用，代码块
            [{ list: 'ordered' }, { list: 'bullet' }], // 列表
            ['clean'], // 清除字体样式
            ['image', 'video'], // 上传图片、上传视频
            ['link']
          ]
        }
      }
    }
  },
  methods: {
    onEditorReady (editor) { // 准备编辑器

    },
    onEditorBlur () {}, // 失去焦点事件
    onEditorFocus () {}, // 获得焦点事件
    onEditorChange () {} // 内容改变事件
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  }
}
</script>
