import React from 'react'
import {Redirect, Route} from 'react-router'
import {$auth} from "../features/common/models/auth";
import {useStore} from "effector-react";

export const PublicRoute = ({component: Component, ...rest}) => {
    let {authenticated} = useStore($auth);

    return (
        <Route {...rest} render={props => (
            !authenticated
                ? <Component {...props}/>
                : <Redirect to={{
                    pathname: '/boards',
                    state: {from: props.location}
                }}/>
        )}/>
    );
};