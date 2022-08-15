<template>
  <div class="container">
    <el-card class="box-card">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="关键字">
          <el-input placeholder="根据编码搜索"></el-input>
        </el-form-item>
        <template class="button">
          <el-button class="btn" size="small">默认按钮</el-button>
          <el-button class="btn1" type="primary" size="small"
            >主要按钮</el-button
          >
        </template>
      </el-form>
      <!-- 禁用 -->
      <el-alert title="数据一共条" type="info" show-icon :closable="false">
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
        <el-table-column label="题目编号">
          <template slot-scope="{ row }">
            {{ row.questionIDs }}
          </template>
        </el-table-column>
        <el-table-column prop="addTime" label="录入时间"> </el-table-column>
        <el-table-column prop="totalSeconds" label="答题时间(s)">
        </el-table-column>
        <el-table-column prop="accuracyRate" label="正确率(%)" width="100px">
        </el-table-column>
        <el-table-column prop="userName" label="录入人" width="100px">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { randoms } from "@/api/hmmm/questions";
import baseApi from "@/api/base/baseApi";
export default {
  data() {
    return {
      PleaseList: [],
    };
  },
  created() {
    this.createAPI();
  },
  methods: {
    async createAPI() {
      const res = await randoms();

      this.PleaseList = res.data.items;

      console.log(this.PleaseList);
    },
    // 用表格里的formatter方法
    question(row, column, cellValue, index) {
      // 查找映射表
      const findItem = baseApi.question.find((item) => item.id === cellValue);
      return findItem ? findItem.value : "未知";
    },
  },
};
</script>

<style scoped lang="less">
.el-card.is-always-shadow {
  margin: 0 30px 0 10px;
}
// .container {
//   .demo-form-inline {
//     display: flex;
//     justify-content: space-between;
//   }
// }
.button {
  position: relative;
  padding-top: 20px;
}
.btn {
  position: absolute;
  top: 20;
  right: 53px;
}
.btn1 {
  position: absolute;
  top: 20;
  right: 150px;
}
</style>
