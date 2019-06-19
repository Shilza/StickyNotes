import React, {useEffect, useState} from 'react';
import {BoardHeader, NewColumn} from "../organisms";
import styled from "styled-components";
import {AddBoardButton} from "../atoms";
import {Query, withApollo} from "react-apollo";
import {CREATE_COLUMN, GET_BOARD, GET_COLUMNS} from "../api";
import {Boards} from "../organisms/Boards";
import {Loader} from "../../../ui/atoms";
import {$dashboard, addColumn, setColumns} from "../models/dashboard";
import {useStore} from "effector-react";
import {$board, setCurrentBoard} from "../models/board";

const MainContent = styled.div`
   display: flex;
   align-items: flex-start;
   width: 100%;
   height: 100%;
   margin-top: 10px;
   overflow-x: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 40px);
  padding: 10px 1% 0 1%;
`;

export const Dashboard = withApollo(({match: {params: {title: boardTitle}}, client}) => {
    let [isNewColumn, setIsNewColumn] = useState(false);
    let {columns} = useStore($dashboard);
    let {color} = useStore($board);

    const addNewColumn = () => {
        setIsNewColumn(true);
    };

    const createColumn = async title => {
        if (title.length > 0 && title.length < 20) {
            const result = await client.mutate({
                mutation: CREATE_COLUMN,
                variables: {
                    title,
                    boardTitle
                }
            });
            addColumn(result.data.createColumn);
        }
    };

    const removeColumn = () => {
        setIsNewColumn(false);
    };

    useEffect(() => {
        client.query({
            query: GET_BOARD,
            variables: {
                title: boardTitle
            }
        }).then(({data}) => {
            setCurrentBoard(data.board);
        });
    }, [client, boardTitle]);

    useEffect(() => {
        document.getElementById('root').style.backgroundColor = color;
    }, [color]);

    return (
        <Query query={GET_COLUMNS} variables={{title: boardTitle}}>
            {({data, loading, error}) => {
                if (loading)
                    return <Loader width='40px' height='40px' color='#fff' animationDuration='0.8'/>;
                if (error)
                    return <div>Error</div>;

                if (Object.is(columns, null))
                    setColumns(data.columns);
                return (
                    <Container>
                        <BoardHeader/>
                        <MainContent>
                            <Boards/>
                            {
                                isNewColumn
                                    ? <NewColumn createColumn={createColumn} removeColumn={removeColumn}/>
                                    : <AddBoardButton addColumn={addNewColumn}/>
                            }
                        </MainContent>
                    </Container>
                );
            }}
        </Query>
    );
});