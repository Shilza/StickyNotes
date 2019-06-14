
export const getRecordsByColumnId = (state, id) => (
    state.columns.find(column => column.id === id).records
);