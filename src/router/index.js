import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views'),
      children: [
        {
          path: '/user',
          name: 'User',
          component: () => import('@/views/user')
        },
        {
          path: '/role',
          name: 'Role',
          component: () => import('@/views/role')
        },
        {
          path: '/permission',
          name: 'Permission',
          component: () => import('@/views/permission')
        },
        {
          path: '/user-role',
          name: 'UserRole',
          component: () => import('@/views/user/user-role')
        },
        {
          path: '/role-permiss',
          name: 'RolePermiss',
          component: () => import('@/views/role/role-permiss')
        },
        {
          path: '/rule',
          name: 'Rule',
          component: () => import('@/views/rule')
        },
        {
          path: '/reverse',
          name: 'Reverse',
          component: () => import('@/views/reverse')
        },{
          path: '/bidirection',
          name: 'Bidirection',
          component: () => import('@/views/bidirection')
        },{
          path: '/rule_control',
          name: 'Rule_control',
          component: () => import('@/views/rule_control')
        },{
          path: '/rule_relate',
          name: 'Rule_relate',
          component: () => import('@/views/rule_relate')
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login')
    }
  ]
})
