import React, {useState, useRef} from 'react';
import styled from "styled-components";
import {Button, Icon, SvgIcon} from "../../../ui/atoms";
import {BoardPopover} from "../molecules/BoardPopover";
import {Link} from "react-router-dom";
import {useOnClickOutside} from "../hooks";
import {Input} from "../../auth/atoms";
import {$board, renameBoard} from "../models/board";
import {useStore} from "effector-react";
import {RENAME_BOARD} from "../api";
import {withApollo} from "react-apollo";
import {toast} from "react-toastify";
import {getErrorMessage} from "../../common/utils";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  padding: 0 10px 10px;
  display: flex;
`;

const LocalButton = styled(Button)`
    position: relative;
    color: #fff;
    height: 30px;
    padding: 4px 20px;
    border-radius: 5px;
    transition: 100ms;
    margin-left: ${props => props.marginLeft};
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.35);
    }
`;

const HomeButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 3px;
  background-color: hsla(0,0%,100%,.2);
  margin-right: 5px;
`;

export const BoardHeader = withApollo(({client}) => {
    let {id, title} = useStore($board);
    let [isPopoverOpen, setIsPopoverOpen] = useState(false);
    let [isTitleEdited, setIsTitleEdited] = useState(false);
    let titleRef = useRef(null);

    const openPopover = () => {
        setIsPopoverOpen(true);
    };

    const closePopover = () => {
        setIsPopoverOpen(false);
    };

    const editTitle = () => {
        setIsTitleEdited(true);
    };

    const rename = () => {
        const newTitle = titleRef.current.value;

        if (newTitle !== title) {
            client.mutate({
                mutation: RENAME_BOARD,
                variables: {
                    boardId: id,
                    title: newTitle
                }
            })
                .then(() => renameBoard(newTitle))
                .catch(error => toast.error(getErrorMessage(error)));
        }
        setIsTitleEdited(false);
    };

    useOnClickOutside(titleRef, rename);

    return (
        <Container>
            <HomeButton to='/boards' aria-label='Go to boards list'>
                <SvgIcon name='home' viewBox='0 0 611.997 611.998' fill='#fff' width={'1.1em'} height={'1.1em'}/>
            </HomeButton>
            {
                isTitleEdited
                    ? <Input autoFocus ref={titleRef} defaultValue={title} height={'30px'}/>
                    : <LocalButton onClick={editTitle} aria-label='Edit board title'>{title}</LocalButton>
            }
            <LocalButton marginLeft='auto' onClick={openPopover} aria-label='Open board options'>
                <Icon color='#fff' name={'ellipsis'}/>
            </LocalButton>
            {
                isPopoverOpen && <BoardPopover closePopover={closePopover}/>
            }
        </Container>
    );
});