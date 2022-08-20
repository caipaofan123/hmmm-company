<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :file-list="fileList"
      action="#"
      :http-request="onRequest"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      list-type="picture-card"
      class="custom-upload"
      :before-upload="beforeUpload"
      :class="fileList.length ? 'hide' : ''"
    >
    <p class="updataImg">上传图片</p>
    </el-upload>
    <el-dialog :visible.sync="previewImgDialog">
      <img :src="imgUrl" alt="" class="avatar">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKID73i7IDrErHSN3TdXBZhZBYfWAYgX8UaQ',
  SecretKey: 'bx3tToukfLkuoRpxpRovmMhma9TWHlyu'
})
console.log(cos)
export default {
  name: 'UploadImg',
  data () {
    return {
      fileList: [
      ],
      previewImgDialog: false,
      loading: false,
      imgUrl: ''
    }
  },

  created () {

  },

  methods: {
    onRequest ({ file }) {
      this.loading = true
      cos.putObject({
        Bucket: 'hmhr-31-1313341648', /* 必须 */
        Region: 'ap-shanghai', /* 存储桶所在地域，必须字段 */
        Key: 'file.name', /* 必须 */
        StorageClass: 'STANDARD',
        Body: file, // 上传文件对象
        onProgress: function (progressData) {
          console.log(JSON.stringify(progressData))
        }
      },
      (err, data) => {
        this.loading = false
        // 成功或值失败都进入该函数
        // err null false 有错
        // err 不为null true 有错
        if (err || data.statusCode !== 200) {
          return this.$message.error('没成功')
        }
        this.$emit('onSuccess', {
          url: 'https://' + data.Location
        })
      })
    },
    onChange (file, fileList) {
      this.fileList = fileList
    },
    onPreview (file) {
      this.previewImgDialog = true
      this.imgUrl = file.url
    },
    onRemove (file, fileList) {
      this.filelist = fileList
    },
    beforeUpload (file) {
      // 可以上传的图片类型
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('~') + '图片')
        return false
      }
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片不能超过2mb')
        return false
      }
      // console.log('上传前的检查', file)
    }
  }
}
</script>

<style scoped lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 100px;
  height: 60px;
  overflow: hidden;
}
.updataImg{
  width: 100px;
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  margin-top: 0;
}
</style>
