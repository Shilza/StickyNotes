import mongoose from 'mongoose';

import User from './user';
import Board from './board';
import Column from './column';
import Record from './record';
import Mark from './mark';

const connectDb = () => {
    if (process.env.TEST_DATABASE_URL) {
        return mongoose.connect(
            process.env.TEST_DATABASE_URL,
            {useNewUrlParser: true},
        );
    }

    if (process.env.DATABASE_URL) {
        return mongoose.connect(
            process.env.DATABASE_URL,
            {useNewUrlParser: true},
        );
    }
};

const models = {User, Board, Column, Record, Mark};

export {connectDb};

export default models;
