const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    edited: {
        type: Boolean,
        default: false
    }
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;