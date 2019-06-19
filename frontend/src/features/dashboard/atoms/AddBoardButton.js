import React from 'react';
import styled from "styled-components";
import {Button} from "../../../ui/atoms";

const BoardButton = styled(Button)`
    background-color: rgba(0,0,0,.12);
    cursor: pointer;
    color: #fff;
    border-radius: 3px;
    height: auto;
    min-height: 32px;
    padding: 6px 10px;
    min-width: 270px;
    max-width: 270px;
    
    @media (max-width: 425px) {
      margin: 0 auto;
    }
`;

export const AddBoardButton = ({addColumn}) => (
    <BoardButton onClick={addColumn}>
        + Add new list
    </BoardButton>
);