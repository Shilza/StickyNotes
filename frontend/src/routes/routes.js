import React from 'react';

const Boards = React.lazy(() => import('../features/boards'));
const NotFound = React.lazy(() => import('../features/common/pages'));
const Dashboard = React.lazy(() => import('../features/dashboard'));
const Welcome = React.lazy(() => import('../features/auth/pages'));

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