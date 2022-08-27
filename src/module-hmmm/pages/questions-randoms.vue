<template>
  <div class="container">
    <el-card class="box-card">
      <!-- 搜索按钮部分 -->
      <el-row type="flex" align="center">
        <el-col class="search-top">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="关键字">
              <el-input
                placeholder="你好小仙女~张羽"
                v-model.trim="keyword"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col>
          <el-row justify="end" type="flex">
            <el-button class="btn" size="small" @click="keyword = ''"
              >清除</el-button
            >
            <el-button
              class="btn1"
              type="primary"
              size="small"
              @click="onSearch"
              :loading="isLoading"
              >搜索</el-button
            >
          </el-row>
        </el-col>
      </el-row>
      <!-- 禁用 -->
      <el-alert type="info" show-icon title="" :closable="false">
        <template slot="title">
          <span>数据一共{{ counts }} 条</span>
        </template>
      </el-alert>
      <!-- 表格 -->
      <el-table :data="PleaseList" style="width: 100%">
        <el-table-column prop="id" label="编号"> </el-table-column>
        <el-table-column
          prop="questionType"
          :formatter="question"
          label="题型"
          width="80px"
        >
        </el-table-column>
        <el-table-column label="题目编号" prop="item.name">
          <template slot-scope="{ row }">
            <span
              @click="onQuestionIDs(item)"
              class="questionIDs"
              v-for="(item, index) in row.questionIDs"
              :key="index"
              >{{ item.number }}<br
            /></span>
          </template>
        </el-table-column>
        <el-table-column label="录入时间" prop="addTime"> </el-table-column>
        <el-table-column prop="totalSeconds" label="答题时间(s)">
        </el-table-column>
        <el-table-column prop="accuracyRate" label="正确率(%)" width="100px">
        </el-table-column>
        <el-table-column prop="userName" label="录入人" width="100px">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="{ row }">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              @click="removeDanger(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next,sizes,jumper"
          :page-size="pagesize"
          :page-sizes="[20, 30, 50, 100]"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
      <!-- 弹框 -->
      <Questions :visible.sync="Answer" :list="list"></Questions>
    </el-card>
  </div>
</template>

<script>
import { randoms, removeRandoms, detail } from "@/api/hmmm/questions";
import baseApi from "@/api/base/baseApi";
import Questions from "@/components/questions";

export default {
  data() {
    return {
      // 页面数据
      PleaseList: [],
      // 总共页数
      counts: {},
      // 一页有几条数据
      pagesize: 20,
      // 当前页码
      total: 0,
      page: 1,
      keyword: "", //搜索接口关键字
      Answer: false, //弹框
      list: {},
      isLoading: false,
    };
  },
  components: {
    Questions,
  },
  created() {
    this.createAPI();
  },
  methods: {
    async createAPI() {
      const { data } = await randoms({
        page: this.page,
        pagesize: this.pagesize,
      });
      this.PleaseList = data.items;
      this.counts = data.counts;
      // 把当前的页码赋值过去
      this.total = data.counts;
      // console.log(data);
    },
    // 切换页面
    handleCurrentChange(val) {
      this.page = val;
      // 调用页面数据
      this.createAPI();
    },
    // 显示几条一页
    handleSizeChange(val) {
      this.pagesize = val;
      // 调用页面数据
      this.createAPI();
    },
    // 用表格里的formatter方法
    question(row, column, cellValue, index) {
      // 查找映射表
      const findItem = baseApi.question.find((item) => item.id === cellValue);
      return findItem ? findItem.value : "未知";
    },
    // 删除功能
    async removeDanger(row) {
      console.log(row);
      try {
        // 点击把Id传过来
        await removeRandoms(row);
        await this.$confirm("确认删除该角色吗");
        // 调用数据
        this.createAPI();
        this.$message.success("删除成功");
      } catch (e) {
        console.log(e);
      }
    },
    // 搜索功能
    async onSearch() {
      this.isLoading = true;
      const { data } = await randoms({
        page: 1,
        pagesize: 10,
        // 把值给到输入框
        keyword: this.keyword,
      });
      this.isLoading = false;
      // console.log(res);
      this.page = 1;
      // 重新渲染页面
      this.PleaseList = data.items;
      
    },
    // 点击题库
    async onQuestionIDs(id) {
      console.log(id);
      this.Answer = true;
      const res = await detail(id);
      // console.log(res.data);
      this.list = res.data;
    },
  },
};
</script>

<style scoped lang="less">
.el-card.is-always-shadow {
  margin: 0 30px 0 10px;
}
.questionIDs {
  color: #73a6ff;
  cursor: pointer;
}
.pagination {
  margin-top: 20px;
}
</style>
