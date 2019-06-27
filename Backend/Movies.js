const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Movie = new Schema({
    name: String,
    
    date: { type:Date, dafault: Date.now },

    director: String,

    description: String,

    author: String,

    heros: String,

    isPublished: Boolean,

    type: String,

    poster: String,

    rate: Number

}, { collection : 'movies' } );

module.exports = mongoose.model('Movie', Movie);
