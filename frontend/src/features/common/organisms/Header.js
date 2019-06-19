import React, {useEffect} from 'react';
import styled from "styled-components";
import {$auth, resetAuth} from "../models/auth";
import {useStore} from "effector-react";
import {withRouter} from "react-router";
import {withApollo} from "react-apollo";
import {LOGOUT} from "../api";
import {Link} from "react-router-dom";
import {resetDashboard} from "../../dashboard/models/dashboard";
import {LuminousButton} from "../../../ui/atoms";

const Container = styled.header`
    width: 100%;
    height: 40px;
    box-shadow: inset 0 4px 8px -3px rgba(17, 17, 17, .06);
    background-color: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: space-between;
    padding: 4px 20px;
    align-items: center;
    color: #fff;
`;

const LogoLink = styled(Link)`
  color: #fff;
  font-weight: bold;
  font-size: 1.1rem;
  text-decoration: none;
`;

export const Header = withRouter(withApollo(({client, history}) => {
    let {authenticated} = useStore($auth);

    const logout = async () => {
        await client.mutate({
            mutation: LOGOUT
        });
        resetAuth();
        resetDashboard();
        history.push('/');
    };

    useEffect(() => {
        if(window.location.pathname === '/boards')
            document.getElementById('root').style.backgroundColor = '#0067a3';
    });

    return (
        <>
            {
                authenticated &&
                <Container>
                    <LogoLink to={'/dashboard'}>Sticky Notes</LogoLink>
                    <LuminousButton green onClick={logout}>
                        Logout
                    </LuminousButton>
                </Container>
            }
        </>
    )
}));