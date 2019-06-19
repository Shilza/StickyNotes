import React, {useState} from 'react';
import {NewColumn} from "../organisms";
import styled from "styled-components";
import {AddBoardButton} from "../atoms";
import {Query, withApollo} from "react-apollo";
import {CREATE_COLUMN, GET_COLUMNS} from "../api";
import {Boards} from "../organisms/Boards";
import {Loader} from "../../../ui/atoms";
import {$dashboard, addColumn, setColumns} from "../models/dashboard";
import {useStore} from "effector-react";

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    background-color: rgb(0, 121, 191);
    padding: 20px 10px;
    width: 100%;
    height: calc(100% - 40px);
    overflow-x: auto;
`;

export const Dashboard = withApollo(({client}) => {
    let [isNewColumn, setIsNewColumn] = useState(false);
    let {columns} = useStore($dashboard);

    const addNewColumn = () => {
        setIsNewColumn(true);
    };

    const createColumn = async title => {
        if(title.length > 0 && title.length < 20) {
            const result = await client.mutate({
                mutation: CREATE_COLUMN,
                variables: {
                    title
                }
            });
            addColumn(result.data.createColumn);
        }
    };

    const removeColumn = () => {
        setIsNewColumn(false);
    };

    return (
        <Container>
            <Query query={GET_COLUMNS}>
                {({data, loading, error}) => {
                    if(loading)
                        return <Loader width='40px' height='40px' color='#fff' animationDuration='0.8'/>;
                    if(error)
                        return <div>Error</div>;

                    if(Object.is(columns, null))
                        setColumns(data.columns);
                    return (
                        <>
                            <Boards/>
                            {
                                isNewColumn
                                    ? <NewColumn createColumn={createColumn} removeColumn={removeColumn}/>
                                    : <AddBoardButton addColumn={addNewColumn}/>
                            }
                        </>
                    );
                }}
            </Query>
        </Container>
    );
});