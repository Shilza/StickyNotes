import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 20,
        },
        color: {
            type: String,
            required: true,
            minlength: 7,
            maxlength: 7
        },
        ownerId: {type: String, ref: 'User'}
    }
);

const Board = mongoose.model('Board', boardSchema);

export default Board;
