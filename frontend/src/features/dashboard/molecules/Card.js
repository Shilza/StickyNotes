import React, {useState} from 'react';
import styled from "styled-components";
import {Button, Icon} from "../../../ui/atoms";
import usePortal from "react-useportal";
import {EditModal} from "../organisms";

const Container = styled.li`
    position: relative;
    background: #fff;
    min-height: 30px;
    border-radius: 3px;
    margin: 8px 0;
    padding: 4px;
    cursor: grab;
    word-break: break-all;
    transition: 0.1s;
    
    &:hover {
      background: whitesmoke;
    }
`;

const EditButton = styled(Button)`
  position: absolute;
  left: calc(100% - 30px);
  top: 1px;
  transform: translateZ(0);
  height: 28px;
  width: 28px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  background: lightgray;
  
  &:hover {
   background: darkgray;
  }
  
  &:active {
    background: gray;
  }
`;

export const Card = ({children, recordId}) => {
    let [isEditHovered, setIsEditHovered] = useState(false);
    const {openPortal, closePortal, isOpen, Portal} = usePortal();

    const modalOpenClose = () => {
        isOpen ? closePortal() : openPortal();
    };

    return (
        <Container onMouseOver={() => setIsEditHovered(true)} onMouseLeave={() => setIsEditHovered(false)}>
            {children}
            {
                isEditHovered &&
                <EditButton onClick={modalOpenClose}>
                    <Icon name='edit'/>
                </EditButton>
            }
            {
                isOpen &&
                <Portal>
                    <EditModal
                        closePortal={closePortal}
                        text={children}
                        recordId={recordId}
                    />
                </Portal>
            }
        </Container>
    );
};