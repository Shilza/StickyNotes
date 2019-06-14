import React from "react";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    height: 100vh;
    width: 100%;
    background-image: url(https://cdn.pixabay.com/photo/2018/03/20/10/55/paper-3242863_960_720.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);
    }
`;

const Text = styled.div`
    position: absolute;
    top: 8%;
    left: 3%;
    font-size: 2rem;
    color: #fff;
    font-weight: bold;
    text-align: right;
    z-index: 2;
`;

const MainText = styled(Text)`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 2.5rem;
`;

export const MainBackground = () => (
    <Container>
        <Text>
            Plan Your Work
        </Text>
        <MainText>StickyNotes lets your work more collaboratively<br/>
            and get more done
        </MainText>
    </Container>
);