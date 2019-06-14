import {Welcome} from "../features/auth/pages";
import {Dashboard} from "../features/dashboard";

export const routes = [
    {
        path: '/',
        exact: true,
        auth: false,
        component: Welcome
    },
    {
        path: '/dashboard',
        exact: true,
        auth: true,
        component: Dashboard
    }
];