import React from 'react';
import styled from "styled-components";
import {AuthForm, Description} from "../organisms";
import {MainBackground} from "../molecules";

const Cc = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
    display: flex;
    
    @media (max-width: 660px) {
      flex-direction: column;
    }
`;

const AuthSide = styled.div`
    display: flex;
    background-color: #ffffff;
    padding: 50px;
    width: 40%;
    max-width: 500px;
    align-items: center;
    flex-direction: column;
    
    @media (max-width: 660px) {
      width: 100%;
      max-width: 100%;
      height: 100vh;
      justify-content: center;
    }
`;

const Logo = styled.div`
    font-size: 30px;
    margin-bottom: 40px;
`;

const AuthFormContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 30%;
    
    @media (max-width: 660px) {
      margin-top: 0;
    }
`;

export const Welcome = () => {
    return (
        <Cc>
            <Container>
                <MainBackground/>
                <AuthSide>
                    <AuthFormContainer>
                        <Logo>StickyNotes</Logo>
                        <AuthForm/>
                    </AuthFormContainer>
                </AuthSide>
            </Container>
            <Description/>
        </Cc>
    )
};