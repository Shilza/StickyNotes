import React from 'react';
import styled from "styled-components";
import {Query} from "react-apollo";
import {Loader} from "../../../ui/atoms";
import {GET_BOARDS} from "../api";
import {useStore} from "effector-react";
import {$boards, setBoards} from "../models/boards";
import {BoardsList, ControlPanel} from "../organisms";

const Container = styled.div`
    background-color: #fafbfc;
    padding: 20px 10px;
    width: 100%;
    height: calc(100% - 40px);
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

export const Boards = () => {
    const {boards} = useStore($boards);

    return (
        <Container>
            <Query query={GET_BOARDS}>
                {({data, loading, error}) => {
                    if (loading)
                        return <Loader width='40px' height='40px' color='#fff' animationDuration='0.8'/>;
                    if (error)
                        return <div>Error</div>;

                    if(Object.is(boards, null))
                        setBoards(data.boards);
                    return (
                        <Main>
                            <ControlPanel/>
                            <BoardsList boards={data.boards}/>
                        </Main>
                    );
                }}
            </Query>
        </Container>
    );
};