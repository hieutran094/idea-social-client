import Report from '@/views/Report.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import Newsfeed from '@/views/Newsfeed.vue'
import Topics from '@/views/Topics.vue'
import TopicDetail from '@/views/TopicDetail.vue'
import ListDepartment from '@/views/department/Index.vue'
import CreateDepartment from '@/views/department/Create.vue'
import EditDepartment from '@/views/department/Edit.vue'
import ListTopic from '@/views/topic/Index.vue'
import CreateTopic from '@/views/topic/Create.vue'
import EditTopic from '@/views/topic/Edit.vue'
import ListIdea from '@/views/idea/Index.vue'
import ListUser from '@/views/user/Index.vue'
import CreateUser from '@/views/user/Create.vue'
import EditUser from '@/views/user/Edit.vue'
import TermsAndCondition from '@/views/TermsAndCondition.vue'
export default [
  {
    path: '/',
    name: '/',
    redirect: '/newsfeed',
  },
  {
    path: '/topics',
    name: 'Topics',
    component: Topics,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/topics/detail/:id',
    name: 'Topic Detail',
    component: TopicDetail,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/report',
    name: 'Report',
    component: Report,
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/department',
    name: 'List Department',
    component: ListDepartment,
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/department/edit/:id',
    name: 'Edit Department',
    component: EditDepartment,
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/department/create',
    name: 'Create Department',
    component: CreateDepartment,
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/user',
    name: 'List User',
    component: ListUser,
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/user/edit/:id',
    name: 'Edit User',
    component: EditUser,
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/user/create',
    name: 'Create User',
    component: CreateUser,
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/topic',
    name: 'List Topic',
    component: ListTopic,
    meta: {
      requiresAuth: true,
      isQa: true,
    },
  },
  {
    path: '/topic/edit/:id',
    name: 'Edit Topic',
    component: EditTopic,
    meta: {
      requiresAuth: true,
      isQa: true,
    },
  },
  {
    path: '/topic/create',
    name: 'Create Topic',
    component: CreateTopic,
    meta: {
      requiresAuth: true,
      isQa: true,
    },
  },
  {
    path: '/topic/:id/ideas',
    name: 'List Idea',
    component: ListIdea,
    meta: {
      requiresAuth: true,
      isQa: true,
    },
  },
  {
    path: '/newsfeed',
    name: 'Newsfeed',
    component: Newsfeed,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/sign-in',
    name: 'Sign In',
    component: SignIn,
  },
  {
    path: '/sign-up',
    name: 'Sign Up',
    component: SignUp,
  },
  {
    path: '/terms',
    name: 'Terms And Condition',
    component: TermsAndCondition,
  },
]
