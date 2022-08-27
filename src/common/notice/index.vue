<template>
  <el-alert  type="info" show-icon :closable="false"> 数据一共 {{num}} 条</el-alert>
</template>

<script>
export default {
  data() {
    return {};
  },
    props:{
        num:{
            type:Number,
            required:true,
        }
    },
  created() {},

  methods: {},
};
</script>

<style scoped>
.el-alert{
    height: 35px;
}
</style>
