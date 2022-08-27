<template>
  <!-- 父向子传 text -->
  <el-button type="success" icon="el-icon-edit" size='small'>{{ text }}</el-button>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  created() {},

  methods: {},
};
</script>

<style scoped></style>
