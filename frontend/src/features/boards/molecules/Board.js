import React from 'react';
import styled from "styled-components";
import {withRouter} from "react-router";

const Container = styled.div`
position: relative;
  height: 100px;
  width: 200px;
  border-radius: 5px;
  background-color: ${props => props.backgroundColor || '#0b7abb'};
  margin: 10px;
  text-align: center;
  cursor: pointer;
 
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
  color: #fff;
  
    &:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(246,41,12,0) 100%);
  }
`;

export const Board = withRouter(({title, color, history}) => {

    const toLists = () => {
        history.push(`/boards/${title}`);
    };

    return (
        <Container backgroundColor={color} onClick={toLists}>
            <Title>{title}</Title>
        </Container>
    )
});