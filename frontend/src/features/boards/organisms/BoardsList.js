import React from 'react';
import styled from "styled-components";
import {Board} from "../molecules";
import {$boards} from "../models/boards";
import {useStore} from "effector-react";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 20px;
  transition: 100ms;
  height: 100%;
  
  @media (max-width: 425px) {
      margin-top: 15px;
      flex-direction: column;
      align-items: center;
  }
`;

export const BoardsList = () => {
    let {boards} = useStore($boards);

    return (
        <Container>
            {
                boards && boards.map(({id, title, color}) => <Board id={id} color={color} title={title} key={id}/>)
            }
        </Container>
    );
};