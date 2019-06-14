import React, {useRef} from 'react';
import styled from "styled-components";
import {useOnClickOutside} from "../hooks";
import {Button, Icon} from "../../../ui/atoms";

const Container = styled.form`
    display: flex;
    flex-direction: column;
    min-height: 90px;
    margin-bottom: 6px;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
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

const TextArea = styled.textarea`
    height: 55px;
    resize: none;
    border-radius: 3px;
`;

export const NewCard = ({createCard, removeNewCard}) => {

    const ref = useRef(null);
    const textRef = useRef(null);
    useOnClickOutside(ref, removeNewCard);

    const onSubmit = event => {
        event.preventDefault();
        createCard(textRef.current.value);
    };

    return (
        <Container onSubmit={onSubmit} ref={ref}>
            <TextArea ref={textRef} placeholder='Enter text'/>
            <ButtonContainer>
                <AddButton type='submit'>
                    Add card
                </AddButton>
                <Icon name='close'/>
            </ButtonContainer>
        </Container>
    );
};