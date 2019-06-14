import {createStore, createEvent} from 'effector';

export const setUser = createEvent('setUser');
export const resetAuth = createEvent('resetAuth');

const initialState = {
    authenticated: false,
    user: null
};

export const $auth = createStore(initialState)
    .on(setUser, (state, user) => {
        state.user = user;
        state.authenticated = true;
    })
    .on(resetAuth, state => {
        state.authenticated = false;
        state.user = null;
    });

