<template>
  <div class="container">
    陈彬
    <pannel>
      <headerya text="新增学科" @search="search" @clear="clear" @add="add">
        <template #input1>
          <el-form-item label="学科名称">
            <el-input v-model.trim="pages.subjectName"></el-input>
          </el-form-item>
        </template>
      </headerya>
      <notice :num="total"></notice>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序號"> </el-table-column>
        <el-table-column prop="subjectName" label="學科名稱"> </el-table-column>
        <el-table-column prop="username" label="創建者"> </el-table-column>
        <el-table-column
          prop="addDate"
          label="創建日期"
          :formatter="dayFormatter"
        >
        </el-table-column>
        <el-table-column
          prop="isFrontDisplay"
          label="前台是否顯示"
          :formatter="isFrontFormatter"
        >
        </el-table-column>
        <el-table-column prop="twoLevelDirectory" label="二級目錄">
        </el-table-column>
        <el-table-column prop="tags" label="標籤"> </el-table-column>
        <el-table-column prop="totals" label="題目數量"> </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <a
              @click="handleTypes(scope.$index, scope.row)"
              style="color: skyblue"
              >學科分類</a
            >&nbsp;
            <a
              @click="handleTags(scope.$index, scope.row)"
              style="color: skyblue"
              >學科標籤</a
            >&nbsp;
            <a
              @click="handleEdit(scope.$index, scope.row)"
              style="color: skyblue"
              >修改</a
            >&nbsp;
            <a
              @click="handleDelete(scope.$index, scope.row)"
              style="color: skyblue"
              >删除</a
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 8, 10, 20]"
        :page-size="pages.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </pannel>
    <addSubjects
      ref="add"
      :dialogVisible.sync="dialogVisible"
      @close="onClose"
      :editdata="editdata"
      :isEdit="isEdit"
    ></addSubjects>
  </div>
</template>

<script>
import pannel from "@/common/pannel";
import headerya from "@/common/header";
import notice from "@/common/notice";
import { list, update, remove } from "@/api/hmmm/subjects";
import dayjs from "dayjs";
import addSubjects from "../components/subjects-add.vue";

export default {
  components: {
    pannel,
    headerya,
    notice,
    addSubjects,
  },
  data() {
    return {
      tableData: [],
      total: 0,
      pages: {
        page: 1,
        pagesize: 10,
        subjectName: "",
      },
      dialogVisible: false,
      editdata: {},
      isEdit: false,
      isTake:false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const {
        data: { counts, items, pagesize },
      } = await list(this.pages);
      this.tableData = items;
      console.log(items);
      this.total = counts;
      this.pages.pagesize = pagesize;
    },
    isFrontFormatter(row, column, cellValue, index) {
      if (row.isFrontDisplay === 0) {
        return "否";
      } else {
        return "是";
      }
    },
    dayFormatter(row, column, cellValue, index) {
      return dayjs(row.addDate).format("YYYY-MM-DD HH:mm:ss");
    },
    handleSizeChange(val) {
      this.pages.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pages.page = val;
      this.getList();
    },
    search() {
      this.pages.page = 1;
      this.getList();
    },
    clear() {
      this.pages.subjectName = "";
    },
    add() {
      this.dialogVisible = true;
      this.$refs.add.form.subjectName = "";
      this.$refs.add.form.isFrontDisplay = 1;
    },
    onClose() {
      this.dialogVisible = false;
      this.isEdit = false;
    },
    handleEdit(index, data) {
      this.isEdit = true;
      this.editdata = data;
      this.dialogVisible = true;
      this.$refs.add.form.subjectName = data.subjectName;
      this.$refs.add.form.isFrontDisplay = data.isFrontDisplay;
    },
    async handleDelete(index, data) {
      await remove(data);
      this.getList();
    },
    handleTypes(index, data) {
      this.isTake=true
      this.$router.push({
        name: 'subjects-directorys',
        params: {
          data,
          isTake:this.isTake
        },
      });
    },
    handleTags(index, data){
      this.isTake=true
      this.$router.push({
        name: 'subjects-tags',
        params: {
          data,
          isTake:this.isTake
        },
      });
    }
  },
};
</script>

<style scoped>
.el-input {
  width: 190px;
}
</style>
