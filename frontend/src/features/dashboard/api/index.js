import gql from "graphql-tag";

export const CREATE_RECORD = gql`
    mutation createRecord ($text: String!, $columnId: ID!) {
        createRecord(text: $text, columnId: $columnId) {
            text
        }
    }
`;

export const GET_COLUMNS = gql`
    query columns {
        columns {
            title, id, records {
                id, text
            }
        }
    }
`;

export const CREATE_COLUMN = gql`
    mutation createColumn ($title: String!) {
        createColumn(title: $title) {
            title, id, records {
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
