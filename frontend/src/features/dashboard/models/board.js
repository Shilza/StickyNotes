import {createEvent, createStore} from 'effector';

export const setCurrentBoard = createEvent('setCurrentBoard');
export const setCurrentBoardColor = createEvent('setCurrentBoardColor');
export const renameBoard = createEvent('renameBoard');
export const resetBoard = createEvent('resetBoard');

const initialState = {
    id: null,
    title: null,
    color: null,
};

export const $board = createStore(initialState)
    .on(setCurrentBoard, (state, {id, title, color}) => {
        state.id = id;
        state.title = title;
        state.color = color;
        return {...state};
    })
    .on(setCurrentBoardColor, (state, color) => {
        state.color = color;
        return {...state};
    })
    .on(renameBoard, (state, title) => {
        state.title = title;
        return {...state};
    })
    .reset(resetBoard);