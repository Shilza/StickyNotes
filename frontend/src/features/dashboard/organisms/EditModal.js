import React, {useRef, useState} from "react";
import styled from "styled-components";
import {Button, Modal} from "../../../ui/atoms";
import {useOnClickOutside} from "../hooks";
import {withApollo} from "react-apollo";
import {REMOVE_RECORD, UPDATE_RECORD} from "../api";
import {removeRecord, updateRecord} from "../models/dashboard";
import {Marks, MiniMarks} from "../molecules";
import {getTimeByMs} from "../utils";


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
  margin: 0 0 8px 0;
`;

const TextArea = styled.textarea`
    margin-top: 5px;
    box-shadow: 0 4px 8px -2px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);
    width: 100%;
    min-height: 80px;
    margin-bottom: 15px;
    resize: none;
`;

const LocalButton = styled(Button)`
    width: 120px;
    height: 24px;
    margin: 20px 0 10px 0;
    color: #ffffff;
    font-size: 14px;
    line-height: 1.55;
    font-weight: 600;
    border-width: 1px;
    border-radius: 3px;
  
    background-position: center center;
    border-color: transparent;
    border-style: solid;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    
`;

const SaveButton = styled(LocalButton)`
  background-color: #5fba4c;
  box-shadow: 0 2px 20px 0 #52a041;
`;

const RemoveButton = styled(LocalButton)`
  background-color: #eb5a46;
  box-shadow: 0 2px 20px 0 #eb4947;
`;

const AddMark = styled.span`
  text-decoration: underline;
  align-self: flex-start;
  cursor: pointer;
`;

const RowContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: ${props => props.width || '100%'};
`;

const Time = styled.time`
  font-size: 0.9rem;
  color: darkgray;
`;

export const EditModal = withApollo(({closePortal, client, record}) => {
    const {
        id: recordId,
        text: defaultText,
        createdAt
    } = record;

    let modalBodyRef = useRef(null);
    let textAreaRef = useRef(null);
    let [isMarksOpen, setIsMarksOpen] = useState(false);
    useOnClickOutside(modalBodyRef, closePortal);

    const update = async event => {
        event.preventDefault();

        const text = textAreaRef.current.value;
        if (text !== defaultText && text.length > 1 && text.length < 400) {
            await client.mutate({
                mutation: UPDATE_RECORD,
                variables: {
                    text,
                    recordId
                }
            });
            updateRecord({text, recordId});
            closePortal();
        }
    };

    const openCloseMarks = () => {
        isMarksOpen ? setIsMarksOpen(false) : setIsMarksOpen(true);
    };

    const remove = async () => {
        await client.mutate({
            mutation: REMOVE_RECORD,
            variables: {
                recordId
            }
        });
        removeRecord(recordId);
        closePortal();
    };

    return (
        <Modal>
            <ModalBody ref={modalBodyRef} onSubmit={update}>
                <Title>Edit record</Title>
                <MiniMarks recordId={recordId}/>
                <TextArea ref={textAreaRef} defaultValue={defaultText}/>
                <RowContainer>
                    <AddMark onClick={openCloseMarks}>Marks</AddMark>
                    <Time datetime={createdAt}>{getTimeByMs(createdAt)}</Time>
                </RowContainer>
                {
                    isMarksOpen && <Marks recordId={recordId}/>
                }
                <RowContainer width={'280px'}>
                    <SaveButton>Save</SaveButton>
                    <RemoveButton onClick={remove}>Remove</RemoveButton>
                </RowContainer>
            </ModalBody>
        </Modal>
    );
});