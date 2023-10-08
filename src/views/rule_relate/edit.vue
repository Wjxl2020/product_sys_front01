<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" size="mini">
      <el-form-item label="规则条件">
        <el-input v-model="form.cause" :disabled="isupdate"></el-input>
      </el-form-item>
      <el-form-item label="规则结果">
        <el-input v-model="form.result" :disabled="isupdate"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" plain @click="save">保存数据</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'RuleEdit',
    props: ['editid'],
    data() {
      return {
        form: {
          cause: '',
          result: ''
        },
        isupdate:false,
        url: '/ums-rule-relate/add',
        registerlevel:[ ],
        depts: [ ],
        }

    },
    created() {
      this.init()

      if(this.editid) {
        // 如果是修改 用户名输入框禁用
        this.isupdate = true
        // 如果是修改 提交地址变成修改的提交地址
        this.url = '/ums-rule-relate/update'
        // 通过id 读原始数据
        this.axios.get('/ums-rule-relate/getById',response => {
          this.form.id = response.obj.id
          this.form.name = response.obj.name
        },{id:this.editid})
      }
    },
    methods:{
      save() {
        this.axios.post(this.url,response => {
          // 子组件要改变父组件的值
          this.$emit('update:show',false)
          this.$emit('getData')
        },this.form)
      },
      init() {
       // alert('初始化页面...')
        //查询部门列表

        // this.axios.get('/department/list',response =>{
        //   this.depts = response.obj
        // },{
        //    withPage: 0,
        //    active: 1
        // })
        // //查询医生级别 registerlevel
        // this.axios.get('/regist-level/list',response =>{
        //   this.registerlevel = response.obj
        // },{
        //    withPage: 0,
        //    active: 1
        // })
      }
    }
  }
</script>

<style>
</style>
