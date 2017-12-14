const mongoose = require('mongoose')
const PostSchema = require('./post')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than two characters.'
    },
  },
  likes: Number,
  posts: [PostSchema]
})

UserSchema.virtual('postCount').get(function() {
  return this.posts.length
})

const User = mongoose.model('users', UserSchema)

module.exports = User
