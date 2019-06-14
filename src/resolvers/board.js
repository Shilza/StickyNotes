export default {
    Query: {
        boards: async (parent, args, {models}) => {
            return await models.Board.find();
        }
    },

    Mutation: {
        createBoard: async (
            parent,
            {name},
            {me, models},
        ) => {
            return await models.Board.create({
                name,
                userId: me.id
            });
        },
    }
}
