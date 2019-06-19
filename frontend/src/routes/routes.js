import {Welcome} from "../features/auth/pages";
import {Dashboard} from "../features/dashboard";
import {NotFound} from "../features/common/pages";
import {Boards} from "../features/boards";

export const routes = [
    {
        path: '/',
        exact: true,
        auth: false,
        component: Welcome
    },
    {
        path: '/boards',
        exact: true,
        auth: true,
        component: Boards
    },
    {
        path: '/boards/:title',
        exact: true,
        auth: true,
        component: Dashboard
    },
    {
        path: '*',
        exact: false,
        auth: false,
        component: NotFound
    }
];