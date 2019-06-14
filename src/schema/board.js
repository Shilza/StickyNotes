import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        boards: [Board!]
    }

    extend type Mutation {
        createBoard(name: String!): Board!
    }

    type Board {
        name: String!
    }
`;
