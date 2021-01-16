import VueRouter from 'vue-router'

import store from './store'

// Pages
import Index from "@/pages/index-page"

  import Spells from "@/pages/spells/spells-page"
  import SpellSingle from "@/pages/spells/single-spell-page"

  import Schools from "./pages/schools/schools-page"
  import SchoolSingle from "@/pages/schools/single-school-page"

  import Timeline from "./pages/timelines/timeline-page"
  
  import Profile from "@/pages/user/profile-page"
  import Login from "@/pages/user/login-page"
  import Register from "@/pages/user/register-page"

// Routes
const routes = [
  {
    path: "*",
    redirect: "/",
  },
  {
    path: '/',
    component: Index,
  },
  {
    path: '/connexion',
    component: Login,
    meta: {
      loginFilter: true
    }
  },
  {
    path: '/inscription',
    component: Register,
    meta: {
      loginFilter: true
    }
  },
  {
    path: '/sorts',
    component: Spells,
  },
  {
    path: '/sorts/:id',
    component: SpellSingle,
    props: true,
  },
  {
    path: '/ecoles',
    component: Schools,
  },
  {
    path: '/ecoles/:id',
    component: SchoolSingle,
    props: true,
  },
  {
    path: '/ages',
    component: Timeline,
  },
  {
    path: '/profil',
    component: Profile,
    props: true,
    meta: {
      logoutFilter: true,
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: "",
  linkExactActiveClass: "active",
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.loginFilter)) {
    if (store.getters.getUserProfile) {
      next({
        path: '/',
      });
    }
    next();
  } else if (to.matched.some(record => record.meta.logoutFilter)) {
    if (!store.getters.getUserProfile) {
      next({
        path: '/connexion',
      });
    }
    next();
  }
  next();
})

export default router;