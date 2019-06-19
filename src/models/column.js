import mongoose from 'mongoose';

const columnSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
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

columnSchema.statics.findByOwnerId = async function (ownerId) {
    return await this.find({
        ownerId
    }).sort('index');
};

columnSchema.statics.findByIndex = async function (minIndex, maxIndex, ownerId) {
    return await this.find({
        index: {$gt: minIndex, $lt: maxIndex}, ownerId
    }).sort('index');
};

const Column = mongoose.model('Column', columnSchema);

export default Column;
