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

const ChangeColor = styled.label`
  margin: 10px auto;
  display: flex;
  color: #000;
`;

export const BoardPopover = withRouter(withApollo(({closePopover, history, client}) => {
    let {id, color} = useStore($board);
    let popoverRef = useRef(null);
    let colorRef = useRef(null);
    let [isLoading, setIsLoading] = useState(false);

    const colorChange = async () => {
        const newColor = colorRef.current && colorRef.current.value;
        if (newColor && newColor.length === 7)
            await client.mutate({
                mutation: CHANGE_BOARD_COLOR,
                variables: {
                    boardId: id,
                    color: newColor
                }
            });
        closePopover();
    };

    const onChangeColor = event => {
        setCurrentBoardColor(event.target.value);
    };

    useOnClickOutside(popoverRef, colorChange);

    const remove = async () => {
        setIsLoading(true);
        await client.mutate({
            mutation: REMOVE_BOARD,
            variables: {
                boardId: id
            }
        });

        setIsLoading(false);
        closePopover();
        history.push('/boards');
    };

    return (
        <Popover ref={popoverRef} left='calc(100% - 310px)' top='38px'>
            <PopoverTitle>Actions with board</PopoverTitle>
            <ChangeColor htmlFor='colorPicked'>
                Change color
                <ColorPicker onChange={onChangeColor} ref={colorRef} defaultValue={color}/>
            </ChangeColor>
            <PopoverButton onClick={remove} disabled={isLoading}>
                Remove board
                {
                    isLoading && <Loader color='#fff'/>
                }
            </PopoverButton>
        </Popover>
    );
}));