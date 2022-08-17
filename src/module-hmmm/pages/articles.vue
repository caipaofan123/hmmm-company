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
              <el-button type="success" icon="el-icon-edit" @click="addSkillBtn"
                >新增技巧</el-button
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
            <template slot-scope="scope">
              <span style="margin-right: 3px">{{ scope.row.title }}</span>
              <a
                v-if="scope.row.videoURL"
                href="#"
                class="el-icon-film"
                style="color: #00f; font-size: 18px"
              ></a>
            </template>
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
                v-if="scope.row.state === 0"
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
              <el-button
                size="medium"
                type="text"
                :disabled="!scope.row.state"
                ref="edit"
                @click="editArticle(scope)"
                >修改</el-button
              >
              <el-button
                size="medium"
                type="text"
                :disabled="!scope.row.state"
                ref="edit"
                @click="removeBtn(scope)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :page-sizes="[10, 20, 30, 50]"
          :page-size="100"
          :total="counts"
          @current-change="currentChange"
          @prev-click="prevClick"
          @next-click="nextClick"
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
      <el-dialog
        :title="articleTitle"
        :visible.sync="addDialog"
        width="50%"
        ref="articleDialog"
      >
        <el-form
          label-width="80px"
          :model="articleForm"
          ref="articleForm"
          :rules="articleRules"
        >
          <el-form-item label="文章标题:" prop="title" label-width="120px">
            <el-input
              placeholder="请输入文章标题"
              v-model="articleForm.title"
            ></el-input>
          </el-form-item>
          <el-form-item label="文章内容:" prop="content" label-width="120px">
            <quill-editor
              ref="myQuillEditor"
              v-model="articleForm.content"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
            >
            </quill-editor>
          </el-form-item>
          <el-form-item
            label="视频地址:"
            prop="editorVideoAddress"
            label-width="120px"
          >
            <el-input
              placeholder="请输入视频地址"
              v-model="articleForm.editorVideoAddress"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onCancel">取 消</el-button>
          <el-button type="primary" @click="onConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { profile } from "@/api/base/frame";
import {
  listApi,
  changeStateApi,
  removeApi,
  addApi,
  updateApi,
} from "@/api/hmmm/articles";
import { status } from "@/api/hmmm/constants";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      recordNum: 10,
      page: 1,
      pagesize: 10,
      counts: 0,
      tableData: [],
      headForm: {
        keyword: null,
        state: null,
      },
      status: [],
      previewDialog: false,
      addDialog: false,
      title: "",
      visits: "",
      username: "",
      createTime: "",
      articleBody: "",
      btnDisable: "",
      content: "试着写点什么😘",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "code-block"],
            ["link", "image"],
          ],
        },
      },
      articleForm: {
        title: null,
        content: null,
        editorVideoAddress: null,
      },
      articleTitle: "",
      articleRules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.list();
  },
  components: {
    quillEditor,
  },
  methods: {
    async list() {
      const data = {
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.headForm.keyword,
        state: this.headForm.state,
      };
      const res = await listApi(data);
      console.log(res);
      res.data.items.forEach((item) => {
        if (item.state === 1) {
          return (item.cnState = "已启用");
        } else {
          return (item.cnState = "已禁用");
        }
      });
      console.log(res.data.items);
      this.counts = res.data.counts;
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
    addSkillBtn() {
      this.addDialog = true;
      this.articleTitle = "新增文章";
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
          console.log(this.tableData);
          scope.row.state = 0;
          scope.row.cnState = "已禁用";
        } else {
          console.log(this.tableData);
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
    editArticle(scope) {
      this.articleId = scope.row.id;
      console.log(scope);
      this.addDialog = true;
      this.articleTitle = "修改文章";
      this.articleForm.title = scope.row.title;
      this.articleForm.content = scope.row.articleBody;
      this.articleForm.editorVideoAddress = scope.row.videoURL;
    },
    async removeBtn(scope) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const data = {
            id: scope.row.id,
          };
          const res = await removeApi(data);
          console.log(res);
          this.list();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    currentChange(page) {
      this.page = page;
      this.list();
    },
    prevClick(page) {
      this.page = page;
      this.list();
    },
    nextClick(page) {
      this.page = page;
      this.list();
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    },
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorReady() {},
    async onConfirm() {
      this.addDialog = false;
      const data = {
        title: this.articleForm.title,
        articleBody: this.articleForm.content,
        videoURL: this.articleForm.editorVideoAddress,
        id: this.articleId,
      };
      const datas = {
        title: this.articleForm.title,
        articleBody: this.articleForm.content,
        videoURL: this.articleForm.editorVideoAddress,
        id: null,
      };
      if (this.articleId) {
        const res = await updateApi(data);
        console.log(res);
      } else {
        const res = await addApi(datas);
        console.log(res);
      }

      this.list();
      this.$refs.articleForm.resetFields();
      this.articleId = "";
    },
    onCancel() {
      this.addDialog = false;
      this.$refs.articleForm.resetFields();
      this.articleId = "";
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
