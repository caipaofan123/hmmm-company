<template>
  <!-- 弹框 -->
  <el-dialog @close="onclose" title="题目预览" :visible="visible" width="50%">
    <!-- 内容区 -->
    <el-row>
      <el-col :span="6"
        ><div class="grid-content bg-purple">


          【题型】:
          {{
            list.questionType === "1"
              ? "单选"
              : list.questionType === "2"
              ? "多选"
              : "简答"
          }}

        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple-light">
          【编号】: {{ list.id }}
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">


          【难度】:
          {{
            list.questionType === "1"
              ? "简单"
              : list.questionType === "2"
              ? "一般"
              : "困难"
          }}

        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple-light">
          【标签】: {{ list.tags }}
        </div></el-col
      >
    </el-row>
    <el-row class="elrow">
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          【学科】: {{ list.subjectName }}
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple-light">
          【目录】: {{ list.directoryName }}
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          【方向】: {{ list.direction }}
        </div></el-col
      >
    </el-row>
    <hr />
    <div>
      <el-row>
        <el-col>【题干】:</el-col>
        <el-col class="elspan" v-html="list.question"> </el-col>
      </el-row>




      <p>选题:(以下选中的选项为正确答案)</p>

      <div v-for="item in list.options" :key="item.id">
        <el-checkbox></el-checkbox>
        <span class="checkbox">{{ item.title }}</span>

      </div>
    </div>
    <hr />
    <div>
      <span>【参考答案】：</span>
      <el-button type="danger" size="small" @click="videoShow = true"
        >视频答案预览</el-button
      >
      <div v-if="videoShow">

        <video :src="list.videoURL" controls autoplay muted loop>
          您的浏览器版本过低
        </video>

      </div>
    </div>
    <hr />
    <el-row :gutter="10">
      <el-col :span="5" class="colsapn">【答案解析】: </el-col>
      <el-col :span="15" class="spanrow" v-html="list.answer"></el-col>
    </el-row>
    <hr />
    <el-row :gutter="10">
      <el-col :span="5">【题目备注】: </el-col>
      <el-col :span="15" class="spanrow" v-html="list.tags"></el-col>
    </el-row>

    <!-- 关闭按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button class="button" @click="onclose">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>

export default {
  data () {
    return {
      videoShow: false
    }

  },
  props: {
    visible: {
      type: Boolean,

      required: true
    },
    list: {
      type: Object,
      required: true
    }
  },
  components: {},
  methods: {
    onclose () {
      this.$emit('update:visible', false)
    }
  },
  created () {},
  updated () {},
  mounted () {},
  filters: {},
  computed: {},
  watch: {}
}

</script>
<style lang="less" scoped>
.elrow {
  margin-top: 15px;
}
.button {
  background-color: #409eff;
  color: #fff;
}
video {
  width: 400px;
  height: 300px;
}
.checkbox {
  margin-left: 8px;
}
.ti {
  display: flex;
}

.elspan {
  color: #409eff;
}
.colsapn {
  padding-top: 15px;
}
.el-col-5 {
  width: unset;
}
</style>
