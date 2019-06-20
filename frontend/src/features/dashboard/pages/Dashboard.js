import React, {useEffect} from 'react';
import {BoardHeader, NewColumnContainer} from "../organisms";
import styled from "styled-components";
import {Query, withApollo} from "react-apollo";
import {GET_BOARD, GET_COLUMNS} from "../api";
import {Columns} from "../organisms/Columns";
import {Loader} from "../../../ui/atoms";
import {setColumns} from "../models/dashboard";
import {setCurrentBoard} from "../models/board";
import {toast} from "react-toastify";
import {getErrorMessage} from "../../common/utils";

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
  background-color: ${props => props.theme.backgroundColor || '#0067a3'}
`;

export const Dashboard = withApollo(({match: {params: {title: boardTitle}}, client}) => {
    useEffect(() => {
        client.query({
            query: GET_BOARD,
            variables: {
                title: boardTitle
            }
        }).then(({data}) => {
            setCurrentBoard(data.board);
        }).catch(error => toast.error(getErrorMessage(error)));
    }, [client, boardTitle]);

    return (
        <Container>
            <Query query={GET_COLUMNS} variables={{title: boardTitle}} fetchPolicy='no-cache'>
                {({data, loading, error}) => {
                    if (loading)
                        return <Loader width='40px' height='40px' color='#fff' animationDuration='0.8'/>;
                    if (error)
                        return <div>Error</div>;

                    setColumns(data.columns);
                    return (
                        <>
                            <BoardHeader/>
                            <MainContent>
                                <Columns/>
                                <NewColumnContainer boardTitle={boardTitle}/>
                            </MainContent>
                        </>
                    );
                }}
            </Query>
        </Container>
    );
});