const assert = require('assert')
const User = require('../src/user')

describe('Search for user', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name:'joe' })
    joe.save()
      .then(() => {
        done()
      })
  })
  it('finds all user with name of joe', (done) => {
    User.find({name: 'joe'})
      .then((users) => {
        // with results as an array
        // console.log(users)
        assert(users[0]._id.toString() === joe._id.toString())
        done()
      })
  })
  it('find a single user', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'joe')
        done()
      })
  })
})
