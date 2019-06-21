import React, {memo} from 'react'
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import {routes} from './routes'
import {PublicRoute} from "./Public";
import {PrivateRoute} from "./Private";
import {Header} from "../features/common/organisms";
import {toast, ToastContainer} from "react-toastify";

const Routes = memo(() => (
    <Router>
        <Header/>
        <Switch>
            {
                routes.map((route, i) =>
                    route.auth
                        ? <PrivateRoute key={i} {...route}/>
                        : <PublicRoute key={i} {...route}/>
                )
            }
        </Switch>
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>
    </Router>
));

export default Routes;