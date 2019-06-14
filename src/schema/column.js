import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        columns: [Column!]
    }

    extend type Mutation {
       createColumn(title: String!) : Column!
        removeColumn(columnId: ID!): Boolean
    }

    type Column {
        title: String!
        records: [Record!]
        id: ID!
    }
`;
