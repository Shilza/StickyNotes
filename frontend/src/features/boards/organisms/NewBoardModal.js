import React, {useRef} from 'react';
import styled from "styled-components";
import {Button, ColorPicker, Modal} from "../../../ui/atoms";
import {useOnClickOutside} from "../../dashboard/hooks";
import {withApollo} from "react-apollo";
import {Input} from "../../auth/atoms";
import {CREATE_BOARD} from "../api";
import {addBoard} from "../models/boards";

const ModalBody = styled.form`
     background: #f4f5f7;
     max-width: 340px;
     height: 180px;
     border-radius: 6px;
     padding: 15px 15px 30px 15px;
     box-shadow: 5px 12px 50px 3px rgba(0,0,0,0.5);
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: space-between;
`;

const Title = styled.div`
     font-size: 1.4rem;
     font-weight: bold;
     text-align: center;
`;

const CreateButton = styled(Button)`
    width: 100px;
    height: 24px;
    margin: 0;
    color: #ffffff;
    font-size: 14px;
    line-height: 1.55;
    font-weight: 600;
    border-width: 1px;
    border-radius: 3px;
    background-color: #5fba4c;
    background-position: center center;
    border-color: transparent;
    border-style: solid;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    box-shadow: 0 5px 20px 0 #52a041;
`;

const DataContainer = styled.div`
   height: 35px;
   display: flex;
   align-items: center;
`;

export const NewBoardModal = withApollo(({closePortal, client}) => {
    const modalBodyRef = useRef(null);
    const titleRef = useRef(null);
    const colorRef = useRef(null);
    useOnClickOutside(modalBodyRef, closePortal);

    const createBoard = async event => {
        event.preventDefault();
        const title = titleRef.current.value;
        const color = colorRef.current.value;

        if (title.length > 1 && title.length < 20 && color.length === 7) {
            const result = await client.mutate({
                mutation: CREATE_BOARD,
                variables: {
                    title,
                    color
                }
            });
            addBoard(result.data.createBoard);
        }

        closePortal();
    };

    return (
        <Modal>
            <ModalBody ref={modalBodyRef} onSubmit={createBoard}>
                <Title>Create board</Title>
                <DataContainer>
                    <Input ref={titleRef} placeholder='Board title'/>
                    <ColorPicker ref={colorRef} type='color' defaultValue='#0b7abb' style={{marginLeft: '5px'}}/>
                </DataContainer>
                <CreateButton type='submit'>Create</CreateButton>
            </ModalBody>
        </Modal>
    );
});