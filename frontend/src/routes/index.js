import React, {memo, Suspense} from 'react'
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import {routes} from './routes'
import {PublicRoute} from "./Public";
import {PrivateRoute} from "./Private";
import {Header} from "../features/common/organisms";
import {toast, ToastContainer} from "react-toastify";
import {LoadingPage} from "../ui/pages";

const Routes = memo(() => (
    <Router>
        <Header/>
        <Suspense fallback={<LoadingPage/>}>
            <Switch>
                {
                    routes.map((route, i) =>
                        route.auth
                            ? <PrivateRoute key={i} {...route}/>
                            : <PublicRoute key={i} {...route}/>
                    )
                }
            </Switch>
        </Suspense>
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>
    </Router>
));

export default Routes;