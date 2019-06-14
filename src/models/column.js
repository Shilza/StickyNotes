import mongoose from 'mongoose';

const columnSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 20,
        },
        boardId: { type: Number, ref: 'Board' },
    }
);

const Column = mongoose.model('Column', columnSchema);

export default Column;
