import validator from 'validator';
import {ValidationError, ForbiddenError} from 'apollo-server';

export default {
    Query: {
        columns: async (parent, {title}, {models, me}) => {
            const boardId = (await models.Board.findOne({title, ownerId: me.id})).id;
            let columns = await models.Column.findByOwnerId(me.id, boardId);
            const recordsPromises = columns.map(column => models.Record.findByColumnId(column.id));
            const recordsResult = await Promise.all(recordsPromises);

            return columns.map(column => {
                column.records = [];

                recordsResult.forEach(records => {
                    if (records[0] && records[0].columnId === column.id) {
                        records.forEach(record => {
                            column.records.push(record);
                        });
                    }
                });

                return column;
            });
        }
    },

    Mutation: {
        createColumn: async (
            parent,
            {title, boardTitle},
            {models, me},
        ) => {
            if(title.length === 0 || title.length > 20)
                throw new ValidationError('Title is invalid');

            const boardId = (await models.Board.findOne({title: boardTitle, ownerId: me.id})).id;
            const lastColumn = await models.Column.findOne({
                ownerId: me.id,
                boardId
            }).sort('-index');

            const index = Object.is(lastColumn, null) ? 0 : lastColumn.index + 1;

            return await models.Column.create({
                title: validator.escape(validator.trim(title)),
                ownerId: me.id,
                index,
                boardId
            });
        },

        removeColumn: async (
            parent,
            {columnId},
            {models, me}
        ) => {
            const column = await models.Column.findOne({
                _id: columnId,
                ownerId: me.id
            });

            if(Object.is(column, null))
                throw new ForbiddenError('Only owner can remove lists');

            await models.Column.remove({"_id": columnId});
            return true;
        },

        renameColumn: async (
            parent,
            {columnId, title},
            {models, me}
        ) => {
            const column = await models.Column.findOne({
                _id: columnId,
                ownerId: me.id
            });

            if(Object.is(column, null))
                throw new ForbiddenError('Only owner can rename lists');
            if(title.length < 1 || title.length > 20)
                throw new ValidationError('Title is invalid');

            await models.Column.findByIdAndUpdate(
                columnId,
                {title: validator.escape(validator.trim(title))}
            );
            return true;
        },

        reorderColumns: async (
            parent,
            {boardId, oldIndex, newIndex},
            {models, me}
        ) => {
            const board = await models.Board.findOne({_id: boardId, ownerId: me.id});

            if(Object.is(board, null))
                throw new ForbiddenError('Only owner can reorder lists');

            const columns = await models.Column.findByIndex(
                Math.min(oldIndex, newIndex) - 1, Math.max(oldIndex, newIndex) + 1, me.id, boardId
            );

            let promises = [];

            if (newIndex > oldIndex)
                columns.forEach((column, index) => {
                    if (index < columns.length - 1) {
                        promises.push(models.Column.findByIdAndUpdate(
                            column._id,
                            {index: column.index + 1}
                        ));
                    } else
                        promises.push(models.Column.findByIdAndUpdate(
                            columns[columns.length - 1]._id,
                            {index: oldIndex}
                        ));
                });
            else if (oldIndex > newIndex)
                columns.forEach((record, index) => {
                    if (index > 0) {
                        promises.push(models.Column.findByIdAndUpdate(
                            record._id,
                            {index: record.index - 1}
                        ));
                    }
                    else
                        promises.push(models.Column.findByIdAndUpdate(
                            columns[0]._id,
                            {index: oldIndex}
                        ));
                });

            await Promise.all(promises);

            return true;
        }
    }
}
