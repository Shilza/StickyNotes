import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        records: [Record!]
    }

    extend type Mutation {
        createRecord(text: String!, columnId: ID!): Record!
        removeRecord(recordId: ID!): Boolean
        updateRecord(text: String, recordId: ID!): Boolean
        reorderRecords(columnId: ID!, oldIndex: Int!, newIndex: Int!): Boolean
    }

    type Record {
        id: ID!,
        text: String!,
        index: Int!,
        marks: [Mark!]
        columnId: ID!
        createdAt: String!
    }
`;
