import validator from "validator";
import {ValidationError, ForbiddenError} from 'apollo-server';

export default {
    Query: {
        records: async (parent, args, {models}) => {
            const records = await models.Record.find();
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
        }
    },

    Mutation: {
        createRecord: async (
            parent,
            {text, columnId},
            {models, me},
        ) => {
            if (text.length === 0 || text.length > 400)
                throw new ValidationError('Text is invalid');

            const lastRecord = await models.Record.findOne({
                ownerId: me.id, columnId
            }).sort('-index');
            const index = Object.is(lastRecord, null) ? 0 : lastRecord.index + 1;

            let record = await models.Record.create({
                text: validator.escape(validator.trim(text)),
                columnId,
                index,
                ownerId: me.id
            });
            record.marks = [];

            return record;
        },

        updateRecord: async (
            parent,
            {text, recordId},
            {models, me},
        ) => {
            const record = await models.Record.findOne({
                _id: recordId,
                ownerId: me.id
            });

            if (Object.is(record, null))
                throw new ForbiddenError('Only owner can update records');
            if (text.length === 0 || text.length > 400)
                throw new ValidationError('Text is invalid');

            await models.Record.findByIdAndUpdate(recordId,
                {
                    text: validator.escape(validator.trim(text))
                });
            return true;
        },

        removeRecord: async (
            parent,
            {recordId},
            {models, me},
        ) => {
            const record = await models.Record.findOne({
                _id: recordId,
                ownerId: me.id
            });

            if (Object.is(record, null))
                throw new ForbiddenError('Only owner can update records');

            await models.Record.remove({"_id": recordId});
            return true;
        },

        reorderRecords: async (
            parent,
            {columnId, oldIndex, newIndex},
            {models, me}
        ) => {
            const records = await models.Record.findByIndex(
                Math.min(oldIndex, newIndex) - 1, Math.max(oldIndex, newIndex) + 1, columnId, me.id
            );

            let promises = [];

            if (newIndex > oldIndex)
                records.forEach((record, index) => {
                    if (index < records.length - 1) {
                        promises.push(models.Record.findByIdAndUpdate(
                            record._id,
                            {index: record.index + 1}
                        ));
                    } else
                        promises.push(models.Record.findByIdAndUpdate(
                            records[records.length - 1]._id,
                            {index: oldIndex}
                        ));
                });
            else if (oldIndex > newIndex)
                records.forEach((record, index) => {
                    if (index > 0) {
                        promises.push(models.Record.findByIdAndUpdate(
                            record._id,
                            {index: record.index - 1}
                        ));
                    }
                    else
                        promises.push(models.Record.findByIdAndUpdate(
                            records[0]._id,
                            {index: oldIndex}
                        ));
                });

            await Promise.all(promises);

            return true;
        }
    }
}
