import {createStore, createEvent} from 'effector';
import arrayMove from "array-move";

export const setColumns = createEvent('setColumns');
export const addRecord = createEvent('addRecord');
export const addColumn = createEvent('addColumn');
export const removeColumn = createEvent('removeColumn');
export const reorderRecords = createEvent('reorderRecords');
export const updateRecord = createEvent('updateRecord');
export const resetDashboard = createEvent('resetDashboard');

const initialState = {
    columns: null
};

export const $dashboard = createStore(initialState)
    .on(setColumns, (state, columns) => {
        state.columns = columns;
        return {...state};
    })
    .on(addRecord, (state, {columnId, record}) => {
        state.columns.map((column, index) => {
            if(column.id === columnId)
                state.columns[index].records.push(record);

            return column;
        });
        return {...state};
    })
    .on(addColumn, (state, column) => {
        if(!Array.isArray(column.records))
            column.records = [];
        state.columns.push(column);

        return {...state};
    })
    .on(reorderRecords, (state, {columnId, oldIndex, newIndex}) => {
        state.columns.map(column => {
            if(column.id === columnId)
                column.records = arrayMove(column.records, oldIndex, newIndex);
            return column;
        });
        return {...state};
    })
    .on(updateRecord, (state, {recordId, text}) => {
        state.columns.forEach(column => {
            column.records.forEach(record => {
                if(record.id === recordId)
                    record.text = text;
            })
        });
        return {...state};
    })
    .on(removeColumn, (state, columnId) => {
        state.columns = state.columns.filter(column => column.id !== columnId);
        return {...state};
    })
    .reset(resetDashboard);