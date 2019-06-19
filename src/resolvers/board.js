import {ValidationError, ForbiddenError} from 'apollo-server';
import validator from "validator";

export default {
    Query: {
        board: async(parent, {title}, {models, me}) => {
            return await models.Board.findOne({ownerId: me.id, title});
        },

        boards: async (parent, args, {models, me}) => {
            return await models.Board.find({ownerId: me.id});
        }
    },

    Mutation: {
        createBoard: async (
            parent,
            {title, color},
            {me, models},
        ) => {
            if(title.length === 0 || title.length > 20)
                throw new ValidationError('Title is invalid');
            if(color.length !== 7)
                throw new ValidationError('Color is invalid');

            const board = await models.Board.findOne({ownerId: me.id, title});
            if(!Object.is(board, null))
                throw new ValidationError(`Board with title ${title} already exists`);

            return await models.Board.create({
                title: validator.escape(validator.trim(title)),
                color: validator.escape(validator.trim(color)),
                ownerId: me.id
            });
        },

        removeBoard: async (
            parent,
            {boardId},
            {models, me}
        ) => {
            const board = await models.Board.findOne({
                _id: boardId,
                ownerId: me.id
            });

            if(Object.is(board, null))
                throw new ForbiddenError('Only owner can remove boards');

            await models.Board.remove({"_id": boardId});
            return true;
        },

        renameBoard: async (
            parent,
            {boardId, title},
            {models, me}
        ) => {
            const board = await models.Board.findOne({
                _id: boardId,
                ownerId: me.id
            });

            if(Object.is(board, null))
                throw new ForbiddenError('Only owner can change board title');

            if(title.length === 0 || title.length > 20)
                throw new ValidationError('Title is invalid');

            await models.Board.findByIdAndUpdate(boardId,
                {title: validator.escape(validator.trim(title))}
                );
            return true;
        },

        changeBoardColor: async (
            parent,
            {boardId, color},
            {models, me}
        ) => {
            const board = await models.Board.findOne({
                _id: boardId,
                ownerId: me.id
            });

            if(Object.is(board, null))
                throw new ForbiddenError('Only owner can change board color');

            if(color.length !== 7)
                throw new ValidationError('Color is invalid');

            await models.Board.findByIdAndUpdate(boardId,
                {color: validator.escape(validator.trim(color))}
            );
            return true;
        }
    }
}
