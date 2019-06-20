import React, {useState} from 'react';
import styled from "styled-components";
import {NewCard, Title} from "../molecules";
import {AddCardButton} from "../atoms";
import {withApollo} from "react-apollo";
import {CREATE_RECORD} from "../api";
import {Cards} from "./Cards";
import {addRecord} from "../models/dashboard";
import {Icon} from "../../../ui/atoms";
import {toast} from "react-toastify";
import {getErrorMessage} from "../../common/utils";

const Container = styled.div`
    background: #dfe1e6;
    border-radius: 3px;
    width: 270px;
    padding: 4px 10px 6px 10px;
    display: flex;
    flex-direction: column;
    white-space: normal;
    margin: 0 10px;
    height: 100%;
    max-height: calc(100vh - 100px);
`;

export const Column = withApollo(({client, item}) => {
    let [newCard, setNewCard] = useState(false);

    const addNewCard = () => {
        setNewCard(true);
    };

    const createCard = text => {
        if (text.length > 0 && text.length < 400) {
            client.mutate({
                mutation: CREATE_RECORD,
                variables: {
                    columnId: item.id,
                    text
                }
            })
                .then(({data}) => {
                    addRecord({
                        columnId: item.id,
                        record: data.createRecord
                    });
                })
                .catch(error => toast.error(getErrorMessage(error)));
        }
    };

    const removeNewCard = () => {
        setNewCard(false);
    };

    return (
        <Container>
            <Title icon={<Icon name='ellipsis'/>} columnId={item.id}>
                {item.title}
            </Title>
            <Cards columnId={item.id} records={item.records}/>
            {
                newCard
                    ? <NewCard createCard={createCard} removeNewCard={removeNewCard}/>
                    : <AddCardButton addNewCard={addNewCard}/>
            }
        </Container>
    );
});