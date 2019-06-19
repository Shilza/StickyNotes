import React from 'react';
import styled from "styled-components";
import {Board} from "../molecules";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 20px;
  transition: 100ms;
  
  @media (max-width: 425px) {
      margin-top: 15px;
      flex-direction: column;
      align-items: center;
  }
`;

export const BoardsList = ({boards}) => {
    return (
        <Container>
            {
                boards && boards.map(({id, title, color}) => <Board id={id} color={color} title={title} key={id}/>)
            }
        </Container>
    );
};