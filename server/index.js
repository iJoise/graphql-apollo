const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const users = [{id: "1", username: 'Vitalik', age: 40}]

const app = express()
app.use(cors())

const createUser = (input) => {
   const id = Date.now()
   return {
      ...input,
      id
   }
}

const root = {
   getAllUsers: () => {
      return users
   },
   getUser: ({id}) => {
      const user = users.find(user => +user.id === +id)
      console.log(users)
      return user;
   },
   createUser: ({input}) => {
      const user = createUser(input)
      users.push(user)
      return user
   }
}

app.use('/graphql', graphqlHTTP({
   graphiql: true,
   schema,
   rootValue: root
}))


app.listen(5000, () => console.log('server started on port 5000'))
