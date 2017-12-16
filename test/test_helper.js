const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// before and after are runs only once
// beforeEach and afterEach runs always
before((done) => {
  mongoose.connect('mongodb://localhost/users_test', { useMongoClient: true })
  mongoose.connection
    .once('open', () => {
      console.log("Connection open successfully")
      done()
    })
    .on('error', error => console.warn("Warning ", error))
})

// hooks in testing
beforeEach((done) => {
  // clear out all the database
  const { users, comments, blogposts } = mongoose.connection.collections
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done()
      })
    })
  })
})

// Middleware are pre and post hooks
// pre <= Event => post
