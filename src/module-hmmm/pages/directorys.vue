<template>
  <div class="container">
    陈彬
    <pannel>
      <headerya text="新增目录" @search="search" @clear="clear" @add="add">
        <template #input1>
          <el-form-item label="目录名称">
            <el-input v-model.trim="pages.directoryName"></el-input>
          </el-form-item>
        </template>
        <template #input2>
          <el-form-item label="状态">
            <el-select v-model="statevalue" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </template>
      </headerya>
      <notice :num="total"></notice>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序號"> </el-table-column>
        <el-table-column prop="subjectName" label="所屬學科"> </el-table-column>
        <el-table-column prop="directoryName" label="目錄名稱">
        </el-table-column>
        <el-table-column prop="username" label="創建者"> </el-table-column>
        <el-table-column
          prop="addDate"
          label="創建日期"
          :formatter="dayFormatter"
        >
        </el-table-column>

        <el-table-column prop="totals" label="面試題數量"> </el-table-column>
        <el-table-column prop="state" label="狀態" :formatter="stateFormatter">
        </el-table-column>

        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <a
              @click="handleState(scope.$index, scope.row)"
              style="color: skyblue"
              >{{ scope.row.state ? "禁用" : "启用" }}</a
            >&nbsp;
            <a
              @click="handleEdit(scope.$index, scope.row)"
              style="color: blueviolet"
              :class="{noclick:scope.row.state}"
              >修改</a
            >&nbsp;
            <a
              @click="handleDelete(scope.$index, scope.row)"
              style="color: blueviolet"
              :class="{noclick:scope.row.state}"
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
    <addDirectorys
      ref="add"
      :dialogVisible.sync="dialogVisible"
      @close="onClose"
      :editdata="editdata"
      :isEdit="isEdit"
    ></addDirectorys>
  </div>
</template>

<script>
import pannel from "@/common/pannel";
import headerya from "@/common/header";
import notice from "@/common/notice";
import {
  list,
  update,
  remove,
  directorysList,
  removedirectorys,
  updatedirectorysstate
} from "@/api/hmmm/subjects";
import dayjs from "dayjs";
import addDirectorys from "../components/directorys-add.vue";

export default {
  components: {
    pannel,
    headerya,
    notice,
    addDirectorys,
  },
  data() {
    return {
      options: [
        {
          value: 1,
          label: "启用",
        },
        {
          value: 0,
          label: "禁用",
        },
      ],
      tableData: [],
      total: 0,
      pages: {
        page: 1,
        pagesize: 10,
        subjectID: null,
        directoryName: null,
        state: null,
      },
      dialogVisible: false,
      editdata: {},
      isEdit: false,
      statevalue: null,
      
    };
  },
  created() {
    this.directorysList();
  },
  methods: {
    async directorysList() {
      if (this.$route.params.isTake) {
        this.pages.subjectID=this.$route.params.data.id
      }
      const {
        data: { counts, items, pagesize },
      } = await directorysList(this.pages);
      // const res=await directorysList()
      // console.log(res);
      this.tableData = items;
      console.log(items);
      this.total = counts;
      this.pages.pagesize = pagesize;
      this.$route.params.isTake=false
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
    stateFormatter(row, column, cellValue, index) {
      if (row.state === 1) {
        return "已启用";
      } else {
        return "已禁用";
      }
    },
    handleSizeChange(val) {
      this.pages.pagesize = val;
      this.directorysList();
    },
    handleCurrentChange(val) {
      this.pages.page = val;
      this.directorysList();
    },
    search() {
      this.pages.page = 1;
      this.pages.state = this.statevalue;
      this.directorysList();
    },
    clear() {
      this.pages.directoryName = "";
      this.statevalue = null;
    },
    add() {
      this.dialogVisible = true;
      this.$refs.add.form.subjectID = "";
      this.$refs.add.form.directoryName = '';
    },
    onClose() {
      this.dialogVisible = false;
      this.isEdit = false;
    },
    handleEdit(index, data) {
      this.isEdit = true;
      this.editdata = data;
      console.log(data);
      this.dialogVisible = true;
      this.$refs.add.form.subjectID = data.subjectID;
      this.$refs.add.form.directoryName = data.directoryName;
    },
    async handleDelete(index, data) {
      await removedirectorys(data);
      this.directorysList();
    },
    async handleState(index, data){
      if (data.state===1) {
        data.state=0
      }else{
        data.state=1
      }
      await updatedirectorysstate(data)
      this.directorysList();

    }
  },
};
</script>

<style scoped>
.el-input {
  width: 190px;
}
.noclick {
  pointer-events: none;
  color: skyblue !important;
}
</style>
