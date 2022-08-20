<template>
  <div class='container'>
    <el-card class="box-card">
      <headForm @update="updataFn"></headForm>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClickTbas" @choiceApi='choiceApi'>
    <el-tab-pane label="全部" name="first">
<tables :tableData="tableData" :pagination="pagination" @choiceApi='choiceApi'></tables>
    </el-tab-pane>
    <el-tab-pane label="待审核" name="second">
<tables :tableData="tableData" :pagination="pagination" @choiceApi='choiceApi'></tables>

    </el-tab-pane>
    <el-tab-pane label="已审核" name="third">
<tables :tableData="tableData" :pagination="pagination" @choiceApi='choiceApi'></tables>

    </el-tab-pane>
    <el-tab-pane label="已拒绝" name="fourth">
<tables :tableData="tableData" :pagination="pagination" @choiceApi='choiceApi'></tables>

    </el-tab-pane>
  </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { choice } from '@/api/hmmm/questions'
import headForm from '../components/headForm'
import Cookies from 'js-cookie'
import tables from '../components/tables'
// import Bus from './bus' // 这个文件路径写自己的

export default {
  components: { headForm, tables },
  data () {
    return {
      activeName: Cookies.get('employeeDetailTab') || 'first',
      tableData: [],
      pagination: {
        Page: '',
        total: 0,
        Pagesize: ''
      },
      pages: {
        page: 1,
        pagesize: 5,
        chkState: undefined
      }
    }
  },
  created () {
    this.choiceApi()
  },
  methods: {
    // 列表数据
    async choiceApi () {
      const res = await choice(this.pages)
      this.tableData = res.data.items
      // 一共多少条
      this.total = res.data.counts
      this.paginationPage = res.data.page
      this.paginationPage = res.data.pages
    },
    pageFn (pageNum) {
      this.pages.page = pageNum
      this.choiceApi()
    },
    pagesFn (pageSize) {
      this.pages.size = pageSize
    },
    // 搜索
    updataFn (data) {
      this.tableData = data.items
    },
    // table切换
    async handleClickTbas (e) {
      this.pages.chkState = +e.index === 0 ? undefined : e.index - 1
      // const res = await choice(this.pages)
      // this.tableData = res.data.items
      // // 一共多少条
      // this.total = res.data.counts
      // this.paginationPage = res.data.page
      // this.paginationPage = res.data.pages
      this.choiceApi()
    }
  }
}
</script>

<style scoped lang='less'>
.box-card {
  margin: 20px;
  }</style>
