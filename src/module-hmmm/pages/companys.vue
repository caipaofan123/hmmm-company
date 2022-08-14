<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="标签名称">
                <el-input placeholder="请输入" v-model="form.tags"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="城市">
                <el-select placeholder="请选择" v-model="form.city">
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="地区">
                <el-select placeholder="请选择" v-model="form.province">
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="企业简称">
                <el-input
                  placeholder="请输入"
                  v-model="form.shortName"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态">
                <el-select placeholder="请选择" v-model="form.state">
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="padding-left: 40px">
              <el-button>清除</el-button>
              <el-button type="primary">搜索</el-button>
            </el-col>
            <el-col :span="12" style="text-align: right">
              <el-button type="success" icon="el-icon-edit">新增用户</el-button>
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
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{ background: '#fafafa' }"
          :cell-style="rowStyle"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
        >
          <el-table-column
            prop="date"
            type="index"
            label="序号"
            width="187"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="企业编号"
            width="182"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="企业简称"
            width="182"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="标签"
            width="182"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="创建者"
            width="182"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="创建日期"
            width="182"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="备注"
            width="182"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="状态"
            width="182"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  class="primaryBtn"
                ></el-button>
              </el-button>
              <el-button type="text" size="small">
                <el-button
                  type="success"
                  icon="el-icon-check"
                  circle
                  class="successBtn"
                ></el-button>
              </el-button>
              <el-button type="text" size="small">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  class="dangerBtn"
                ></el-button>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :page-sizes="[10, 20, 30, 50]"
          :page-size="100"
          :total="300"
          background
          layout=" ->,prev, pager, next,sizes, jumper"
          style="margin-top: 10px"
        >
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        page: "",
        pagesize: "",
        tags: "",
        city: "",
        province: "",
        shortName: "",
        state: "",
      },
      recordNum: 10,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },

  created() {},

  methods: {
    rowStyle() {
      return "text-align:center";
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
