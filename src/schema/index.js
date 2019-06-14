import { gql } from 'apollo-server-express';

import userSchema from './user';
import columnSchema from './column';
import boardSchema from './board';
import recordSchema from './record';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, boardSchema, columnSchema, recordSchema];
