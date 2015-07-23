var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
        username: String, //username of the sender
        body: String
    });

mongoose.model('Message', MessageSchema);
