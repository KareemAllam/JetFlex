const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let user = new Schema({ 
    username: String,
    password : String
}, { collection : 'users' } );

module.exports = mongoose.model('user', user);
