import {createStore, createEvent} from 'effector';
import arrayMove from "array-move";

export const setColumns = createEvent('setColumns');
export const reorderColumns = createEvent('reorderColumns');
export const addRecord = createEvent('addRecord');
export const addMark = createEvent('addMark');
export const removeMark = createEvent('removeMark');
export const addColumn = createEvent('addColumn');
export const removeColumn = createEvent('removeColumn');
export const reorderRecords = createEvent('reorderRecords');
export const updateRecord = createEvent('updateRecord');
export const renameColumn = createEvent('renameColumn');
export const removeRecord = createEvent('removeRecord');
export const resetDashboard = createEvent('resetDashboard');

const initialState = {
    columns: null
};

export const $dashboard = createStore(initialState)
    .on(setColumns, (state, columns) => {
        state.columns = columns;
        return {...state};
    })
    .on(reorderColumns, (state, {oldIndex, newIndex}) => {
        const tempIndex = state.columns[oldIndex].index;
        state.columns[oldIndex].index = state.columns[newIndex].index;
        state.columns[newIndex].index = tempIndex;

        state.columns = arrayMove(state.columns, oldIndex, newIndex);
        return {...state};
    })
    .on(addRecord, (state, {columnId, record}) => {
        state.columns.map((column, index) => {
            if (column.id === columnId)
                state.columns[index].records.push(record);

            return column;
        });
        return {...state};
    })
    .on(addColumn, (state, column) => {
        if (!Array.isArray(column.records))
            column.records = [];
        state.columns.push(column);

        return {...state};
    })
    .on(reorderRecords, (state, {columnId, oldIndex, newIndex}) => {
        state.columns.map(column => {
            if (column.id === columnId) {
                const tempIndex = column.records[oldIndex].index;
                column.records[oldIndex].index = column.records[newIndex].index;
                column.records[newIndex].index = tempIndex;

                column.records = arrayMove(column.records, oldIndex, newIndex);
            }
            return column;
        });
        return {...state};
    })
    .on(updateRecord, (state, {recordId, text}) => {
        state.columns.forEach(column => {
            column.records.forEach(record => {
                if (record.id === recordId)
                    record.text = text;
            })
        });
        return {...state};
    })
    .on(removeColumn, (state, columnId) => {
        state.columns = state.columns.filter(column => column.id !== columnId);
        return {...state};
    })
    .on(addMark, (state, {recordId, mark}) => {
        const index = state.columns.findIndex(column => column.records.find(record => record.id === recordId));
        state.columns[index].records.forEach(record => {
            if (record.id === recordId)
                record.marks = [...record.marks, mark];
        });
        return {...state};
    })
    .on(removeMark, (state, markId) => {
        state.columns.forEach(column => {
            column.records.forEach(record => {
                record.marks = record.marks.filter(mark => mark.id !== markId);
            });
        });
        return {...state};
    })
    .on(renameColumn, (state, {columnId, title}) => {
        state.columns.forEach(column => {
            if (column.id === columnId)
                column.title = title;
        });
        return {...state};
    })
    .on(removeRecord, (state, recordId) => {
        state.columns = state.columns.map(column => {
            column.records = column.records.filter(record => record.id !== recordId);
            return column;
        });
        return {...state};
    })
    .reset(resetDashboard);