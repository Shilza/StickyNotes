import React from 'react';
import styled from "styled-components";
import back from "./back.png";
import {Button} from "../../../ui/atoms";

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  color: #fff;
  text-align: center;
  padding: 15vh 10% 0 10%;
  font-family: "Century Gothic", 'sans-serif';
  
  &:before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 100%;
    height: 75%;
    z-index: -1;
    background: linear-gradient(#0f1a38, #2564b9);
  }
  
  &:after {
    content: '';
    width: 43%;
    height: 47%;
    z-index: 2;
    position: absolute;
    top: 82%;
    left: 50%;
    transform: translate(-50%, -82%);
    background-image: url(${back});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    transition: 0.5s;
  }
  
  @media (max-width: 425px) {
    &:after {
      width: 70%;
      height: 25%;
    }
  }
  
  @media (min-width: 650px) {
     &:after {
      width: 50%;
      height: 35%;
    }
  }
  
  @media (min-width: 900px) {
     &:after {
      width: 32%;
      height: 35%;
    }
  }
  
  @media (min-width: 1440px) {
     &:after {
      width: 30%;
      height: 35%;
    }
  }
`;

const Title = styled.h2`
  margin: 0 0 20px;
  font-size: 2rem;
`;

const Text = styled.div`
  font-size: 1.4rem;
`;

const GoToBoardsButton = styled(Button)`
    width: 150px;
    height: 36px;
    margin: 20px 0;
    color: #ffffff;
    font-size: 14px;
    line-height: 1.55;
    font-weight: 600;
    border-width: 1px;
    border-radius: 5px;
    background-color: #5fba4c;
    background-position: center center;
    border-color: transparent;
    border-style: solid;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    box-shadow: 0 5px 20px 0 #52a041;
`;

export const Description = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <Container>
            <Title>For Startups</Title>
            <Text>From development to launch, building a team to building a business, see
                <br/> how Sticky Notes help startups succeed
            </Text>
            <GoToBoardsButton onClick={scrollToTop}>Go To Your Boards</GoToBoardsButton>
        </Container>
    );
};