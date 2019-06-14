import React from 'react'
import {Redirect, Route} from 'react-router'
import {$auth} from "../features/common/models/auth";
import {useStore} from "effector-react";

export const PrivateRoute = ({component: Component, ...rest}) => {
    let {authenticated} = useStore($auth);

    return (
        <Route {...rest} render={props => (
            authenticated
                ? <Component {...props}/>
                : <Redirect to={{
                    pathname: '/',
                    state: {from: props.location}
                }}/>
        )}/>
    );
};