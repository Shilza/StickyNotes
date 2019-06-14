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
    }
}
