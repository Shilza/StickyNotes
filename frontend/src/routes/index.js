import React from 'react'
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import {routes} from './routes'
import {PublicRoute} from "./Public";
import {PrivateRoute} from "./Private";
import {Header} from "../features/common/organisms";

const Routes = () => (
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
    </Router>
);

export default Routes;