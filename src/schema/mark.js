import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        marks: [Mark!]
    }

    extend type Mutation {
        createMark(color: String!, recordId: ID!): Mark!
        removeMark(markId: ID!): Boolean
    }

    type Mark {
        id: ID!,
        color: String!,
        recordId: ID!
    }
`;
