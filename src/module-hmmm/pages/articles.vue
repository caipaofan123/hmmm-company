<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-form ref="form" :model="headForm" label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="关键字" prop="keyword">
                <el-input
                  placeholder="根据文章标题搜索"
                  v-model="headForm.keyword"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态" prop="state">
                <el-select
                  placeholder="请选择"
                  v-model="headForm.state"
                  @focus="selFocus"
                >
                  <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="item in status"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="padding-left: 40px">
              <el-button @click="clearBtn">清除</el-button>
              <el-button type="primary" @click="findBtn">搜索</el-button>
            </el-col>
            <el-col :span="6" style="text-align: right">
              <el-button type="success" icon="el-icon-edit">新增技巧</el-button>
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
        >
          <el-table-column
            prop="date"
            type="index"
            label="序号"
            width="80"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="文章标题"
            width="400"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="visits"
            label="阅读数"
            width="295"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="username"
            label="录入人"
            width="294"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="录入时间"
            width="294"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="cnState"
            label="状态"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            width="198"
            align="center"
          >
            <template slot-scope="scope">
              <el-button size="medium" type="text" @click="previewBtn(scope)"
                >预览</el-button
              >
              <el-button
                size="medium"
                v-if="(scope.row.state = 1)"
                type="text"
                @click="changeState(scope)"
                >启用</el-button
              >
              <el-button
                size="medium"
                v-else
                type="text"
                @click="changeState(scope)"
                >禁用</el-button
              >
              <el-button size="medium" type="text" disabled>修改</el-button>
              <el-button size="medium" type="text" disabled>删除</el-button>
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
      <el-dialog title="预览文章" :visible.sync="previewDialog" width="50%">
        <div>
          <div class="title">
            <h2>{{ title }}</h2>
            <div>
              <span>{{ createTime }}</span>
              <span>{{ username }}</span>
              <span class="el-icon-view"></span>
              <span>{{ visits }}</span>
            </div>
          </div>
          <div class="content" v-html="articleBody"></div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { profile } from "@/api/base/frame";
import { listApi, changeStateApi } from "@/api/hmmm/articles";
import { status } from "@/api/hmmm/constants";
export default {
  data() {
    return {
      recordNum: 10,
      page: 1,
      pagesize: 10,
      tableData: [],
      headForm: {
        keyword: null,
        state: null,
      },
      status: [],

      previewDialog: false,
      title: "",
      visits: "",
      username: "",
      createTime: "",
      articleBody: "",
    };
  },
  created() {
    this.list();
  },
  methods: {
    async list() {
      const res = await listApi();
      console.log(res);
      res.data.items.forEach((item) => {
        if (item.state === 1) {
          return (item.cnState = "已启用");
        } else {
          return (item.cnState = "已禁用");
        }
      });
      console.log(res.data.items);
      this.tableData = res.data.items;
      this.recordNum = res.data.counts;
    },
    async clearBtn() {
      this.$refs.form.resetFields();
      const res = await listApi();
      this.tableData = res.data.items;
      this.recordNum = res.data.counts;
    },
    selFocus() {
      this.status = status;
    },
    async findBtn() {
      const data = {
        keyword: this.headForm.keyword,
        state: this.headForm.state,
        page: this.page,
        pagesize: this.pagesize,
      };
      const res = await listApi(data);
      console.log(res);
      this.tableData = res.data.items;
      this.recordNum = res.data.counts;
    },
    previewBtn(scope) {
      this.previewDialog = true;
      this.title = scope.row.title;
      this.createTime = scope.row.createTime;
      this.username = scope.row.username;
      this.visits = scope.row.visits;
      this.articleBody = scope.row.articleBody;
    },
    async changeState(scope) {
      const data = {
        id: scope.row.id,
        state: scope.row.state,
      };
      const {
        data: { success },
      } = await changeStateApi(data);
      console.log(success);
      if (success) {
        if (scope.row.state === 1) {
          scope.row.state = 0;
          scope.row.cnState = "已禁用";
        } else {
          scope.row.state = 1;
          scope.row.cnState = "已启用";
        }
        this.$message({
          message: "操作成功",
          type: "success",
        });
      } else {
        this.$message.error("操作失败");
      }
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
.title h2 {
  padding: 0;
  margin: 0;
}
.title span {
  margin-left: 10px;
  margin-top: 10px;
}
.content {
  background: #f5f5f5;
  padding: 10px;
}
</style>
