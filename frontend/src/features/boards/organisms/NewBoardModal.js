import React, {useRef} from 'react';
import styled from "styled-components";
import {ColorPicker, LuminousButton, Modal} from "../../../ui/atoms";
import {useOnClickOutside} from "../../dashboard/hooks";
import {withApollo} from "react-apollo";
import {Input} from "../../auth/atoms";
import {CREATE_BOARD} from "../api";
import {addBoard} from "../models/boards";
import {toast} from 'react-toastify';
import {getErrorMessage} from "../../common/utils";

const ModalBody = styled.form`
     background: #f4f5f7;
     max-width: 340px;
     height: 200px;
     border-radius: 6px;
     padding: 15px;
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

const ChooseColor = styled.span`
    margin-right: 15px;
`;

const DataContainer = styled.div`
   position: relative;
   height: 35px;
   width: 100%;
   display: flex;
   align-items: center;
   padding: 0 5px;
   cursor: pointer;
`;

export const NewBoardModal = withApollo(({closePortal, client}) => {
    const modalBodyRef = useRef(null);
    const titleRef = useRef(null);
    const colorRef = useRef(null);
    useOnClickOutside(modalBodyRef, closePortal);

    const createBoard = event => {
        event.preventDefault();
        const title = titleRef.current.value;
        const color = colorRef.current.value;

        if (title.length > 1 && title.length < 20 && color.length === 7) {
            client.mutate({
                mutation: CREATE_BOARD,
                variables: {
                    title,
                    color
                }
            }).then(({data}) => {
                addBoard(data.createBoard);
            }).catch(error => toast.error(getErrorMessage(error)));
        }

        closePortal();
    };

    const onClickChooseColor = () => {
        colorRef.current.click();
    };

    return (
        <Modal>
            <ModalBody ref={modalBodyRef} onSubmit={createBoard}>
                <Title>Create board</Title>
                <div>
                    <Input ref={titleRef} placeholder='Board title'/>
                    <DataContainer onClick={onClickChooseColor}>
                        <ChooseColor>Choose color</ChooseColor>
                        <ColorPicker ref={colorRef} type='color' defaultValue='#0b7abb'/>
                    </DataContainer>
                </div>
                <LuminousButton type='submit' green margin={'0 0 5px 0'}>Create</LuminousButton>
            </ModalBody>
        </Modal>
    );
});