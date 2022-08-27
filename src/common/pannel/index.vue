<template>
  <el-card class="box-card">
    <slot/>
  </el-card>
</template>

<script>
export default {
  data() {
    return {};
  },

  created() {},

  methods: {},
};
</script>

<style scoped>
.box-card {
    width: 100%;
    height:100%;
    padding: 20px;
    margin:10px
  }
</style>
