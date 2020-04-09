// App router


// Pages
import index from "./pages/index-page";
import spells from "./pages/spells-page";
import world from "./pages/world-page";

// Routes
const routes = [
    {
        path: "*", redirect: "/",
    },
    {
        path: '/', component: index,
    },
    {
        path: '/spells', component: spells,
    },
    {
        path: '/world', component: world,
    }
];

export default routes;