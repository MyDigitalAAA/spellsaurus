// App router


// Pages
import Index from "./pages/index-page";
import Spells from "./pages/spells-page";
import World from "./pages/world-page";

// Routes
const routes = [
    {
        path: "*", redirect: "/",
    },
    {
        path: '/', component: Index,
    },
    {
        path: '/spells', component: Spells,
    },
    {
        path: '/world', component: World,
    }
];

export default routes;