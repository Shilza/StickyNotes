export default {
    Query: {
        columns: async (parent, args, {models}) => {
            const columns = await models.Column.find();
            const promises = columns.map(item => models.Record.findByColumnId(item.id));
            const result = await Promise.all(promises);

            columns.map(column => {
                column.records = [];

                result.forEach(records => {
                    if(records[0] && records[0].columnId === column.id)
                        records.forEach(record => {
                            column.records.push(record);
                        });
                });

                return column;
            });
            return columns;
        }
    },

    Mutation: {
        createColumn: async (
            parent,
            {title},
            {models},
        ) => {
            return await models.Column.create({
                title,
                projectId: 1
            });
        },

        removeColumn: async (
            parent,
            {columnId},
            {models}
        ) => {
            await models.Column.remove( {"_id": columnId});
            return true;
        }
    }
}
