var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.send("Express here");
});


/*************************************
TEMPLATING USING EJS SETTINGS
*************************************/
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.engine('ejs',require('ejs-locals'));

app.get('/htmlpage',function(req,res){
    res.render('display');
});

/*************************************
REQUEST PARAMETERS SETTINGS
*************************************/
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/calculator',function(req,res){
    res.render('calculator');
});

app.post('/calculator',function(req,res){
    var number1 = parseInt(req.body.number1);
    var number2 = parseInt(req.body.number2);
    var sum = number2 + number1;

    console.log(sum);

/***************************
SENDING CONTEXT NOW
***************************/
    res.render('calculator',{'sum':sum});
});



/*******************************
SETTING UP MONGO CONNECTION
********************************/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodeworkshop');
var dbSchema = require('./dbSchema');

app.get('/addquestions',function(req,res){
    res.render('questionform');
});

app.post('/addquestions',function(req,res){
    question = req.body.question;
    optionA = req.body.optionA;
    optionB = req.body.optionB;
    optionC = req.body.optionC;
    optionD = req.body.optionD;
    correctAns = req.body.correctAns;

    var question = new dbSchema.questions({
        "question" : ""+question,
        "optionA" : ""+optionA,
        "optionB" : ""+optionB,
        "optionC": ""+optionC,
        "optionD" : ""+optionD,
        "correctAns" : ""+correctAns});
    question.save();

    res.redirect('../addquestions');
});



app.listen(8080,function(){
    console.log("Server started");
});