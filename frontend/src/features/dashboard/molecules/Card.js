import React from 'react';
import styled from "styled-components";

const Container = styled.li`
    background: #fff;
    min-height: 30px;
    border-radius: 3px;
    margin: 8px 0;
    padding: 4px;
    
`;

export const Card = ({children}) => (
    <Container>
        {children}
    </Container>
);