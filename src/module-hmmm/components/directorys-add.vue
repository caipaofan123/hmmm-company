<template>
  <el-dialog
    @close="onClose"
    :title="isEdit ? '编辑目录' : '新增目录'"
    :visible="dialogVisible"
    width="50%"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属学科">
        <el-select v-model="form.subjectID" placeholder="请选择" @focus='simple'>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="目录名称">
        <el-input
          placeholder="请输入目录名称"
          v-model="form.directoryName"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { add, update,simple ,adddirectorys,updatedirectorys} from "@/api/hmmm/subjects";
export default {
  data() {
    return {
      form: {
        subjectID: '',
        directoryName: "",
      },
      options:[]
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
       await updatedirectorys(this.form)
        console.log(123);
      } else {
      await adddirectorys(this.form);
       
      }
      this.onClose();
      this.form.subjectID = null;
      this.form.directoryName = '';
      this.$parent.directorysList();
    },
    async simple(){
      const {data} =await simple()
      this.options=data
      console.log(data);
    }
  },
};
</script>

<style scoped></style>
