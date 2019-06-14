import React, {useState} from 'react';
import styled from "styled-components";
import {Header} from "../molecules";
import {SignInForm, SignUpForm} from "../molecules";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const AuthForm = () => {
    let [isSignIn, setIsSignIn] = useState(true);

    return (
        <Container>
            <Header isSignIn={isSignIn} setIsSignIn={setIsSignIn}/>
            {
                isSignIn
                    ? <SignInForm/>
                    : <SignUpForm/>
            }
        </Container>
    );
};