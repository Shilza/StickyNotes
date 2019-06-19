import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        boards: [Board!]
        board(title: String): Board!
    }

    extend type Mutation {
        createBoard(title: String!, color: String!): Board!
        removeBoard(boardId: ID!): Boolean
        renameBoard(boardId: ID!, title: String): Boolean
        changeBoardColor(boardId: ID!, color: String): Boolean
    }

    type Board {
        id: ID!
        color: String!
        title: String!
    }
`;
