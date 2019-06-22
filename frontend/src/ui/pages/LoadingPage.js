import React from 'react';
import styled from "styled-components";
import {Loader} from "../atoms";

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`;

const Title = styled.h1`
  color: rgba(0, 0, 0, 0.75);
`;

export const LoadingPage = () => (
    <Container>
        <Title>Sticky Notes</Title>
        <Loader width='40px' height='40px' animationDuration='0.8'/>
    </Container>
);
