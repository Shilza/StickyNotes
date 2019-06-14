import {GraphQLDateTime} from 'graphql-iso-date';

import userResolvers from './user';
import columnResolvers from './column';
import boardResolvers from './board';
import recordResolvers from './record';

const customScalarResolver = {
    Date: GraphQLDateTime,
};

export default [
    customScalarResolver,
    userResolvers,
    boardResolvers,
    columnResolvers,
    recordResolvers
];
