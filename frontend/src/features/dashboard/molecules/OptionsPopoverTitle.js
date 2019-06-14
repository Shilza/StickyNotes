import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    box-sizing: border-box;
    color: #6b778c;
    display: block;
    line-height: 40px;
    border-bottom: 1px solid rgba(9,30,66,.13);
    margin: 0 12px;
    overflow: hidden;
    padding: 0 32px;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 1;
`;

export const OptionsPopoverTitle = ({children}) => (
    <Container>
        {children}
    </Container>
);