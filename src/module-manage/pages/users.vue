<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-row type="flex" justify="start" class="top">
        <el-col class="left">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-input v-model="input" placeholder="根据用户名搜索"></el-input>
            </el-col>
            <el-col :span="12">
              <el-button>清空</el-button>
              <el-button type="primary">搜索</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col>
          <el-row type="flex" justify="end">
            <el-button type="success">
              <i class="el-icon-edit"></i>
              <span>新增用户</span>
            </el-button>
          </el-row>
        </el-col>
      </el-row>
      <el-alert
        title="共6条记录"
        type="info"
        show-icon
        :closable="false"
        class="alert"
      >
      </el-alert>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="number" label="序号"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="tel" label="联系电话"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="permissions" label="权限组名称">
        </el-table-column>
        <el-table-column prop="role" label="角色"> </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template>
            <el-button class="edit" icon="el-icon-edit" circle></el-button>
            <el-button class="delete" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <PageTool></PageTool>
    </el-card>
  </div>
</template>

<script>
import PageTool from "../components/page-tool.vue";
export default {
  data() {
    return {
      input: "",
      tableData: [
        {
          number: "2016-05-02",
          email: "王小虎",
          tel: "上海市普陀区金沙江路 1518 弄",
          username: "2016-05-02",
          permissions: "王小虎",
          role: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  components: {
    PageTool,
  },
  created() {},

  methods: {},
};
</script>

<style scoped lang="less">
.left {
  display: flex;
}
.top {
  margin-bottom: 20px;
}
.alert {
  margin-bottom: 20px;
}
.el-table {
  margin-bottom: 20px;
  .edit {
    color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
  }
  .delete {
    color: #f56c6c;
    background: #fef0f0;
    border-color: #fbc4c4;
  }
}
</style>
