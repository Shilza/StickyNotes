import validator from "validator";
import {ValidationError, ForbiddenError} from 'apollo-server';

export default {
    Query: {
        marks: async (parent, args, {models}) => {
            return await models.Mark.find();
        }
    },

    Mutation: {
        createMark: async (
            parent,
            {color, recordId},
            {models, me},
        ) => {
            if(color.length !== 7)
                throw new ValidationError('Color must have 7 characters');

            return await models.Mark.create({
                color: validator.escape(validator.trim(color)),
                recordId,
                ownerId: me.id
            });
        },

        removeMark: async (
            parent,
            {markId},
            {models, me},
        ) => {
            const mark = await models.Mark.findOne({
                _id: markId,
                ownerId: me.id
            });

            if(Object.is(mark, null))
                throw new ForbiddenError('Only owner can remove mark');

            await models.Mark.remove({"_id": markId});
            return true;
        }
    }
}
