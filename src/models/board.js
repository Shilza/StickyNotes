import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
);

const Board = mongoose.model('Board', boardSchema);

export default Board;
