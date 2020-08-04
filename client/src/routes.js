import Vue from 'vue'
import VueRouter from 'vue-router'

// Pages
import Index from "~/pages/index-page"

import Spells from "~/pages/spells/spells-page"
import SpellSingle from "~/pages/spells/single-spell-page"

import Schools from "./pages/schools/schools-page"
import SchoolSingle from "~/pages/schools/single-school-page"

import Login from "~/pages/user/login-page"
import Register from "~/pages/user/register-page"
import Profile from "~/pages/user/profile-page"

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
            antiAuthGuard: true
        }
    },
    {
        path: '/inscription',
        component: Register,
        meta: {
            antiAuthGuard: true
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
        path: '/profil',
        component: Profile,
        props: true,
        meta: {
            authGuard: true,
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
    if (to.matched.some(record => record.meta.authGuard)) {
        if (Vue.$cookies.get('U_') == null) {
            next({
                path: '/connexion',
                params: { nextUrl: to.fullPath },
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router;