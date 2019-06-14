import React, {useState} from 'react';
import styled from "styled-components";
import {NewCard, Title} from "../molecules";
import {AddCardButton} from "../atoms";
import {withApollo} from "react-apollo";
import {CREATE_RECORD} from "../api";
import {Cards} from "./Cards";
import {addRecord} from "../models/dashboard";
import {Icon} from "../../../ui/atoms";

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

export const Board = withApollo(({client, item}) => {
    let [newCard, setNewCard] = useState(false);

    const addNewCard = async () => {
        setNewCard(true);
    };

    const createCard = async text => {
        const result = await client.mutate({
            mutation: CREATE_RECORD,
            variables: {
                columnId: item.id,
                text
            }
        });
        addRecord({
            columnId: item.id,
            record: result.data.createRecord
        });
        //setNewCard(false);
    };

    const removeNewCard = () => {
        setNewCard(false);
    };

    return (
        <Container>
            <Title icon={<Icon name='ellipsis'/>} columnId={item.id}>
                {item.title}
            </Title>
            <Cards columnId={item.id}/>
            {
                newCard
                    ? <NewCard createCard={createCard} removeNewCard={removeNewCard}/>
                    : <AddCardButton addNewCard={addNewCard}/>
            }
        </Container>
    );
});