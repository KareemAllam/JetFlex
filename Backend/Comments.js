const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Comment = new Schema({ 
    movieId: String,
    username: String,
    comment : String
}, { collection : 'comments' } );

module.exports = mongoose.model('comment', Comment);
