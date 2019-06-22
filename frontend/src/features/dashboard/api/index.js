import gql from "graphql-tag";

export const GET_COLUMNS = gql`
    query columns($title: String!) {
        columns(title: $title) {
            title, id, index, records {
                id, text, index, createdAt, marks {
                    id, color, 
                }
            }
        }
    }
`;

export const GET_BOARD = gql`
    query board($title: String!) {
        board(title: $title) {
            id, title, color
        }
    }
`;

export const CREATE_RECORD = gql`
    mutation createRecord ($text: String!, $columnId: ID!) {
        createRecord(text: $text, columnId: $columnId) {
            id, text, index, createdAt, marks {
                id, color
            }
        }
    }
`;

export const CREATE_COLUMN = gql`
    mutation createColumn ($title: String!, $boardTitle: String!) {
        createColumn(title: $title, boardTitle: $boardTitle) {
            title, id, index, records {
                text, columnId
            }
        }
    }
`;

export const REMOVE_COLUMN = gql`
    mutation removeColumn ($columnId: ID!) {
        removeColumn(columnId: $columnId)
    }
`;

export const UPDATE_RECORD = gql`
    mutation updateRecord ($recordId: ID!, $text: String!) {
        updateRecord(recordId: $recordId, text: $text)
    }
`;

export const CREATE_MARK = gql`
    mutation createMark ($recordId: ID!, $color: String!) {
        createMark(color: $color, recordId: $recordId) {
            id, color
        }
    }
`;

export const REMOVE_MARK = gql`
    mutation removeMark ($markId: ID!) {
        removeMark(markId: $markId)
    }
`;

export const RENAME_COLUMN = gql`
    mutation renameColumn($columnId: ID!, $title: String!) {
        renameColumn(columnId: $columnId, title: $title)
    }
`;

export const REMOVE_RECORD = gql`
    mutation removeRecord($recordId: ID!) {
        removeRecord(recordId: $recordId)
    }
`;

export const REORDER_COLUMNS = gql`
    mutation reorderColumns($boardId: ID!, $oldIndex: Int!, $newIndex: Int!) {
        reorderColumns(boardId: $boardId, oldIndex: $oldIndex, newIndex: $newIndex)
    }
`;

export const REORDER_RECORDS = gql`
    mutation reorderRecords($columnId: ID!, $oldIndex: Int!, $newIndex: Int!) {
        reorderRecords(columnId: $columnId, oldIndex: $oldIndex, newIndex: $newIndex)
    }
`;

export const REMOVE_BOARD = gql`
    mutation removeBoard($boardId: ID!) {
        removeBoard(boardId: $boardId)
    }
`;

export const RENAME_BOARD = gql`
    mutation renameBoard($boardId: ID!, $title: String!) {
        renameBoard(boardId: $boardId, title: $title)
    }
`;

export const CHANGE_BOARD_COLOR = gql`
    mutation changeBoardColor($boardId: ID!, $color: String!) {
        changeBoardColor(boardId: $boardId, color: $color)
    }
`;
