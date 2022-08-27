<template>
  <div class="container">
    <el-card class="box-card">
      <div class="title">
        <el-row type="flex">
          <el-col>
            <div class="text">说明：目前支持学科和关键字条件筛选</div>
          </el-col>

          <el-col>
            <el-row justify="end" type="flex">
              <el-button
                type="success"
                icon="el-icon-edit"
                @click="$router.push('/questions/new')"
                >新增试题</el-button
              >
            </el-row>
          </el-col>
        </el-row>
      </div>

      <!-- 输入框 -->

      <el-form :inline="true" label="right">
        <el-form-item label="学科" class="subjectID">
          <el-select
            v-model="formBase.subjectID"
            @change="subjectChange"
            placeholder="请选择"
            @keyup.enter="handleFilter"
            filterable
          >
            <el-option
              v-for="item in subject"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级目录">
          <el-select
            @keyup.enter="handleFilter"
            v-model="formBase.catalogID"
            placeholder="请选择"
            filterable
          >
            <el-option
              v-for="item in catalogue"
              :key="item.value"
              :label="item.label"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标签">
          <el-select
            @keyup.enter="handleFilter"
            v-model="formBase.tags"
            placeholder="请选择"
            filterable
          >
            <el-option
              v-for="item in tags"
              :key="item.value"
              :label="item.label"
              value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="关键字">
          <el-input
            v-model.trim="formBase.keyword"
            style="width: 220px"
            placeholder="根据题干搜索"
          ></el-input>
        </el-form-item>

        <el-form-item label="试题类型">
          <el-select v-model="formBase.questionType" placeholder="请选择">
            <el-option
              v-for="item in questionType"
              :key="item.value"
              :label="item.label"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="难度" style="margin-left: 30px">
          <el-select v-model="formBase.difficulty" placeholder="请选择">
            <el-option
              v-for="item in Harddifficulty"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="方向">
          <el-select v-model="formBase.direction" placeholder="请选择">
            <el-option
              v-for="(item, index) in direction"
              :key="index"
              :label="item"
              value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="录入人">
          <el-select v-model.trim="formBase.creatorID" placeholder="请选择">
            <el-option
              v-for="item in userName"
              :key="item.id"
              :label="item.username"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="题目备注">
          <el-input
            v-model="formBase.remarks"
            style="width: 220px"
            placeholder="你好小仙女~张羽"
          ></el-input>
        </el-form-item>

        <el-form-item label="企业简称">
          <el-input
            v-model="formBase.shortName"
            style="width: 220px"
            placeholder="你好小仙女~张羽"
          ></el-input>
        </el-form-item>

        <el-form-item label="城市" prop="province">
          <el-select
            class="filter-item"
            style="width: 130px"
            v-model="formBase.province"
            @keyup.enter="handleFilter"
            @change="handleProvince"
            filterable
          >
            <el-option
              v-for="item in citySelect.province"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <el-select
            class="filter-item"
            style="width: 130px"
            v-model="formBase.city"
            @keyup.enter="handleFilter"
            filterable
          >
            <el-option
              v-for="item in citySelect.cityDate"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <template class="formButton">
          <el-button
            size="small"
            class=""
            @click="eliminate"
            style="margin-left: 100px"
            >清除</el-button
          >
          <el-button
            :disabled="!isloading"
            size="small"
            type="primary"
            @click="onSearch"
            >搜索</el-button
          >
        </template>
      </el-form>
      <!-- 禁用 -->
      <el-alert type="info" show-icon title="" :closable="false" class="alert">
        <template slot="title">
          <span>数据一共 {{ counts }} 条</span>
        </template>
      </el-alert>
      <!-- 表格 -->
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="number" label="试题编号" width="120">
          </el-table-column>
          <el-table-column prop="subject" label="学科" width="100">
          </el-table-column>
          <el-table-column prop="catalog" label="目录" width="100">
          </el-table-column>
          <el-table-column
            prop="questionType"
            :formatter="question"
            label="题型"
            width="100"
          >
          </el-table-column>
          <el-table-column prop="question" label="题干" width="180">
            <template slot-scope="{ row }">
              <span v-html="row.question"></span>
            </template>
          </el-table-column>
          <el-table-column prop="addDate" label="录入时间" width="180">
            <template slot-scope="{ row }"
              >{{ row.addDate | parseTimeByString }}
            </template>
          </el-table-column>
          <el-table-column
            prop="difficulty"
            :formatter="difficulty"
            label="难度"
            width="100"
          >
          </el-table-column>
          <el-table-column prop="creator" label="录入人" width="100">
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="{ row }">
              <el-button
                @click="onQuestionIDs(row)"
                type="primary"
                icon="el-icon-view"
                plain
                circle
              ></el-button>
              <el-button
                @click="updateSuccess(row)"
                type="success"
                icon="el-icon-edit"
                plain
                circle
              ></el-button>

              <el-button
                type="danger"
                icon="el-icon-delete"
                plain
                circle
                @click="removeDanger(row)"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-check"
                plain
                circle
                @click="affiliate(row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next ,sizes,jumper"
        :page-size="pagesize"
        :page-sizes="[5, 10, 20, 30]"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>
      <Questions :visible.sync="Answer" :list="list"></Questions>
    </el-card>
  </div>
</template>

<script>
import { list, detail, remove } from "@/api/hmmm/questions";
import baseApi from "@/api/base/baseApi";
import { simple } from "@/api/hmmm/subjects"; //目录
import { simple as simpledirectorys } from "@/api/hmmm/directorys"; //二级标题
import { simple as simpletags } from "@/api/hmmm/tags";
import Questions from "@/components/questions";
import {
  direction,
  difficulty as Harddifficulty,
  questionType,
} from "@/api/hmmm/constants";
import { provinces, citys } from "@/api/hmmm/citys.js"; //城市列表
import { simple as usersimple } from "@/api/base/users";
import { choiceAdd, update } from "@/api/hmmm/questions";

export default {
  name: "questions",
  data() {
    return {
      tableData: [],
      formBase: {
        subjectID: "", //学科
        catalogID: "", //目录
        tags: "", //标签
        questionType: "", //试题类型
        difficulty: "", //难度
        direction: "", //方向
        creatorID: "", //录入人
        remarks: "", //题目备注
        shortName: "", //企业简称
        city: "", //城市
        province: "", //区名
        // direction: [],
        keyword: "",
      },
      counts: "",
      // 条数
      pagesize: 5,
      total: 0, //当前页码
      page: 1, //当前页面
      Answer: false,
      list: {},
      direction, //方向
      Harddifficulty, //难度
      questionType, //试题类型
      subject: [], //学科数据
      catalogue: [], //二级目录
      tags: [],
      // 城市列表
      citySelect: {
        province: [],
        cityDate: [],
      },
      userName: [],
      choiceState: 1,
      isloading: true,
    };
  },
  components: {
    Questions,
  },
  created() {
    this.questionBank();
    this.simple(); //学科
    // this.simpledirectorys(); //二级目录
    // this.simpletags(); //标签
    this.getCityData(); //城市列表
    this.usersimple(); //录入人
  },
  methods: {
    async questionBank() {
      const { data } = await list({
        page: this.page, //每页多少条
        pagesize: this.pagesize, //页码
      });

      this.tableData = data.items;

      this.counts = data.counts;
      this.total = data.counts;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.questionBank();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.questionBank();
    },
    // 用表格里的formatter方法
    question(row, column, cellValue, index) {
      // 查找映射表
      const findItem = baseApi.question.find((item) => item.id === cellValue);
      return findItem ? findItem.value : "未知";
    },
    // 题型难度
    difficulty(row, column, cellValue, index) {
      return { 1: "简单", 2: "一般", 3: "困难" }[cellValue];
    },
    // 点击题库
    async onQuestionIDs(id) {
      console.log(id);
      this.Answer = true;
      const res = await detail(id);
      // console.log(res.data);
      this.list = res.data;
    },

    //学科
    async simple() {
      const res = await simple();
      // console.log(res);
      this.subject = res.data;
    },
    // 二级目录
    async subjectChange(e) {
      console.log(e);
      const { data } = await simpledirectorys({ subjectID: e });
      this.catalogue = data;
      // 把获取数据的值赋值给绑定的输入框v-model里的值
      this.formBase.catalogID = this.catalogue[0]
        ? this.catalogue[0].label
        : "";
      // console.log(data);
      // 标签
      const res = await simpletags({ subjectID: e });
      this.tags = res.data;
      this.formBase.tags = this.tags[0] ? this.tags[0].label : "";
      console.log(this.tags[0]);
    },
    // 获取省
    getCityData() {
      this.citySelect.province = provinces();
    },
    // 选省获取到市
    handleProvince: function (e) {
      this.citySelect.cityDate = citys(e);
      this.formBase.city = this.citySelect.cityDate[0];
    },
    // 获取录入人
    async usersimple() {
      const res = await usersimple();
      console.log(res);
      this.userName = res.data;
    },
    // 清除
    eliminate() {
      this.formBase.difficulty = "";
      this.formBase.questionType = "";
      this.formBase.direction = "";
      this.formBase.province = "";
      this.formBase.cityDate = "";
      this.formBase.subjects = "";
      this.formBase.tags = "";
      this.formBase.user = "";
      this.formBase.keyword = "";
      this.formBase.remarks = "";
      this.formBase.abbreviation = "";
      this.formBase.subjectID = ""; //学科
      this.formBase.catalogID = "";
      this.formBase.city = "";
    },
    // 搜索
    async onSearch() {
      this.isloading = false;
      console.log(1);
      const { data } = await list({ keyword: this.formBase.keyword });
      console.log(data);
      this.tableData = data.items;
      this.isloading = true;
    },
    async removeDanger(row) {
      await remove(row);
      await this.$confirm("确认删除该角色吗");
      this.questionBank();
      this.$message.success("删除成功");
    },
    async affiliate(id) {
      // console.log(id);
      // 点击传入id
      await choiceAdd({
        choiceState: this.choiceState, //是否加入经选 1 加入 0 取消
        id,
      });
      await this.$confirm("此操作将该题目加入精选,是否继续?"); //弹框
      this.questionBank(); //调用页面接口
      this.$message.success("加入精选成功"); //成功提示
    },
    // 修改题库
    async updateSuccess(row) {
      // // console.log(id);
      // await update(row);
      this.$router.push({
        path: "/questions/new",
        name: "questions-new",
        query: {
          id: row.id,
        },
      });
    },
  },
};
</script>

<style scoped lang="less">
.el-card.is-always-shadow {
  margin: 0 30px 0 10px;
}
.title {
  margin-bottom: 25px;
}
.text {
  color: #ffc5da;
  font-size: 16px;
}
.formButton {
  width: 290px;
  padding-left: 30px;
}

.alert {
  margin-bottom: 20px;
  height: 40px;
  font-size: 18px;
}
.subjectID {
  margin-left: 25px;
}
</style>
