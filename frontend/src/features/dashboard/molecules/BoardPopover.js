import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import {useOnClickOutside} from "../hooks";
import {Popover} from "../../../ui/organisms";
import {PopoverTitle} from "../../../ui/molecules";
import {ColorPicker, Loader, PopoverButton} from "../../../ui/atoms";
import {withApollo} from "react-apollo";
import {$board, setCurrentBoardColor} from "../models/board";
import {useStore} from "effector-react";
import {CHANGE_BOARD_COLOR, REMOVE_BOARD} from "../api";
import {withRouter} from "react-router";
import {toast} from "react-toastify";
import {getErrorMessage} from "../../common/utils";

const ChangeColorContainer = styled.label`
  margin: 10px 5px;
  display: flex;
  justify-content: center;
  width: 100%;
  color: #000;
  cursor: pointer;
`;

const ChangeColor = styled.span`
  margin-right: 10px;
`;

export const BoardPopover = withRouter(withApollo(({closePopover, history, client}) => {
    let {id, color} = useStore($board);
    let popoverRef = useRef(null);
    let colorRef = useRef(null);
    let [isLoading, setIsLoading] = useState(false);

    const onChangeColor = event => {
        const newColor = event.target.value;
        setCurrentBoardColor(newColor);
        client.mutate({
            mutation: CHANGE_BOARD_COLOR,
            variables: {
                boardId: id,
                color: newColor
            }
        }).catch(error => toast.error(getErrorMessage(error)));
    };

    useOnClickOutside(popoverRef, closePopover);

    const removeBoard = () => {
        setIsLoading(true);
        client.mutate({
            mutation: REMOVE_BOARD,
            variables: {
                boardId: id
            }
        })
            .then(() => history.push('/boards'))
            .catch(error => toast.error(getErrorMessage(error)))
    };

    const onClickChangeColor = () => {
        colorRef.current.click();
    };

    return (
        <Popover ref={popoverRef} left='calc(100% - 310px)' top='38px'>
            <PopoverTitle>Actions with board</PopoverTitle>
            <ChangeColorContainer htmlFor='colorPicked' onClick={onClickChangeColor}>
                <ChangeColor>Change color</ChangeColor>
                <ColorPicker onChange={onChangeColor} ref={colorRef} defaultValue={color}/>
            </ChangeColorContainer>
            <PopoverButton onClick={removeBoard} disabled={isLoading}>
                Remove board
                {
                    isLoading && <Loader color='#fff'/>
                }
            </PopoverButton>
        </Popover>
    );
}));