import mongoose from 'mongoose';

const columnSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 20,
        },
        index: {
            type: Number,
            required: true
        },
        boardId: { type: String, ref: 'Board' },
        ownerId: {type: String, ref: 'User'}
    }
);

columnSchema.statics.findByOwnerId = async function (ownerId, boardId) {
    return await this.find({
        ownerId, boardId
    }).sort('index');
};

columnSchema.statics.findByIndex = async function (minIndex, maxIndex, ownerId, boardId) {
    return await this.find({
        index: {$gt: minIndex, $lt: maxIndex}, ownerId, boardId
    }).sort('index');
};

const Column = mongoose.model('Column', columnSchema);

export default Column;
