var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodeworkshop');

var usersSchema = new mongoose.Schema({
    name : String,
    password : String,
    points : String,
    email : String,
    questionsAnswered : String,
    },{collection:'users'});

var users = mongoose.model('users',usersSchema);

var questionsSchema = new mongoose.Schema({
    question : String,
    optionA : String,
    optionB : String,
    optionC : String,
    optionD : String,
    correctAns : String,
    },{collection:'questions'});

var questions = mongoose.model('questions',questionsSchema);

exports.users = users;
exports.questions = questions;