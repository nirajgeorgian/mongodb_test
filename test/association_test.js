const mongoose = require('mongoose')
const assert = require('assert')
const User = require('../src/user')
const Comment = require('../src/comment')
const BlogPost = require('../src/blogPost')

describe('Associations', () => {
  let joe, blogPost, comment
  beforeEach(done => {
    joe = new User({ name: 'Joe' })
    blogPost = new BlogPost({ title: 'Js is great', content: "Dodo lives here" })
    comment = new Comment({ content: "Dodo marks a comment" })

    joe.blogPosts.push(blogPost)
    blogPost.comments.push(comment)
    comment.user = joe

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done())
  })

  it('Saves a relation between a user and a plogpost', done => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then(user => {
        // console.log(user)
        assert(user.blogPosts[0].title === 'Js is great')
        done()
      })
  })

  it('saves a full relation graph', done => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'users'
          }
        }
      })
      .then(user => {
        // console.log(user.blogPosts[0].comments[0])
        assert(user.name === 'Joe')
        assert(user.blogPosts[0].title === 'Js is great')
        assert(user.blogPosts[0].comments[0].content === 'Dodo marks a comment')
        done()
      })
  })
})
