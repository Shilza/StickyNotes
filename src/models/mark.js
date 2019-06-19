import mongoose from 'mongoose';

const markSchema = new mongoose.Schema(
    {
        color: {
            type: String,
            required: true,
            minlength: 7,
            maxlength: 7
        },
        recordId: {type: String, ref: 'Record'},
        ownerId: {type: String, ref: 'User'}
    }
);

markSchema.statics.findByRecordId = async function (recordId) {
    return await this.find({
        recordId
    });
};

const Mark = mongoose.model('mark', markSchema);

export default Mark;
