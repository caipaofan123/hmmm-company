<template>
  <div>
    <el-alert
      class="el-icon-info"
    title="数据一共?条"
    type="info">
  </el-alert>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      fixed
      prop="number"
      label="试题编号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="subject"
      label="学科"
      width="120">
    </el-table-column>
    <el-table-column
      prop="catalog"
      label="目录"
      width="120">
    </el-table-column>
    <el-table-column
      prop="questionType"
      label="题型"
      width="120"
      :formatter="formatQuestionType"
      >
    </el-table-column>
    <el-table-column
      prop="question"
      label="题干"
      width="300">
      <template slot-scope="{row}">
        <span v-html="row.question"></span>
      </template>
    </el-table-column>
    <el-table-column
      prop="addDate"
      label="录入时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="difficulty"
      label="难度"
      width="120"
      :formatter="formatDifficultyType"
      >
    </el-table-column>
    <el-table-column
      prop="creator"
      label="录入人"
      width="120">
    </el-table-column>
    <el-table-column
      prop="chkState"
      label="审核状态"
      width="120">
    </el-table-column>
    <el-table-column
      prop="chkRemarks"
      label="审核意见"
      width="120">
    </el-table-column>
    <el-table-column
      prop="chkUser"
      label="审核人"
      width="120">
    </el-table-column>
    <el-table-column
      prop="publishState"
      label="发布状态"
      width="120"
      :formatter="formatReleaseType"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="195">
      <template slot-scope="{row}">
        <el-button @click="handleClickPreview(row)" type="text" size="small">预览</el-button>
        <el-button @click="handleClickReview(row)" type="text" size="small"
         :disabled="row.chkState == 0 ?false :true">审核</el-button>
        <el-button @click="handleClickRevise(row)" type="text" size="small">修改</el-button>
        <el-button @click="openShelf(row)" type="text" size="small">{{row.publishState == 0 ? "上架" : "下架"}}</el-button>
        <el-button @click="remove(row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-row
          type="flex"
          justify="right"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="sizes, prev, pager, next, jumper"
            :total="pagination.total"
            :page-size="pagination.size"
            :page-sizes="[5, 10, 20, 50]"
            @current-change="currentChange"
          />
        </el-row>

 <!-- 预览弹层 -->
 <questions :visible.sync="visible" :list="list"></questions>

 <!-- 审核弹层 -->
<el-dialog
  title="题目审核"
  :visible.sync="dialogVisibleReview"
  width="30%"
  :before-close="handleClose">
  <el-radio-group v-model="radioReview" @change="changeReview">
    <el-radio  label="1">通过</el-radio>
    <el-radio  label="2">拒绝</el-radio>
  </el-radio-group>
    <el-input type="textarea" placeholder="请输入审核意见" v-model="reviewRow.chkRemarks" style="margin-top: 20px"></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmReview">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import { choiceCheck, choicePublish, remove } from '@/api/hmmm/questions'
import questions from '../components/questions'
// import { questionType } from '@/api/hmmm/constants'

export default {
  components: { questions },
  data () {
    return {
      visible: false, // 预览弹层
      dialogVisibleReview: false, // 审核弹层
      radioReview: '1', // 审核单选的值
      reviewRow: {
        id: '',
        chkRemarks: '', // 审核文本域
        chkState: 1 // 监听得到审核单选的值
      }, // 审核当前
      list: {},
      openShelfList: {
        id: '',
        publishState: ''
      }
    }
  },
  props: {
    tableData: {
      type: Object,
      required: true
    },
    pagination: {
      type: Object,
      required: true
    }
  },

  created () {

  },

  methods: {
    handleClose () {
      this.dialogVisibleReview = false
    },
    // 分页
    currentChange (val) {
      this.pages.page = val
    },
    // 预览
    handleClickPreview (row) {
      this.list = row
      this.visible = true
    },
    // 审核
    handleClickReview (row) {
      this.reviewRow.id = row.id
      this.dialogVisibleReview = true
    },
    // 审核单选框的值
    changeReview (val) {
      this.reviewRow.chkState = val
    },
    // 确认是否审核通过
    async confirmReview (row) {
      if (this.reviewRow.chkRemarks.length === 0) {
        this.$message({
          message: '请输入审核意见',
          type: 'warning'
        })
      } else {
        await choiceCheck(this.reviewRow)
        this.$message.success('操作成功')
        this.dialogVisibleReview = false
      }
    },
    // 修改
    handleClickRevise () {
      this.$router.push('new')
    },
    // 上架
    openShelf (row) {
      this.openShelfList.id = row.id
      this.openShelfList.publishState = row.publishState
      if (row.publishState === 1) {
        this.$confirm('您确认下架这道题目吗??', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await choicePublish(this.openShelfList)
          this.$message({
            type: 'success',
            message: '下架成功!'
          })
          row.publishState = !row.publishState
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      } else {
        this.$confirm('您确认上架这道题目吗??', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await choicePublish(this.openShelfList)
          this.$message({
            type: 'success',
            message: '上架成功!'
          })
          row.publishState = !row.publishState
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    },
    remove (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await remove(row)
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
        this.$emit('choiceApi')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 题干映射区判断
    formatQuestionType (row, column, cellValue, index) {
      // const findItem = questionType.find((item) => item.value === cellValue)
      // return findItem ? findItem.value : '简答'
      return ['单选', '多选', '简答'][index + 1]
    },
    formatDifficultyType (row, column, cellValue, index) {
      return ['简单', '一般', '困难'][index + 1]
    },
    formatReleaseType (row, column, cellValue, index) {
      return ['待发布', '已发布', '已下架'][index + 1]
    }
  }
}
</script>

<style scoped>

</style>
