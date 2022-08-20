<template>
  <div class="container">
<div class="container_header">
  <p>说明：目前支持学科和关键字条件筛选</p>
  <el-button type="success" size="medium" icon="el-icon-edit" @click="$router.push('new')">新增试题</el-button>
</div>
<el-form :inline="true" label="right" label-width="80px"  :model="formBase">
   <el-form-item label="学科">
    <el-select
     v-model="formBase.subject"
     placeholder="请选择"
     @change="subjectChange"
     filterable >
      <el-option v-for ="(item ,index) in simpleList" :key="index" :label="item.label" :value="item.value" ></el-option>
    </el-select>
  </el-form-item>

   <el-form-item label="二级目录">
    <el-select  placeholder="请选择" v-model="formBase.Record">
      <el-option v-for ="item in simplessRecordList" :key="item.id" :label="item.label" :value="item.value" ></el-option>
    </el-select>
  </el-form-item>

   <el-form-item label="标签" multiple>
    <el-select  placeholder="请选择" v-model="formBase.Label">
      <el-option v-for ="item in simplessLabelList" :key="item.id" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </el-form-item>

   <el-form-item label="关键字">
    <el-input placeholder="根据题干搜索" v-model="formBase.Keyword"></el-input>
  </el-form-item>

  <el-form-item label="试题类型">
    <el-select  placeholder="请选择" v-model="formBase.questionType">
      <el-option v-for ="item in questionType" :key="item.id" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </el-form-item>

    <el-form-item label="难度">
    <el-select  placeholder="请选择" v-model="formBase.difficulty">
      <el-option v-for ="item in difficulty" :key="item.id" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </el-form-item>

    <el-form-item label="方向">
    <el-select  placeholder="请选择" v-model="formBase.direction">
      <el-option v-for ="item in direction" :key="item.id" :label="item" :value="item"></el-option>
    </el-select>
  </el-form-item>

    <el-form-item label="录入人">
    <el-select  placeholder="请选择" v-model="formBase.simplesName">
      <el-option v-for ="(item,index) in simplesNameList" :key="index" :label="item.username" :value="item.id" />
    </el-select>
  </el-form-item>

    <el-form-item label="题目备注">
      <el-input style="width:220px" v-model="formBase.remark"></el-input>
  </el-form-item>

    <el-form-item label="企业简称">
      <el-input style="width:220px" v-model="formBase.referred"></el-input>
  </el-form-item>

    <el-form-item label="城市">
    <el-select
            class="filter-item"
            style="width: 130px;padding-right:5px"
            @change="handleProvince"
            v-model="formBase.province"
            filterable>
    <el-option  v-for="item in citySelect.province" :key="item" :label="item" :value="item">
            </el-option>
    </el-select>
    <el-select
            class="filter-item"
            style="width: 130px;"
            v-model="formBase.city"
            filterable>
      <el-option v-for="item in citySelect.cityDate" :key="item" :label="item" :value="item">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item >
    <div class="formButton">
    <el-button @click="remove">清除</el-button>
    <el-button type="primary" @click="onSubmit">搜索</el-button>
    </div>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import { simple } from '@/api/hmmm/subjects'
import { simple as simpleName } from '@/api/base/users'
import { simple as simpleRecord } from '@/api/hmmm/directorys'
import { simple as simpleLabel } from '@/api/hmmm/tags'
import { questionType, difficulty, direction } from '@/api/hmmm/constants'
import { provinces, citys } from '@/api/hmmm/citys'
import { choice } from '@/api/hmmm/questions'

export default {
  data () {
    return {
      questionType,
      difficulty,
      direction,
      simplesNameList: [],
      simplessRecordList: [], // 学科目录
      simplessLabelList: [], // 学科标签
      subjectID: '', // 学科id
      questionTypeList: {
        label: [1, 2, 3, 4]
      },
      citySelect: {
        province: [],
        cityDate: []
      },
      formBase: {
        subject: '',
        Record: '',
        Label: '',
        Keyword: '',
        direction: '',
        questionType: '',
        difficulty: '',
        simplesName: '',
        remark: '',
        referred: '',
        province: '',
        city: ''

      },
      simpleList: []
    }
  },

  created () {
    this.addSubject()
    this.simplesApi()
    this.getCityData()
  },

  methods: {
    // 清除
    remove () {
      this.formBase = ''
    },
    // 学科
    async addSubject () {
      const { data } = await simple()
      this.simpleList = data
    },
    // 获取学科目录以及标签
    async subjectChange (e) {
      this.subjectID = e
      const { data } = await simpleRecord({ subjectID: e })
      this.simplessRecordList = data
      const res = await simpleLabel({ subjectID: e })
      this.simplessLabelList = res.data
    },
    async simplesApi () {
      const { data } = await simpleName()
      this.simplesNameList = data
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
    async onSubmit () {
      // this.$emit('updata', this.formBase)
      const { data } = await choice({
        pagesize: 100,
        subjectID: this.subjectID,
        keyword: this.formBase.Keyword
      })
      this.$emit('update', data)
    }
  }
}
</script>

<style scoped lang="less">
.container{
  .container_header {
  color: pink;
  font-size: 12px;
  height:32px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  p {
    height: 32px;
    margin-top: 0;
  }
}
.formButton {
  width: 270px;
  padding-left: 44%;
}
}

</style>
