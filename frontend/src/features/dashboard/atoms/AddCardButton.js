import React from 'react';
import styled from "styled-components";
import {Button, Icon} from "../../../ui/atoms";

const AddButton = styled(Button)`
    color: #6b778c;
    display: flex;
    align-items: center;
    padding: 8px;
    min-height: 32px;
    border-radius: 3px;
    
    &:hover {
       background: lightgray;
       transition: 0.3s;
    }
    
    span:first-of-type {
       margin-left: 30px;
    }
`;

export const AddCardButton = ({addNewCard}) => (
    <AddButton onClick={addNewCard}>
        <Icon name='plus'/>
        <span>Add new Card</span>
    </AddButton>
);