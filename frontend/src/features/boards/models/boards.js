import {createStore, createEvent} from 'effector';

export const setBoards = createEvent('setBoards');
export const addBoard = createEvent('addBoard');
export const resetBoards = createEvent('resetBoards');

const initialState = {
    boards: null
};

export const $boards = createStore(initialState)
    .on(setBoards, (state, boards) => {
            state.boards = boards;
            return {...state};
        }
    )
    .on(addBoard, (state, board) => {
        state.boards.push(board);
        return {...state};
    })
    .on(resetBoards, state => ({
            ...state,
            boards: null
        })
    );

