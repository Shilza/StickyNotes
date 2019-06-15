export default {
    Query: {
        records: async (parent, args, {models}) => {
            return await models.Record.find();
        }
    },

    Mutation: {
        createRecord: async (
            parent,
            {text, columnId},
            {models},
        ) => {
            return await models.Record.create({
                text,
                columnId
            });
        },

        updateRecord: async (
            parent,
            {text, recordId},
            {models},
        ) => {
            await models.Record.findByIdAndUpdate(recordId,
                {
                    text
                });
            return true;
        }
    }
}
