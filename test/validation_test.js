const assert = require('assert')
const User = require('../src/user')

describe('Validation records', () => {
  it('requires a username', () => {
    const user = new User({ name: undefined })
    /*
      validateSync is synchronous code
      async code:-
      user.validate((validationResult) => {
        //do stuff with validation error message
      })
    */
    const validationResult = user.validateSync()
    const { message } = validationResult.errors.name
    assert(message === 'Name is required')
  })

  it('Username length must be grater than 2', () => {
    const user = new User({ name: 'Ek'})
    const validationResult = user.validateSync()
    const { message } = validationResult.errors.name
    assert(message === 'Name must be longer than two characters.')
  })

  it('disallows invalid records from being saved', (done) => {
    const user = new User({ name: "Ek" })
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name
        assert(message === "Name must be longer than two characters.")
        done()
      })
  })
})
