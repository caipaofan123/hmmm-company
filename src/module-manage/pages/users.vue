<template>
  <div class="app-container">
    <el-card
      class="box-card"
      v-loading="loading"
      element-loading-text="请给我一点时间"
    >
      <el-row type="flex" justify="start" class="top">
        <el-col class="left">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-input v-model="input" placeholder="根据用户名搜索"></el-input>
            </el-col>
            <el-col :span="12">
              <el-button @click="clean">清空</el-button>
              <el-button @click="search" type="primary">搜索</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col>
          <el-row type="flex" justify="end">
            <el-button type="success" @click="onAdduser">
              <i class="el-icon-edit"></i>
              <span>新增用户</span>
            </el-button>
          </el-row>
        </el-col>
      </el-row>
      <el-alert type="info" show-icon :closable="false" class="alert">
        <p>共{{ total }}条记录</p>
      </el-alert>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="phone" label="联系电话"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="permission_group_title" label="权限组名称">
        </el-table-column>
        <el-table-column prop="role" label="角色"> </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="{ row }">
            <el-button class="edit" icon="el-icon-edit" circle></el-button>
            <el-button
              class="delete"
              icon="el-icon-delete"
              circle
              @click="del(row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <PageTool
        :total="total"
        :paginationPage="page"
        :paginationPagesize="pagesize"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
      ></PageTool>
    </el-card>
    <menuadd ref="menuadd" :text="text" :pageTitle="pageTitle" />
  </div>
</template>

<script>
import menuadd from "../components/menu-add.vue";
import PageTool from "../components/page-tool.vue";
import { list, remove } from "@/api/base/users.js";
export default {
  data() {
    return {
      input: "",
      tableData: [],
      total: 0,
      page: 1,
      pagesize: 10,
      keyword: null,
      text: "创建用户",
      pageTitle: "",
      PermissionGroupsList: {},
      loading: false,
    };
  },
  components: {
    PageTool,
    menuadd,
  },
  created() {
    this.getList();
  },

  methods: {
    //弹窗
    onAdduser() {
      this.$refs.menuadd.dialogFormVisible();
    },
    //渲染表格
    async getList() {
      this.loading = true;
      const res = await list({
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword,
      });
      // console.log(res);
      this.tableData = res.data.list;
      this.total = res.data.counts;
      this.loading = false;
    },
    //清除按钮
    clean() {
      this.input = "";
      this.getList();
    },
    //查询按钮
    async search() {
      this.loading = true;
      const { data } = await list({
        page: 1,
        pagesize: this.pagesize,
        username: this.input,
      });
      this.tableData = data.list;
      this.total = data.counts;
      this.loading = false;
    },
    //当前页
    pageChange(pageNum) {
      this.page = pageNum;
      this.getList();
    },
    //当前页尺寸
    pageSizeChange(pageSize) {
      this.pagesize = pageSize;
      console.log(this.total);
      if (this.total > pageSize) this.getList();
    },
    //删除
    async del(id) {
      await this.$confirm("您确定删除该用户吗？");
      await remove(id);
      this.$message.success("删除用户成功");
      this.getList();
    },
  },
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
  height: 35px;
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
