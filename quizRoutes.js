var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var dbSchema = require('./dbSchema');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.engine('ejs',require('ejs-locals'));

//npm install path
var path = require('path');
//npm install mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodeworkshop');
//npm install express-session
var esession = require('express-session');
app.use(esession({ resave: false, saveUninitialized: false, secret: 'a secret' }));
//npm install md5
var md5 = require('md5');
//for the css and js
app.use(express.static(path.join(__dirname, 'static')));

app.get('/',function(req,res){
    if(req.session.user != null)
    {
        res.render('blank',{"page":"question.ejs","qno":5,"user":req.session.user,"totalQ":8,"qAnswered":5});
    }
    else
    {
        res.redirect('./login');
    }
});

app.get('/register',function (req,res) {
   req.session.destroy();
   res.render('register'); 
});

app.post('/register',function (req,res) {
   var name = req.body.name; 
   var email = req.body.email; 
   var password = req.body.password; 
   var user = new dbSchema.users({
        "name": name,
        "email":email,
        "password":md5(password),
        "points":"0",
        "questionsAnswered":""
   }).save();
   res.redirect('/login');
});

app.get('/login',function(req,res){
    if(req.session.user != null)
    {
        res.redirect('./question1');
    }
    else
    {
        res.render('login');
    }
});

app.post('/login',function (req,res) {
    var email = req.body.email;
    var password = req.body.password;
    var user = dbSchema.users.findOne({"email":email},function (userError, userData) {
       if(userError)
            res.render('login',{"error":""+userError});
        else
        {
            if(userData == null){
                res.render('login',{"error":"User not found"});
            }
            else if(userData.password == md5(password))
            {
                req.session.user = userData;
                res.redirect('./question1');
            }
            else{
                res.render('login',{"error":"Password incorrect"});
            }
        } 
    });

});

dbSchema.questions.count(function (countErr, countData) {
    for (var i = 1; i <= countData; i++) {
        app.get('/question'+i, function (req, res) {
            var qno = parseInt(req.url.split("question")[1]);
            var user = dbSchema.users.findOne({"email":req.session.user.email}, function (userError, userData) {
                if (userData.questionsAnswered == "") 
                {
                    var questionsAnswered = [];
                } else {
                    var x = userData.questionsAnswered;
                    userData.questionsAnswered = x.substring(1,x.length);
                    var questionsAnswered = userData.questionsAnswered.split(',');
                }
                if(questionsAnswered.length == countData)
                {
                    res.render("blank",{"page":"result.ejs","result":userData.points,"user":req.session.user,"totalQ":countData,"qAnswered":questionsAnswered.length});
                }
                else if ( questionsAnswered.indexOf(""+qno) == -1 )
                {
                    var question = dbSchema.questions.find({},function (questionErr, questionData) {
                    req.session.correctAns = questionData[qno-1].correctAns;
                    res.render('blank',{"page":"question.ejs","qno":qno,"user":req.session.user,"totalQ":countData,"qAnswered":questionsAnswered.length, "quests":questionData[qno-1]});
                    });
                }
                else
                {
                    console.log(qno);
                    var newQ = parseInt((qno+1)%(countData));
                    if(newQ == 0)
                        res.redirect('./question'+countData);
                    else
                        res.redirect('./question'+newQ);

                }
            });
        });
        app.post('/question'+i,function (req, res) {
            var qno = parseInt(req.url.split("question")[1]);
            var answer = req.body.answer;
            if(answer == req.session.correctAns)
            {
                dbSchema.users.findOne({"email":req.session.user.email}, function (userError, userData) {
                    var points = parseInt(userData.points);
                    points += 10;
                    var questionsAnswered = userData.questionsAnswered;
                    questionsAnswered += ","+qno; 
                    dbSchema.users.updateOne({"email":req.session.user.email},{$set:{"points":""+points,"questionsAnswered": questionsAnswered}}, function (pointsErr, pointsData) {
                    var newQ = parseInt((qno+1)%(countData));
                    if(newQ == 0)
                        res.redirect('./question'+countData);
                    else
                        res.redirect('./question'+newQ);
                    });
                });
            }
            else
            {
                dbSchema.users.findOne({"email":req.session.user.email}, function (userError, userData) {
                    var points = parseInt(userData.points);
                    points += 10;
                    var questionsAnswered = userData.questionsAnswered;
                    questionsAnswered += ","+qno; 
                    dbSchema.users.updateOne({"email":req.session.user.email},{$set:{"questionsAnswered": questionsAnswered}}, function (pointsErr, pointsData) {
                        console.log("ASDFF");
                    var newQ = parseInt((qno+1)%(countData));
                    if(newQ == 0)
                        res.redirect('./question'+countData);
                    else
                        res.redirect('./question'+newQ);
                    });
                });
            }
        });
    }
});

app.get('/logout',function (req,res) {
    if(req.session.user != null)
    {
        req.session.destroy();

    }
   res.redirect('../login');
})
app.listen(3000,function(){
    console.log("Server Started");
});