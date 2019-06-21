import gql from "graphql-tag";

export const GET_BOARDS  = gql`
    query boards {
        boards {
            id, title, color
        }
    }
`;

export const CREATE_BOARD = gql`
    mutation createBoard ($title: String!, $color: String!) {
        createBoard(title: $title, color: $color) {
            id, title, color
        }
    }
`;