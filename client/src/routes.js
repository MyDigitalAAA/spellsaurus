// Pages
import Index from "~/pages/index-page"

import Spells from "~/pages/spells/spells-page"
import SpellSingle from "~/pages/spells/single-spell-page"

import Schools from "./pages/schools/schools-page"
import SchoolSingle from "~/pages/schools/single-school-page"

import Login from "~/pages/user/login-page"
import Register from "~/pages/user/register-page"

// Routes
const routes = [
    {
        path: "*", redirect: "/",
    },
    {
        path: '/', component: Index,
    },
    {
        path: '/sorts', component: Spells,
    },
    {
        path: '/sorts/:id', component: SpellSingle, props: true,
    },
    {
        path: '/ecoles', component: Schools,
    },
    {
        path: '/ecoles/:id', component: SchoolSingle, props: true,
    },
    {
        path: '/connexion', component: Login,
    },
    {
        path: '/inscription', component: Register,
    },
];

export default routes;