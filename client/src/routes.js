// Pages
import Index from "./pages/index-page";
import Spells from "./pages/spells-page";
import SchoolSingle from "./pages/schools/single-school-page";

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
        path: '/school/:id', component: SchoolSingle, props: true
    }
];

export default routes;