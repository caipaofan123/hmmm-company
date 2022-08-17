<template>
  <div class="VueQuillEditor">
    <el-upload
      style="display: none"
      class="quill-avatar-uploader"
      action="#"
      :show-file-list="false"
      :http-request="httpRequest"
      :before-upload="beforeAvatarUpload"
    >
    </el-upload>
    <quill-editor
      v-model="content"
      :options="editorOption"
      @blur="questionBlur"
      ref="myQuillEditor"
      @change="onEditorChange($event)"
    >
    </quill-editor>
  </div>
</template>

<script>
import COS from "cos-js-sdk-v5";
const cos = new COS({
  SecretId: "AKIDfCVYKq79xVotjKn21kDAuOqFTRAdtufd",
  SecretKey: "oPmtlOmtmX5Xr2ye7LK4ZnqhO0SCqGVX",
});
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  ["blockquote"], // 引用  代码块-----['blockquote', 'code-block']
  ["code-block", "image", "link"], // 链接、图片、视频-----['link', 'image', 'video']
];
export default {
  name: "Editor",
  data() {
    return {
      content: this.value,
      editorOption: {
        placeholder: "",
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              // 自定义图片上传
              image: (value) => {
                if (value) {
                  document
                    .querySelectorAll(".quill-avatar-uploader input")
                    [this.editorIndex].click();
                } else {
                  this.$refs.myQuillEditor.quill.format("image", false);
                }
              },
            },
          },
        },
      },
    };
  },

  props: {
    value: {
      type: String,
      required: true,
    },
    editorIndex: {
      type: Number,
      default: 0,
    },
  },

  created() {},

  methods: {
    //发起请求
    httpRequest({ file }) {
      cos.putObject(
        {
          Bucket: "bianling-1313341649" /* 必须 */,
          Region: "ap-shanghai" /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: "STANDARD",
          Body: file, // 上传文件对象
        },
        (err, data) => {
          if (err || data.statusCode !== 200) {
            return this.$message.error("上传失败");
          }
          let url = "http://" + data.Location;

          let quill = this.$refs.myQuillEditor.quill;
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片insertEmbed()三个参数，前两个固定即可
          quill.insertEmbed(length, "image", url);
          // 调整光标到最后
          quill.setSelection(length + 1);
          /*---核心操作区域---end---*/
        }
      );
    },

    //清除内容
    deleteText() {
      const quill = this.$refs.myQuillEditor.quill;
      quill.deleteText(0, quill.getLength());
    },

    //文字内容
    onEditorChange() {
      this.$emit("input", this.content);
    },

    //上传图片之前的处理
    beforeAvatarUpload(file) {
      const isJPG = ["image/jpeg", "image/png", "image/gif"].includes(
        file.type
      );

      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG,png,gif 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
        return false;
      }
    },

    //失去焦点触发事件
    questionBlur() {
      this.$emit("blur");
    },
  },

  computed: {},
};
</script>

<style lang="scss" scoped></style>
