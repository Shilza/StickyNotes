import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

const Container = styled.div`
      position: relative;
      height: 100px;
      width: 200px;
      border-radius: 5px;
      background-color: ${props => props.backgroundColor || '#0b7abb'};
      margin: 10px;
      text-align: center;
      cursor: pointer;
      
      &:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0, 0, 0, 0) 100%);
          z-index: 1;
      }
      
      &:hover {
          &:before {
             background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0, 0, 0, 0) 150%);
          }
      }
`;

const Title = styled.span`
     position: absolute;
     font-weight: 600;
     font-size: 1.2rem;
     color: #fff;
     top: 2px;
     left: 50%;
     transform: translateX(-50%);
     text-decoration: none;
     z-index: 2;
`;

export const Board = ({title, color}) => (
    <Link to={`/boards/${title}`}>
        <Container backgroundColor={color}>
            <Title>{title}</Title>
        </Container>
    </Link>
);