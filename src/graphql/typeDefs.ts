// string template
export const typeDefs = `#graphql
type Book {
title: String!
author: String!
}
type User {
fullname: String
email: String
password: String
googleId: String
picture: String
}
type Query {
    books: [Book!]!
    users: [User]
}
`