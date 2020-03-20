// App router


// Pages
import index from "./pages/index";
import spells from "./pages/spells";

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
    }
];

export default routes;