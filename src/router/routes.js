import Dashboard from '@/views/Dashboard.vue'
import Report from '@/views/Report.vue'
import Tables from '@/views/Tables.vue'
import Billing from '@/views/Billing.vue'
import VirtualReality from '@/views/VirtualReality.vue'
import Profile from '@/views/Profile.vue'
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
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/department',
    name: 'List Department',
    component: ListDepartment,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/department/edit/:id',
    name: 'Edit Department',
    component: EditDepartment,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/department/create',
    name: 'Create Department',
    component: CreateDepartment,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/topic',
    name: 'List Topic',
    component: ListTopic,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/topic/edit/:id',
    name: 'Edit Topic',
    component: EditTopic,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/topic/create',
    name: 'Create Topic',
    component: CreateTopic,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/topic/:id/ideas',
    name: 'List Idea',
    component: ListIdea,
    meta: {
      requiresAuth: true,
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
    path: '/tables',
    name: 'Tables',
    component: Tables,
  },
  {
    path: '/billing',
    name: 'Billing',
    component: Billing,
  },
  {
    path: '/virtual-reality',
    name: 'Virtual Reality',
    component: VirtualReality,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
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
]
