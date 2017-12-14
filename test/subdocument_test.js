const assert = require('assert')
const User = require('../src/user')

describe('SUbdocuments', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({
      name: "Joe",
      posts: [{ title:"Dodo lives here" }]
    })
    joe.save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user.posts[0].title === "Dodo lives here")
        done()
      })
  })

  it("can insert subdocument inside the post", (done) => {
    const joe = new User({ name: "Joe", posts: [] })
    joe.save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        user.posts.push({ title: "Dodo lives here" })
        user.save()
          .then(() => User.findOne({ name: "Joe" }))
          .then(user => {
            assert(user.posts[0].title === "Dodo lives here")
            done()
          })
      })
  })

  it('can remove an existing subdocument', done => {
    const joe = new User({
      name: 'joe',
      posts: [{ title: 'dodo' }]
    })
    joe.save()
      .then(() => User.findOne({ name: 'joe' }))
      .then(user => {
        user.posts[0].remove()
        return user.save()
      })
      .then(() => User.findOne({ name: 'joe' }))
      .then(user => {
        assert(user.posts.length === 0)
        done()
      })
  })
})
