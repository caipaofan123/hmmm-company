<template>
  <div class="container">
    <pannel>
      <headerya text="新增学科">
        <template #input1>
          <el-form-item label="学科名称">
            <el-input></el-input>
          </el-form-item>
        </template>
      </headerya>
    </pannel>
  </div>
</template>

<script>
import pannel from "@/common/pannel";
import headerya from "@/common/header";
export default {
  components: {
    pannel,
    headerya,
  },
};
</script>

<style scoped >
.el-input{
  width: 190px;
}
</style>
