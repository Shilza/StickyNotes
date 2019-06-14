import {gql} from 'apollo-server-express';

export default gql`
    extend type Query {
        users: [User!]
        user(id: ID!): User
        me: User
    }

    extend type Mutation {
        signUp(
            username: String!
            password: String!
        ): User!

        signIn(login: String!, password: String!): User!
        logout: Boolean!
        updateUser(username: String!): User!
        deleteUser(id: ID!): Boolean!
    }

    type Token {
        token: String!
    }

    type User {
        username: String!
    }
`;
