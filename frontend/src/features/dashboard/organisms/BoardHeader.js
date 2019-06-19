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

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  padding: 0 10px 10px;
  display: flex;
`;

const Btn = styled(Button)`
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

    const renameBoardd = async () => {
        const newTitle = titleRef.current.value;

        if(newTitle !== title) {
            await client.mutate({
                mutation: RENAME_BOARD,
                variables: {
                    boardId: id,
                    title: newTitle
                }
            });
            renameBoard(newTitle);
        }
        setIsTitleEdited(false);
    };

    useOnClickOutside(titleRef, renameBoardd);

    return (
        <Container>
            <HomeButton to='/boards'>
                <SvgIcon name='home' viewBox='0 0 611.997 611.998' fill='#fff' width={'1.1em'} height={'1.1em'}/>
            </HomeButton>
            {
                isTitleEdited
                ? <Input ref={titleRef} defaultValue={title}/>
                : <Btn onClick={editTitle}>{title}</Btn>
            }
            <Btn marginLeft='auto' onClick={openPopover}>
                <Icon color='#fff' name={'ellipsis'}/>
            </Btn>
            {
                isPopoverOpen && <BoardPopover closePopover={closePopover}/>
            }
        </Container>
    );
});