import {createStore, createEvent} from 'effector';
import arrayMove from "array-move";

export const setColumns = createEvent('setColumns');
export const addRecord = createEvent('addRecord');
export const addColumn = createEvent('addColumn');
export const removeColumn = createEvent('removeColumn');
export const reorderRecords = createEvent('reorderRecords');
export const resetDashboard = createEvent('resetDashboard');

const initialState = {
    columns: null
};

export const $dashboard = createStore(initialState)
    .on(setColumns, (state, columns) => {
        state.columns = columns;
    })
    .on(addRecord, (state, {columnId, record}) => {
        state.columns.forEach((column, index) => {
            if(column.id === columnId)
                state.columns[index].records.push(record);
        })
    })
    .on(addColumn, (state, column) => {
        state.columns.push(column);
    })
    .on(reorderRecords, (state, {columnId, oldIndex, newIndex}) => {
        state.columns.forEach(column => {
            if(column.id === columnId) {
                column.records = arrayMove(column.records, oldIndex, newIndex)
            }
        })
    })
    .on(removeColumn, (state, columnId) => {
        state.columns = state.columns.map(column => {
            if(column.id !== columnId)
                return column;
        });
    })
    .reset(resetDashboard);