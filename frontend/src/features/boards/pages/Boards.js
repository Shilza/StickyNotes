import React from 'react';
import styled from "styled-components";
import {Query} from "react-apollo";
import {Loader} from "../../../ui/atoms";
import {GET_BOARDS} from "../api";
import {setBoards} from "../models/boards";
import {BoardsList, ControlPanel} from "../organisms";

const Container = styled.div`
    background-color: #fafbfc;
    padding: 20px 10px;
    width: 100%;
    height: calc(100% - 40px);
    overflow-x: auto;
`;

const Main = styled.div`
    display: flex;
    align-items: flex-start;
    width: 100%;
    max-width: 1240px;
    margin: 15px auto 0;
    
    @media (max-width: 425px) {
      flex-direction: column;
      align-items: center;
    }
`;

export const Boards = () => (
    <Query query={GET_BOARDS} fetchPolicy='no-cache'>
        {({data, loading, error}) => {
            if (loading)
                return <Loader width='40px' height='40px' color='#fff' animationDuration='0.8'/>;
            if (error)
                return <div>Error</div>;

            setBoards(data.boards);
            return (
                <Container>
                    <Main>
                        <ControlPanel/>
                        <BoardsList/>
                    </Main>
                </Container>
            );
        }}
    </Query>
);