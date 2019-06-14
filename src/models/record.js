import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 400
        },
        columnId: {type: String, ref: 'Column'},
    }
);

recordSchema.statics.findByColumnId = async function (columnId) {
    return await this.find({
        columnId
    });
};

const Record = mongoose.model('Record', recordSchema);

export default Record;
