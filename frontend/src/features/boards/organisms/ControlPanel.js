import React from 'react';
import styled from "styled-components";
import {Button, Icon, SvgIcon} from "../../../ui/atoms";
import usePortal from "react-useportal";
import {NewBoardModal} from "./NewBoardModal";

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  width: 220px;
`;

const LocalButton = styled(Button)`
    text-align: left;
    background-color: #e4f0f6;
    color: #026aa7;
    width: 100%;
    border-radius: 5px;
    box-shadow: none;
    font-weight: 700;
    min-height: 20px;
    min-width: 160px;
    overflow: hidden;
    padding: 6px 12px;
    text-decoration: none;
    transition-duration: 85ms;
    margin: 0 0 5px;
    display: flex;
    align-items: center;
`;

const CreateBoard = styled(Button)`
  display: flex;
  align-items: center;
  transition: 100ms;
  border-radius: 5px;
  min-height: 30px;
  width: 100%;
  text-align: left;
  padding: 6px 12px;

  &:hover {
    background-color: #dfe0e4;
  }
  &:active {
    background-color: lightgray;
  }
`;

export const ControlPanel = () => {
    const {openPortal, closePortal, isOpen, Portal} = usePortal();

    const openCloseModal = () => {
        isOpen ? closePortal() : openPortal();
    };

    return (
        <Container>
            <LocalButton>
                <SvgIcon name='board' viewBox="0 0 512.004 512.004" style={{marginRight: '10px'}}/>
                Boards
            </LocalButton>
            <CreateBoard onClick={openCloseModal}>
                <Icon name='plus'/>
                Create board
            </CreateBoard>
            {
                isOpen &&
                    <Portal>
                        <NewBoardModal closePortal={closePortal}/>
                    </Portal>
            }
        </Container>
    );
};