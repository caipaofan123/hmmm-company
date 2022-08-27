<template>
  <el-dialog
    @close="onClose"
    :title="isEdit ? '编辑学科' : '新增学科'"
    :visible="dialogVisible"
    width="50%"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="学科名称">
        <el-input
          placeholder="请输入学科名称"
          v-model="form.subjectName"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { add, update } from "@/api/hmmm/subjects";
export default {
  data() {
    return {
      form: {
        subjectName: "",
        isFrontDisplay: 1,
      },
    };
  },
  computed: {
    value: {
      get() {
        return !!this.form.isFrontDisplay;
      },
      set(val) {
        if (val) {
          // this.value=val
          this.form.isFrontDisplay = 1;
        } else {
          // this.value=val
          this.form.isFrontDisplay = 0;
        }
      },
    },
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
    editdata: {
      type: Object,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
  },
  created() {},

  methods: {
    onClose() {
      this.$emit("close");
    },
    async onSave() {
      if (this.isEdit) {
        this.form.id = this.editdata.id;
        await update(this.form);
      } else {
        const res = await add(this.form);
        console.log(res);
      }
      this.onClose();
      this.form.subjectName = "";
      this.form.isFrontDisplay = 1;
      this.$parent.getList();
    },
  },
};
</script>

<style scoped></style>
