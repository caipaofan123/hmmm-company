<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="标签名称" prop="tags">
                <el-input placeholder="请输入" v-model="form.tags"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="城市" prop="province">
                <el-select
                  placeholder="请选择"
                  v-model="form.province"
                  @change="handleProvince"
                >
                  <el-option
                    :label="item"
                    :value="item"
                    v-for="item in citySelect.province"
                    :key="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="地区" prop="city">
                <el-select placeholder="请选择" v-model="form.city">
                  <el-option
                    :label="item"
                    :value="item"
                    v-for="item in citySelect.cityDate"
                    :key="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="企业简称" prop="shortName">
                <el-input
                  placeholder="请输入"
                  v-model="form.shortName"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="状态"
                prop="state"
                :formatter="stateFormatter"
              >
                <el-select
                  placeholder="请选择"
                  v-model="form.state"
                  @visible-change="visChange"
                >
                  <el-option
                    v-for="item in status"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="padding-left: 40px">
              <el-button @click="clearForm">清除</el-button>
              <el-button type="primary" @click="searchBtn">搜索</el-button>
            </el-col>
            <el-col :span="12" style="text-align: right">
              <el-button type="success" icon="el-icon-edit" @click="addBtn"
                >新增用户</el-button
              >
            </el-col>
          </el-row>
        </el-form>
        <el-alert
          :title="`共${recordNum}条记录`"
          type="info"
          show-icon
          :closable="false"
          style="margin-bottom: 20px"
        >
        </el-alert>
        <el-table
          :data="listArr"
          style="width: 100%"
          :header-cell-style="{ background: '#fafafa' }"
          :cell-style="rowStyle"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
        >
          <el-table-column prop="id" label="序号" width="187" align="center">
          </el-table-column>
          <el-table-column
            prop="number"
            label="企业编号"
            width="182"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="shortName"
            label="企业简称"
            width="182"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="tags" label="标签" width="182" align="center">
          </el-table-column>
          <el-table-column
            prop="creatorID"
            label="创建者"
            width="182"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="addDate"
            label="创建日期"
            width="182"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="备注"
            width="182"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="cnState"
            label="状态"
            width="182"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" width="180" align="center" prop="state">
            <template slot-scope="scope">
              <el-button type="text" size="small">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  class="primaryBtn"
                  @click="editBtn(scope)"
                ></el-button>
              </el-button>
              <el-button type="text" size="small" v-if="scope.row.state === 1">
                <el-button
                  type="success"
                  icon="el-icon-check"
                  circle
                  class="successBtn"
                  @click="useBtn(scope)"
                ></el-button>
              </el-button>
              <el-button type="text" size="small" v-else>
                <el-button
                  type="success"
                  icon="el-icon-close"
                  circle
                  class="successBtn"
                  @click="useBtn(scope)"
                ></el-button>
              </el-button>
              <el-button type="text" size="small">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  class="dangerBtn"
                  @click="removeBtn(scope)"
                ></el-button>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :page-sizes="[10, 20, 30, 50]"
          :page-size="100"
          @current-change="handleCurrentChange"
          @prev-click="handlePreClick"
          @next-click="handleNextClick"
          @size-change="handleSizeChange"
          :total="recordNum"
          background
          layout=" ->,prev, pager, next,sizes, jumper"
          style="margin-top: 10px"
        >
        </el-pagination>
      </el-card>
      <companysAdd
        ref="add"
        :titleInfo="titleInfoData"
        :formBase="formBase"
        @newDataes="newDataes"
      ></companysAdd>
    </div>
  </div>
</template>

<script>
import { listApi, removeApi, disabledApi } from "@/api/hmmm/companys";
import { status, statusNum } from "@/api/hmmm/constants";
import companysAdd from "../components/companys-add.vue";
import { provinces, citys } from "@/api/hmmm/citys.js";
export default {
  data() {
    return {
      loading: false,
      status: [],
      form: {
        page: 1,
        pagesize: 10,
        tags: null,
        city: null,
        province: null,
        shortName: null,
        state: null,
      },
      rules: {
        tags: [{ required: true, message: "请输入标签名称", trigger: "blur" }],
        province: [
          { required: true, message: "请选择城市", trigger: "change" },
        ],
        city: [
          {
            required: true,
            message: "请选择地区",
            trigger: "change",
          },
        ],
        shortName: [
          {
            required: true,
            message: "请输入企业简称",
            trigger: "blur",
          },
        ],
        state: [
          {
            required: true,
            message: "请选择状态",
            trigger: "blur",
          },
        ],
      },
      citySelect: {
        province: [],
        cityDate: [],
      },
      recordNum: 10,
      listArr: [],

      showCreateUserDialog: false,
      cityDatas: [],
      firstCity: [],
      titleInfoData: {
        text: "创建用户",
        pageTitle: "",
      },
      formBase: {
        shortName: null,
        isFamous: null,
        company: null,
        province: null,
        city: null,
        tags: null,
        remarks: null,
      },
      btnIcon: "",
    };
  },
  components: { companysAdd },
  created() {
    this.list();
    this.getCityData();
  },
  methods: {
    rowStyle() {
      return "text-align:center";
    },
    async list() {
      const data = {
        page: this.form.page,
        pagesize: this.form.pagesize,
      };
      const {
        data: { counts, items, page, pages },
      } = await listApi(data);

      console.log(items);

      items.forEach((item) => {
        if (item.state == 1) {
          item.cnState = "启用";
        } else {
          item.cnState = "禁用";
        }
      });
      this.listArr = items;
      console.log(this.listArr);
      this.recordNum = counts;
    },
    stateFormatter(row, column) {
      return console.log(row, column);
    },
    getCityData() {
      this.citySelect.province = provinces();
    }, // 获取省
    handleProvince(e) {
      console.log(e);
      this.citySelect.cityDate = citys(e);
      this.form.city = this.citySelect.cityDate[0];
    },
    visChange() {
      this.status = status;
    },
    clearForm() {
      this.$refs.form.resetFields();
    },
    addBtn() {
      this.$refs.add.dialogFormVisible = true;
      this.$refs.add.resetFields();
    },
    async searchBtn() {
      console.log(this.form);
      const {
        data: { counts, items, page, pages },
      } = await listApi(this.form);
      items.forEach((item) => {
        if (item.state == 1) {
          item.cnState = "启用";
        } else {
          item.cnState = "禁用";
        }
      });
      this.listArr = items;
      console.log(this.listArr.state);
      this.recordNum = counts;
    },
    newDataes(val) {
      this.list();
      this.listArr.unshift(val);
      this.formBase = val;
    },
    editBtn(scope) {
      console.log(scope);
      this.$refs.add.dialogFormVisible = true;
      delete scope.row.username;
      if (scope.row.isFamous === 0) {
        scope.row.isFamous = false;
      } else {
        scope.row.isFamous = true;
      }
      this.formBase = scope.row;
      console.log(this.formBase);
      this.titleInfoData.text = "编辑用户";
    },
    useBtn(scope) {
      {
        this.$confirm(`已成功${scope.row.cnState}, 是否继续?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            const data = {
              id: scope.row.id,
              state: this.listArr.state,
            };
            scope.row.state ? (scope.row.state = 0) : (scope.row.state = 1);
            const res = await disabledApi(data);
            console.log(res);
            this.$message({
              type: "success",
              message: `已成功${scope.row.cnState}!`,
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作",
            });
          });
      }
    },
    async removeBtn(scope) {
      this.$confirm("此操作将永久删用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          await removeApi({ id: scope.row.id });
          this.list();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      console.log(scope);
    },
    handleCurrentChange(page) {
      this.form.page = page;
      this.list();
    }, //分页变化
    handlePreClick(page) {
      this.form.page = page;
      this.list();
    },
    handleNextClick(page) {
      this.form.page = page;
      this.list();
    },
    handleSizeChange(size) {
      this.form.pagesize = size;
      this.list();
    },
  },
};
</script>

<style scoped lang="less">
/deep/.el-select {
  width: 100%;
}
.primaryBtn {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
}
.successBtn {
  color: #67c23a;
  background: #f0f9eb;
  border-color: #c2e7b0;
}

.dangerBtn {
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;
}
</style>
