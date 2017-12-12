const assert = require('assert')
const User = require('../src/user')

describe('Updating records', () => {
  let joe
  beforeEach(done => {
    joe = new User({ name:"Joe" })
    joe.save()
      .then(() => done())
  })

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1)
        assert(users[0].name === 'Alex')
        done()
      })
  }

  it('instance type set n save', done => {
    joe.set('name', 'Alex')
    assertName(joe.save(), done)
  })

  it('A model instance can update', done => {
    assertName(joe.update({ name:'Alex' }), done)
  })

  it('A model class can update', done => {
    assertName(
      User.update({ name:'Joe' }, { name: "Alex" }),
      done
    )
  })

  it('A model can update a single record', done => {
    assertName(
      User.findOneAndUpdate({ name:"Joe" }, { name:"Alex" }),
      done
    )
  })

  it('Update with an Id', done => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name:"Alex" }),
      done
    )
  })
})