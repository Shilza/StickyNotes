
export const getMarksByRecordId = (columns, recordId) => {
    const column = columns.find(column => column.records.find(record => record.id === recordId));
    return Object.is(column, undefined)
        ? [] : column.records.find(record => record.id === recordId).marks;
};
