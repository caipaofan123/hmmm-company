<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-form ref="form" label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="关键字">
                <el-input placeholder="根据文章标题搜索"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态">
                <el-select placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="padding-left: 40px">
              <el-button>清除</el-button>
              <el-button type="primary">搜索</el-button>
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
          :cell-style="rowStyle"
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
            prop="name"
            label="文章标题"
            width="400"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="阅读数"
            width="295"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="录入人"
            width="294"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="录入时间"
            width="294"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="address"
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
              <el-button size="medium" type="text">预览</el-button>
              <el-button size="medium" type="text">禁用</el-button>
              <el-button size="medium" type="text" disabled>修改</el-button>
              <el-button size="medium" type="text" disabled>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
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
export default {};
</script>

<style scoped lang="less"></style>
