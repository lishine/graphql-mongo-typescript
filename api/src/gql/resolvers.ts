import { Resolvers } from '~/types/gen-types'
import { UserActivity } from '~/mongo/model'

export const resolvers: Resolvers = {
    Query: {
        async showRoom(_, args, ctx, info) {
            console.log('infoo', info.fieldNodes[0].selectionSet?.selections[0].loc)
            return ctx.models.showRoom.findOne()
        },
    },
    Mutation: {
        async createShowRoom(_, args, ctx, info) {
            await ctx.models.board.remove({})
            let boards = await ctx.models.board.create(
                [
                    'https://i.ibb.co/vBJmZft/image0.jpg',
                    'https://i.ibb.co/kgbw9h8/im1.jpg',
                    'https://i.ibb.co/ck52Hds/im2.jpg',
                    'https://i.ibb.co/tQjgTvJ/im3.jpg',
                    'https://i.ibb.co/Mh0gDqN/im4.jpg',
                    'https://i.ibb.co/ck52Hds/im2.jpg',
                    'https://i.ibb.co/GF8xDfG/im6.jpg',
                    'https://i.ibb.co/tQjgTvJ/im3.jpg',
                    'https://i.ibb.co/kgbw9h8/im1.jpg',
                    'https://i.ibb.co/GF8xDfG/im6.jpg',
                ].map((image) => ({ image, title: `title ${Math.floor(100 * Math.random())}` }))
            )

            await ctx.models.showRoom.remove({})
            let showRoom = await ctx.models.showRoom.create({
                title: `Showroom title 1`,
                boards,
            })
            return showRoom
        },
        async addUserActivity(_, args, ctx, info) {
            let data = await ctx.models.userActivityData.create(args.userActivity.data)
            let userActivity: UserActivity = args.userActivity
            userActivity.data = data
            userActivity = await ctx.models.userActivity.create(userActivity)
            console.log('userActivity', userActivity)
            return userActivity
        },
    },
    ShowRoom: {
        async boards(parent, args, ctx, info) {
            return ctx.models.board.find({ _id: parent.boards })
        },
    },
}
