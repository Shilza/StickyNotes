import React from 'react';
import styled from "styled-components";
import {$auth, resetAuth} from "../models/auth";
import {useStore} from "effector-react";
import {withRouter} from "react-router";
import {withApollo} from "react-apollo";
import {LOGOUT} from "../api";
import {Link} from "react-router-dom";
import {resetDashboard} from "../../dashboard/models/dashboard";
import {LuminousButton} from "../../../ui/atoms";
import {toast} from "react-toastify";
import {getErrorMessage} from "../utils";

const Container = styled.header`
    position: relative;
    width: 100%;
    height: 40px;
    box-shadow: inset 0 4px 8px -3px rgba(17, 17, 17, .06);
    background-color: ${
        props => window.location.pathname === '/boards' || !props.theme.backgroundColor
            ? '#028ee0'
            : props.theme.backgroundColor
    };
    display: flex;
    justify-content: space-between;
    padding: 4px 20px;
    align-items: center;
    color: #fff;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0, 0.25);
      z-index: 1;
    }
`;

const LogoLink = styled(Link)`
    color: #fff;
    font-weight: bold;
    font-size: 1.1rem;
    text-decoration: none;
    z-index: 1;
`;

export const Header = withRouter(withApollo(({client, history}) => {
    let {authenticated} = useStore($auth);

    const logout = () => {
        client.mutate({
            mutation: LOGOUT
        })
            .then(() => {
                resetAuth();
                resetDashboard();
                history.push('/');
            })
            .catch(error => toast.error(getErrorMessage(error)));
    };

    return (
        <>
            {
                authenticated &&
                <Container>
                    <LogoLink to={'/dashboard'}>Sticky Notes</LogoLink>
                    <LuminousButton green onClick={logout} zIndex={1}>
                        Logout
                    </LuminousButton>
                </Container>
            }
        </>
    )
}));