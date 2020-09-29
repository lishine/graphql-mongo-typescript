import mongoose, { Schema, Document } from 'mongoose'
import { ObjectID } from 'mongodb'
import { ModelDefinition } from '~/utils/tmongo'

type Board = {
    title: string
    image: string
}
const board = mongoose.model<Board & Document>(
    'board',
    new mongoose.Schema({
        title: { type: String, required: true },
        image: { type: String, required: true },
    } as ModelDefinition<Board>)
)

type ShowRoom = {
    title: string
    boards: Board[] | string[]
}
const showRoom = mongoose.model<ShowRoom & Document>(
    'showRoom',
    new mongoose.Schema({
        title: { type: String, required: true },
        boards: [{ type: Schema.Types.ObjectId, ref: 'Board', required: true }],
    } as ModelDefinition<ShowRoom>)
)

type EventType = 'board_hover' | 'board_click'
type UserActivityData = {
    board_id: Board | string
}
export type UserActivity = {
    page: string
    entity_id: ShowRoom | string
    event_type: EventType
    data: UserActivityData[] | string[]
}
const userActivityData = mongoose.model<UserActivityData & Document>(
    'userActivityData',
    new mongoose.Schema({ board_id: { type: Schema.Types.ObjectId, ref: 'Board', required: true } } as ModelDefinition<
        UserActivityData
    >)
)
const userActivity = mongoose.model<UserActivity & Document>(
    'userActivity',
    new mongoose.Schema(
        {
            page: { type: String, required: true },
            entity_id: { type: Schema.Types.ObjectId, ref: 'ShowRoom', required: true },
            event_type: { type: String, required: true },
            data: [{ type: Schema.Types.ObjectId, ref: 'UserActivityData', required: true }],
        } as ModelDefinition<UserActivity>,
        { timestamps: true }
    )
)

export const models = {
    board,
    showRoom,
    userActivity,
    userActivityData,
}
