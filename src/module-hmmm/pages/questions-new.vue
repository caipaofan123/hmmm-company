<template>
  <div class='container'>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>试题录入</span>
  </div>
  <el-form label-width="100px"
        :rules="rules"
        :model="formBase"
  >
    <el-form-item label="学科"  prop="subject">
    <el-select v-model="formBase.subject" placeholder="请选择" >
      <el-option v-for ="item in simpleList" :key="item.id" :label="item.label" :value="item.value" ></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="目录" prop="directory">
    <el-select v-model="formBase.directory" placeholder="请选择请选择">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="企业" prop="enterprise">
    <el-select v-model="formBase.enterprise" placeholder="请选择">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="城市" prop="province">
    <el-select
            class="filter-item"
            style="width: 130px;"
            @keyup.enter="handleFilter"
            @change="handleProvince"
            v-model="formBase.province"
            filterable
          >
      <el-option  v-for="item in citySelect.province" :key="item" :label="item" :value="item">
            </el-option>
    </el-select>
    <el-select
            class="filter-item"
            style="width: 130px;"
            v-model="formBase.city"
            @keyup.enter="handleFilter"
            filterable
          >
            <el-option v-for="item in citySelect.cityDate" :key="item" :label="item" :value="item"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="方向" prop="direction">
    <el-select v-model="formBase.direction" placeholder="请选择">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="题型" prop="questions">
    <el-radio v-model="formBase.questions" label="1">单选</el-radio>
  <el-radio v-model="radio" label="2">多选</el-radio>
  <el-radio v-model="radio" label="2">简答</el-radio>
  </el-form-item>
  <el-form-item label="难度" prop="difficulty">
    <el-radio v-model="formBase.difficulty" label="1">简单</el-radio>
  <el-radio v-model="radio" label="2">一般</el-radio>
  <el-radio v-model="radio" label="2">困难</el-radio>
  </el-form-item>
  <el-form-item label="题干：" prop="stem">
<Editor></Editor>
  </el-form-item>
 <el-form-item label="选项" >
    <el-checkbox label="复选框" v-for = "item in optionList" :key="item" class="checkboxs">
      <span>{{item}}</span>:<el-input></el-input>
    </el-checkbox>
  </el-form-item>
  <el-form-item>
      <el-button type="danger" @click="addOption">+增加选项与答案</el-button>
  </el-form-item>
  <el-form-item label="解析视频：">
    <el-input ></el-input>
  </el-form-item>
  <el-form-item label="答案解析：" prop="parse">
 <Editor></Editor>
  </el-form-item>
  <el-form-item label="题目备注">
    <el-input type="textarea" ></el-input>
  </el-form-item>
    <el-form-item label="试题标签">
    <el-select v-model="value" placeholder="请选择试题标签">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" >立即创建</el-button>
  </el-form-item>
</el-form>
</el-card>
  </div>
</template>

<script>
import { provinces, citys } from '@/api/hmmm/citys.js'
import { simple } from '@/api/hmmm/subjects'
import Editor from '@/module-hmmm/components/editor'

export default {
  components: {
    Editor
  },
  data () {
    return {
      radio: 1,
      checkList: ['A'],
      optionList: ['A', 'B', 'C', 'D'],
      option: 68,
      simpleList: [],
      areaOptions: [],
      formBase: {
        subject: '',
        directory: '',
        enterprise: '',
        province: '',
        direction: '',
        stem: '',
        parse: ''
      },
      citySelect: {
        province: [],
        cityDate: []
      },
      value: '',
      rules: {
        subject: [{ required: true, message: '请选择学科', trigger: 'blur' }],
        directory: [{ required: true, message: '请选择目录', trigger: 'blur' }],
        enterprise: [{ required: true, message: '请选择企业', trigger: 'blur' }],
        province: [{ required: true, message: '请选择城市', trigger: 'blur' }],
        direction: [{ required: true, message: '请选择方向', trigger: 'blur' }],
        questions: [{ required: true, message: '请选择题型', trigger: 'blur' }],
        difficulty: [{ required: true, message: '请选择难度', trigger: 'blur' }],
        stem: [{ required: true, message: '请输入题干', trigger: 'blur' }],
        parse: [{ required: true, message: '请输入答案解析', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.addSubject()
    this.getCityData()
  },
  methods: {
    addOption () {
      this.option = this.option + 1
      this.options = String.fromCodePoint(this.option)
      this.optionList.push(this.options)
    },
    async addSubject () {
      const { data } = await simple()
      console.log(data)
      this.simpleList = data
    },
    // 获取省
    getCityData: function () {
      this.citySelect.province = provinces()
    },
    // 选省获取到市
    handleProvince: function (e) {
      console.log(e)
      this.citySelect.cityDate = citys(e)
      this.formBase.city = this.citySelect.cityDate[0]
    }
    // 图片转址
    // async handleAvatarSuccess (res, file) {
    //   console.log(res)
    //   console.log(file)
    //   const formData = new FormData()
    //   formData.append('fileName', file.raw)
    //   const { data } = await getImageUrlAPI(formData)
    //   this.formData.skuImage = data
    // },
    // // 图片限制
    // beforeAvatarUpload (file) {
    //   const isJPG = file.type === 'image/jpeg'
    //   const isPNG = file.type === 'image/png'
    //   const isLt2M = file.size / 1024 / 1024 < 2

    //   // if (!isJPG) {
    //   //   this.$message.error('上传头像图片只能是 JPG 格式!')
    //   // }
    //   // if (!isLt2M) {
    //   //   this.$message.error('上传头像图片大小不能超过 2MB!')
    //   // }
    //   // return isJPG && isLt2M
    //   return (isJPG && isLt2M) || (isPNG && isLt2M)
    // }
  }
}
</script>

<style scoped lang='less'>
.box-card {
  margin: 20px;
  }
  .checkboxs{
    display: block;
    margin: 10px 0;
  }
  </style>
