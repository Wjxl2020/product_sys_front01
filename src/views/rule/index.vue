<template>
    <div>
      <el-row :gutter="10">
        <el-col :span="5"><el-input v-model="search.rule" placeholder="请输入规则名"></el-input></el-col>
        <el-col :span="19">
          <el-button type="primary" icon="el-icon-search" plain @click="searchData()">正向推理</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="result.tableData"
        style="width: 100%"
         @selection-change="handleSelectionChange"
      >
        <el-table-column
          label="ID"
          width="80"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          label="条件"
          prop="cause"
          width="500"
        >
        </el-table-column>
        <el-table-column
          label="结果"
          prop="result"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px;"
        background
        layout="prev, pager, next"
        :page-count="result.pages"
        :current-page.sync="query.pageNo"
        :page-size="query.pageSize"
        @current-change="getData()">
      </el-pagination>
      <el-dialog
        :title="title"
        :visible.sync="show"
        :close-on-click-modal = "false"
        width="500px"
      >
        <UserEdit
          v-if="show"
          :show.sync="show"
          @getData="getData()"
          :editid="editid"
        ></UserEdit>
      </el-dialog>
    </div>
  </template>
  
  <script>
  // import UserEdit from '@/views/user/edit'
  export default {
    name: 'Rule',
    data() {
      return {
        search: {
          rule: ''
        },
        query: {
          rule: '',
          pageNo: 1,
          pageSize: 8
        },
        result:{
          tableData: [],
          pages: 0
        },
        show: false,
        editid: null,
        selectedrow: [],
        title: ''
      }
    },
    components:{
      // UserEdit
    },
    created() {
      // this.getData()
    },
    methods: {
      getData() {
        this.axios.get('/ums-rule-relate/recodes',response => {
          this.result.tableData = response.obj
          // this.result.pages = response.obj.pages
          console.log(response.obj)
        },this.query)
      },
      searchData() {
        this.query.rule = this.search.rule
        this.query.pageNo = 1
        this.getData()
      }
    }
  }
  </script>
  <style scoped>
  </style>
  