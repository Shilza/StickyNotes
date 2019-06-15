import React, {useRef} from 'react';
import styled from "styled-components";
import {useOnClickOutside} from "../hooks";
import {Button} from "../../../ui/atoms";

const Container = styled.div`
    background: #dfe1e6;
    border-radius: 3px;
    min-width: 270px;
    min-height: 85px;
    padding: 4px 10px;
    display: flex;
    flex-direction: column;
    white-space: normal;
    margin: 0 10px;
`;

const TitleInput = styled.input`
    
`;

const AddButton = styled(Button)`
    background-color: #5aac44;
    box-shadow: 0 1px 0 0 #3f6f21;
    color: #fff;
    font-weight: 700;
    line-height: 20px;
    margin: 8px 4px 0 0;
    padding: 6px 12px;
    min-width: 60%;
`;


export const NewColumn = ({removeColumn, createColumn}) => {
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    useOnClickOutside(containerRef, removeColumn);

    const onClickAdd = () => {
        createColumn(inputRef.current.value);
    };

    return (
        <Container ref={containerRef}>
            <TitleInput ref={inputRef}/>
            <AddButton onClick={onClickAdd}>Add column</AddButton>
        </Container>
    );
};