const assert = require('assert')
const User = require('../src/user')

describe('Creating records', () => {
  it('Should save a user', (done) => {
    // Use assertion library here
    const joe = new User({ name: "Joe" })

    // Save to the database
    joe.save()
      .then(() => {
        assert(!joe.isNew)
        done()
      })
  })
})
