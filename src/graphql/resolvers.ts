import User from "../entities/user.entity";

export const books = [
  {
    title: 'Book 1',
    author: 'John Doe 1',
  },{
    title: 'Book 2',
    author: 'John Doe 2',
  }
]

export const resolvers = {
  Query: {
    books: ()=> {
      return books;
    },
    users: async () => {
      // call to DB
      const users  = await User.findAll()
      return users
    }
  }
}