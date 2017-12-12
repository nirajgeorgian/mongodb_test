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
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next time
    done()
  })
})
