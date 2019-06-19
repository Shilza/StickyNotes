import React, {useRef} from 'react';
import styled from "styled-components";
import {useOnClickOutside} from "../hooks";
import {Button} from "../../../ui/atoms";

const Container = styled.form`
    display: flex;
    flex-direction: column;
    min-height: 90px;
    margin-bottom: 6px;
`;
const AddButton = styled(Button)`
    background-color: #5aac44;
    box-shadow: 0 1px 0 0 #3f6f21;
    color: #fff;
    font-weight: 700;
    margin: 8px 4px 0 0;
    padding: 6px 12px;
    width: 100%;
`;

const TextArea = styled.textarea`
    height: 55px;
    resize: none;
    border-radius: 3px;
`;

export const NewCard = ({createCard, removeNewCard}) => {

    const ref = useRef(null);
    const textRef = useRef(null);
    useOnClickOutside(ref, removeNewCard);

    const onSubmit = async event => {
        event.preventDefault();
        await createCard(textRef.current.value);
        if(textRef.current)
            textRef.current.value = '';
    };

    return (
        <Container onSubmit={onSubmit} ref={ref}>
            <TextArea ref={textRef} placeholder='Enter text'/>
            <AddButton type='submit'>
                Add card
            </AddButton>
        </Container>
    );
};