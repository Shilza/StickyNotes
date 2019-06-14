import mongoose from 'mongoose';

import User from './user';
import Board from './board';
import Column from './column';
import Record from './record';

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

const models = {User, Board, Column, Record};

export {connectDb};

export default models;
