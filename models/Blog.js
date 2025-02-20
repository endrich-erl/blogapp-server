const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
     userId: {
        type: String,
        required: [true]
    },
    title: {
        type: String,
        required: [true, 'Blog title is Required']
    },
    content: {
        type: String,
        required: [true, 'Blog content is Required']
    },
    authorInfo: {
        type: String,
        required: [true, 'Author information is Required']
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            userId: {
                type: String,
                required: [true]
            },
            comment: {
            	type: String,
                required: [true]
            }
        }
    ],
});

module.exports = mongoose.model('Blog', blogSchema);