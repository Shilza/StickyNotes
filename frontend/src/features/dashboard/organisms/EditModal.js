import React, {useRef} from "react";
import styled from "styled-components";
import {Button, Modal} from "../../../ui/atoms";
import {useOnClickOutside} from "../hooks";
import {withApollo} from "react-apollo";
import {UPDATE_RECORD} from "../api";
import {updateRecord} from "../models/dashboard";


const ModalBody = styled.form`
  background: #f4f5f7;
  width: 90%;
  max-width: 600px;
  max-height: 800px;
  border-radius: 6px;
  padding: 15px;
 box-shadow: 5px 12px 50px 3px rgba(0,0,0,0.5);
 display: flex;
 flex-direction: column;
 align-items: center;
`;

const Title = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
  margin: 0 0 15px 0;
`;

const TextArea = styled.textarea`
    box-shadow: 0 4px 8px -2px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);
    width: 100%;
    min-height: 80px;
    resize: none;
`;

const SaveButton = styled(Button)`
    width: 120px;
    height: 24px;
    margin: 20px 0 10px 0;
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
    box-shadow: 0 2px 20px 0 #52a041;
`;

export const EditModal = withApollo(({closePortal, recordId, defaultText, client}) => {
    let modalBodyRef = useRef(null);
    let textAreaRef = useRef(null);
    useOnClickOutside(modalBodyRef, closePortal);

    const update = async event => {
        event.preventDefault();

        const text = textAreaRef.current.value;
        await client.mutate({
            mutation: UPDATE_RECORD,
            variables: {
                text,
                recordId
            }
        });

        updateRecord({text, recordId});
        closePortal();
    };

    return (
        <Modal>
            <ModalBody ref={modalBodyRef} onSubmit={update}>
                <Title>Edit record</Title>
                <TextArea ref={textAreaRef} defaultValue={defaultText}/>
                <SaveButton>Save</SaveButton>
            </ModalBody>
        </Modal>
    );
});