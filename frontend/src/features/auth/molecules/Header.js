import React from 'react';
import styled from "styled-components";
import {Button} from "../../../ui/atoms";

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 10px 0;
    width: 100%;
`;

const Location = styled(Button)`    
    height: 35px;
    min-width: 80px;
    color: #d1d1d1;
    transition: 0.4s;
    box-shadow: ${props => props.active && ' inset 0 -0.175em white, inset 0 -0.2em #00bcd5;'}
`;

export const Header = ({setIsSignIn, isSignIn}) => {
    const setSingIn = () => {
        setIsSignIn(true);
    };

    const setSignUp = () => {
        setIsSignIn(false);
    };

    return (
        <Container>
            <Location
                onClick={setSingIn}
                active={isSignIn}
            >
                Sign In
            </Location>
            <Location
                onClick={setSignUp}
                active={!isSignIn}
            >
                Sign Up
            </Location>
        </Container>
    );
};