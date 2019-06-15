import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        records: [Record!]
    }

    extend type Mutation {
        createRecord(text: String!, columnId: ID!): Record!
        updateRecord(text: String, recordId: ID!): Boolean
    }

    type Record {
        id: ID!,
        text: String!,
        columnId: ID!
    }
`;
