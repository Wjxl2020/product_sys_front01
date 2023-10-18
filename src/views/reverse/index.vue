<template>
    <div>
      <el-row :gutter="10">
        <el-col :span="4"><el-input v-model="search.result" placeholder="请输入规则结果"></el-input></el-col>
        <el-col :span="4"><el-input v-model="search.cause" placeholder="请输入规则条件"></el-input></el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" plain @click="searchData()">逆向推理</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="result.tableData"
        style="width: 100%"
         @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
        >
        </el-table-column>
        <el-table-column
          label="ID"
          width="80"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          label="结果"
          prop="result"
        >
        </el-table-column>
        <el-table-column
          label="条件"
          prop="cause"
          width="500"
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
          result: '',
          cause: ''
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
        this.axios.get('/ums-rule-relate/reverse',response => {
          this.result.tableData = response.obj
          this.result.pages = response.obj.pages
          console.log(response)
        },this.query)
      },
      searchData() {
        this.query.result = this.search.result
        this.query.cause = this.search.cause
        this.query.pageNo = 1
        this.getData()
      }
    }
  }
  </script>
  <style scoped>
  </style>
  