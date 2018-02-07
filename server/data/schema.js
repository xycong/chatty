export const Schema = [
  `
  # declare custom scalars
  scalar Date

  type Group {
    id: Int! # unique id for the group
    name: String # name of the group
    users: [User]! # users in the group
    messages: [Message] # messages sent to the group
  }

  type User {
    id: Int! # unique id for the user
    email: String! # we will also require a unique email per user
    username: String # this is the name we'll show other users
    messages: [Message] # messages sent by user
    groups: [Group] # groups the user belongs to
    friends: [User] # user's friends/contacts
  }

  type Message {
    id: Int! # unique id for message
    to: Group! # group message was sent in
    from: User! # user who sent the message
    text: String! # message text
    createdAt: Date! # when message was created
  }

  type Query {
    user(email: String, id: Int): User
    messages(groupId: Int, userId: Int): [Message]
    group(id: Int!): Group
  }

  schema {
    query: Query
  }
` 
];
export default Schema;
