<template>
  <div class='container'>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>试题录入 </span>
  </div>
  <el-form label-width="100px"
        :rules="rules"
        :model="formBase"
        ref="formData"
  >
    <el-form-item label="学科"  prop="subject">
    <el-select v-model="formBase.subjectID" placeholder="请选择" @change="subjectChange">
      <el-option v-for ="item in simpleList" :key="item.id" :label="item.label" :value="item.value" ></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="目录" prop="directory">
    <el-select
      v-model="formBase.catalogID"
       placeholder="请选择请选择">
      <el-option v-for ="item in simplessRecordList" :key="item.id" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="企业" prop="enterprise">
    <el-select v-model="formBase.enterpriseID" placeholder="请选择">
      <el-option v-for="item in enterpriseList" :key="item.id" :label="item.company" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="城市" prop="province">
    <el-select
            class="filter-item"
            style="width: 130px; padding-right: 5px"
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
            filterable
          >
            <el-option v-for="item in citySelect.cityDate" :key="item" :label="item" :value="item"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="方向" prop="direction">
    <el-select v-model="formBase.direction" placeholder="请选择">
      <el-option v-for="item in direction" :key="item" :label="item" :value="item"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="题型"  >
    <el-radio-group v-model="formBase.questionType" prop="questions" @change="questionsFn">
    <el-radio :label="'1'">单选</el-radio>
    <el-radio :label="'2'">多选</el-radio>
    <el-radio :label="'3'">简答</el-radio>
  </el-radio-group>
  </el-form-item>

  <el-form-item label="难度"  prop="difficulty">
    <el-radio-group v-model="formBase.difficulty" prop="questions" >
    <el-radio :label="'1'">简单</el-radio>
    <el-radio :label="'2'">一般</el-radio>
    <el-radio :label="'3'">困难</el-radio>
  </el-radio-group>
  </el-form-item>
  <el-form-item label="题干：" prop="stem">
<Editor @updatedContent="updatedEditorFn"></Editor>
  </el-form-item>

  <!-- 单选框 -->
   <el-form-item label="选项"  v-show="radioShow" >
     <el-radio-group v-model="formBase.options.code"  class="radioList">
    <el-radio :label="item" v-for = "item in optionList" :key="item" >
      <span>{{item}}</span>：<el-input ></el-input><UploadImg style="width: 100px; height: 60px"></UploadImg>
       <span class="remoceXxImg">X</span>
    </el-radio>
  </el-radio-group>
</el-form-item>
<!-- 复选框 -->
 <el-form-item label="选项" v-show="checkboxShow" >
   <el-checkbox-group v-model="formBase.options" class="checkboxList">

   <el-checkbox :label="item" v-for = "item in optionList" :key="item" class="checkboxList">
      <span>{{item}}</span>：<el-input ></el-input><UploadImg style="width: 100px; height: 60px"></UploadImg>
       <span class="remoceXx">X</span>
    </el-checkbox>
  </el-checkbox-group>
  </el-form-item>
  <el-form-item>

      <el-button type="danger" @click="addOption" :disabled="disabled" v-show="buttonShow">+增加选项与答案</el-button>
  </el-form-item>
  <el-form-item label="解析视频：">
    <el-input v-model="formBase.videoURL"></el-input>
  </el-form-item>
  <el-form-item label="答案解析：" prop="parse">
 <Editor @updatedContent="updatedContentFn"></Editor>
  </el-form-item>
  <el-form-item label="题目备注">
    <el-input type="textarea" v-model="formBase.remarks"></el-input>
  </el-form-item>
    <el-form-item label="试题标签">
    <el-select  placeholder="请选择试题标签"  v-model="formBase.tags">
      <el-option v-for ="item in simplessLabelList" :key="item.id" :label="item.label" :value="item.label"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="CreateImmediately">立即创建</el-button>
  </el-form-item>
</el-form>
</el-card>
  </div>
</template>

<script>
import { provinces, citys } from '@/api/hmmm/citys.js'
import { simple } from '@/api/hmmm/subjects'
import { list } from '@/api/hmmm/companys'
import { detail, simple as simpleRecord } from '@/api/hmmm/directorys'
import { direction } from '@/api/hmmm/constants'
import Editor from '@/module-hmmm/components/editor'
import UploadImg from '../components/UploadImg'
import { simple as simpleLabel } from '@/api/hmmm/tags'
import { add as addQuestions } from '@/api/hmmm/questions'

// import Bus from './bus' // 这个文件路径写自己的

export default {
  components: {
    Editor, UploadImg
  },
  data () {
    return {
      buttonShow: true, // 显示隐藏按钮
      disabled: true, // 禁用按钮
      radioShow: true,
      checkboxShow: false, // 多选框
      checkboxList: [],
      radio: 1,
      checkList: ['A'],
      optionList: ['A', 'B', 'C', 'D'],
      option: 68,
      simpleList: [],
      areaOptions: [],
      simplessRecordList: [], // 目录
      simplessLabelList: [],
      formBase: {
        subjectID: '',
        catalogID: '',
        enterpriseID: '',
        province: '',
        city: '',
        direction: '',
        questionType: '1',
        difficulty: '1',
        question: '',
        options: [{
          isRight: true,
          code: 'A',
          title: '',
          img: ''
        }],
        videoURL: '',
        answer: '',
        remarks: '',
        tags: ''
      },
      citySelect: {
        province: [],
        cityDate: []
      },
      enterpriseList: '', // 企业
      direction: direction,
      counts: '',
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
  computed: {
  },
  created () {
    this.addSubject()
    this.getCityData()
    this.enterpriseApi()
    this.handleDirectory()
  },
  methods: {
    addOption () {
      this.option = this.option + 1
      this.options = String.fromCodePoint(this.option)
      this.optionList.push(this.options)
    },
    async addSubject () {
      const { data } = await simple()
      this.simpleList = data
    },
    // 获取学科目录以及标签
    async subjectChange (e) {
      const { data } = await simpleRecord({ subjectID: e })
      this.simplessRecordList = data
      const res = await simpleLabel({ subjectID: e })
      this.simplessLabelList = res.data
    },
    // 获取城市
    getCityData: function () {
      this.citySelect.province = provinces()
    },
    // 选省获取到地区
    handleProvince: function (e) {
      this.citySelect.cityDate = citys(e)
      this.formBase.city = this.citySelect.cityDate[0]
    },
    // 获取企业列表
    async  enterpriseApi () {
      const res = await list({ pagesize: this.counts })
      const arr = res.data.items.map((item) => {
        return item
      })
      this.enterpriseList = Array.from(new Set(arr))
      console.log(this.enterpriseList)

      this.counts = res.counts
    },
    // 获取学科目录
    async handleDirectory () {
      const res = await detail()
      console.log(res)
    },
    // 获取多选单选的值
    questionsFn (e) {
      if (e === '1') {
        this.checkboxShow = false
        this.radioShow = true
        this.disabled = true
        this.buttonShow = true
      } else if (e === '2') {
        this.checkboxShow = true
        this.radioShow = false
        this.disabled = false
        this.buttonShow = true
      } else {
        this.checkboxShow = false
        this.radioShow = false
        this.buttonShow = false
      }
    },
    // 题干的值
    updatedEditorFn (text) {
      this.formBase.question = text
      console.log(this.question)
    },
    // 答案解析的值
    updatedContentFn (text) {
      this.formBase.answer = text
      console.log(this.answer)
    },
    async CreateImmediately () {
      this.$refs.formData.validate()
      await addQuestions(this.formBase)
      this.$message.success('操作成功')
      this.$router.push('list')
    }
  }
}
</script>

<style scoped lang='less'>
.box-card {
  margin: 20px;
 }
 .radioList {
  width: 310px;
  .remoceXxImg{
     border: 1px solid;
    border-radius: 100%;
    position: relative;
    top: -113px;
    right: -367px;
  }
 }
 .checkboxList{
  width: 270px;
  display: block;
  .remoceXx{
    border: 1px solid;
    border-radius: 100%;
    position: relative;
    top: -113px;
    right: -361px;
  }
  /deep/.el-checkbox__inner{
    position: relative;
    top: -88px;
  }
  /deep/.el-upload--picture-card {
position: absolute;
top: -10px;
    right: -120px;
  }
 }
  /deep/.el-upload--picture-card{
    width: 100px;
    height: 60px;
  }

  /deep/.el-upload-list--picture-card .el-upload-list__item-thumbnail{
    width: 100px;
    height: 60px;
  }

  /deep/.el-upload--picture-card {
    position: absolute;
    top: -10px;
    right: -120px;
  }
  </style>
