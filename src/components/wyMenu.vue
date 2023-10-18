<template>
   <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :unique-opened="true"
    background-color="#222D32"
    text-color="#B8C7CE"
    active-text-color="#fff"
    router
    >


    <el-submenu v-for="menu in menus" :key="index" :index="menu.id">
      <template slot="title">
        <span>{{menu.name}}</span>
      </template>
      <ChilrenMenu v-for="item in menu.children" :menu="item" :key="index"></ChilrenMenu>
    </el-submenu>

    <!-- <el-submenu index="1">
      <template slot="title">
        <span>推理</span>
      </template>
        <el-menu-item index="/rule">正向推理</el-menu-item>
        <el-menu-item index="/reverse">反向推理</el-menu-item>
        <el-menu-item index="/bidirection">双向推理</el-menu-item>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title">
        <span>规则管理</span>
      </template>
      <el-menu-item index="/rule_control">规则表</el-menu-item>
      <el-menu-item index="/rule_relate">规则关系</el-menu-item>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <span>用户和权限</span>
      </template>
        <el-menu-item index="/user">用户管理</el-menu-item>
        <el-menu-item index="/role">角色管理</el-menu-item>
        <el-menu-item index="/permission">权限管理</el-menu-item>
    </el-submenu> -->
  </el-menu>
</template>

<script>
  import ChilrenMenu from '@/components/childrenMenu'
  export default {
    name: 'WyMenu',
    components:{
      ChilrenMenu
    },
    data() {
      return {
        menus:[]
      }
    },
    created() {
        this.axios.post('/ums-permission/userPermissionList',response =>{
          this.menus = response.obj
          console.log(response)
        },{

        })
    }
  }
</script>

<style>
</style>
