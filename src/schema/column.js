import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        columns(title: String!): [Column!]
    }

    extend type Mutation {
        createColumn(title: String!, boardTitle: String!) : Column!
        removeColumn(columnId: ID!): Boolean
        renameColumn(columnId: ID!, title: String!): Boolean
        reorderColumns(boardId: ID!, oldIndex: Int!, newIndex: Int!): Boolean
    }

    type Column {
        title: String!
        records: [Record!]
        index: Int!
        id: ID!
    }
`;
