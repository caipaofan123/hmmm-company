<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-row type="flex">
      <el-col :span="20">
        <el-row type="flex">
          <el-col :span="8"><slot name="input1"></slot></el-col>
          <el-col :span="16">
            <el-row type="flex" justify="start">
              <slot name="input2" ></slot>
              <el-button size="small" @click="clear">清除</el-button>
              <el-button type="primary" size="small" @click="search">搜索</el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row type="flex" justify="end">
          <newButton :text="text" @click.native="add"></newButton>
        </el-row>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import newButton from "@/common/newButton";
export default {
  data() {
    return {
        form:{}
    };
  },
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  components: {
    newButton,
  },
  created() {},

  methods: {
    search(){
      this.$emit('search')
    },
    clear(){
      this.$emit('clear')
    },
    add(){
      this.$emit('add')
    }
  },
};
</script>

<style scoped></style>
