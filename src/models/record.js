import mongoose from 'mongoose';
import models from "./index";

const recordSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 400
        },
        index: {
            type: Number,
            required: true
        },
        columnId: {type: String, ref: 'Column'},
        ownerId: {type: String, ref: 'User'}
    },
    {  timestamps: { createdAt: true, updatedAt: false } }
);

recordSchema.statics.findByColumnId = async function (columnId) {
    const records = await this.find({
        columnId
    }).sort('index');

    const marksPromises = records.map(record => models.Mark.findByRecordId(record.id));
    const marksResult = await Promise.all(marksPromises);

    return records.map(record => {
        record.marks = [];
        marksResult.forEach(marks => {
            if (marks[0] && marks[0].recordId === record.id)
                record.marks = marks;
        });
        return record;
    });
};

recordSchema.statics.findByIndex = async function (minIndex, maxIndex, columnId, ownerId) {
    return await this.find({
        index: {$gt: minIndex, $lt: maxIndex}, columnId, ownerId
    }).sort('index');
};


const Record = mongoose.model('Record', recordSchema);

export default Record;
