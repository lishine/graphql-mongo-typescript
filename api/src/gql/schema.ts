import { gql } from 'apollo-server-express'

export const schema = gql`
    type Board {
        _id: ID!
        title: String!
        image: String!
    }

    input UserActivityDataInput {
        board_id: ID!
    }

    input UserActivityInput {
        page: String!
        entity_id: ID!
        event_type: EventType!
        data: [UserActivityDataInput!]!
    }

    type ShowRoom {
        _id: ID!
        title: String!
        boards: [Board!]!
    }

    type UserActivityData {
        _id: ID!
        board_id: Board!
    }
    enum EventType {
        board_hover
        board_click
    }
    type UserActivity {
        _id: ID!
        entity_id: ShowRoom!
        event_type: EventType!
        data: [UserActivityData!]!
    }
    type Query {
        showRoom: ShowRoom!
    }

    type Mutation {
        createShowRoom: ShowRoom!
        addUserActivity(userActivity: UserActivityInput!): UserActivity
    }
`
