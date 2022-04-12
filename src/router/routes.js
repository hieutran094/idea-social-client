import Dashboard from '@/views/Dashboard.vue'
import Tables from '@/views/Tables.vue'
import Billing from '@/views/Billing.vue'
import VirtualReality from '@/views/VirtualReality.vue'
import Profile from '@/views/Profile.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import EditPage from '@/views/Edit.vue'
import ListDepartment from '@/views/department/Index.vue'
import CreateDepartment from '@/views/department/Create.vue'
import EditDepartment from '@/views/department/Edit.vue'
import ListTopic from '@/views/topic/Index.vue'
import CreateTopic from '@/views/topic/Create.vue'
import EditTopic from '@/views/topic/Edit.vue'

export default [
  {
    path: '/',
    name: '/',
    redirect: '/dashboard',
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
  {
    path: '/edit',
    name: 'Edit',
    component: EditPage,
  },
]
