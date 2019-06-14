import gql from "graphql-tag";

export const SIGN_IN = gql`
    mutation signIn ($username: String!, $password: String!){
        signIn(login: $username, password: $password) {
            username
        }
    }
`;

export const SIGN_UP = gql`
    mutation signUp ($username: String!, $password: String!){
        signUp(username: $username, password: $password) {
            username
        }
    }
`;

