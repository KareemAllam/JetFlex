const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Admin = new Schema({ 
    username: String,
    password : String
}, { collection : 'admin' } );

module.exports = mongoose.model('admin', Admin);
