const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const movieRoutes = express.Router();
const PORT = 4000;

let Movie = require('./Movies');
let Admin = require('./Admin');
let Users = require('./users');
let Comment = require ('./Comments');

app.use(cors()); //help us transfer data from and to other servers
app.use(bodyParser.json());  //decrypting url request body with json

mongoose.connect('mongodb://127.0.0.1:27017/movies', { useNewUrlParser: true } );
const connection = mongoose.connection;

//making sure conneciton has been established 
connection.once('open', function(){
console.log("MongoDB database conneciton has been established");
})

movieRoutes.route('/').get(function(req, res) {
    Movie.find(function(err, movie){
        if (err){
            console.log(err);
        } else {
            
            res.json(movie);
        }
    });
});

movieRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;   
    Movie.findById(id, function(err, movie){
        res.json(movie);
    });
});

movieRoutes.route('/comments/:id').get(function(req,res){
    Comment.find({movieId:req.params.id}, function(err, comment){
        res.json(comment);
    });
});


movieRoutes.route('/comments/:id').post(function(req,res){
    Comment.find({movieId:req.params.id}, function(err, comment){
        let user = new Comment(req.body);
            user.save()
                .then(user => {
                    res.status(200).json({'Comment': req.body.comment + ' added successfully'});
                })
                .catch(err => {
                    res.status(400).send('adding new user has failed');
                });
    });
});

movieRoutes.route('/Logina').post(function(req,res){
    Admin.findOne({username: req.body.username}, function(err,user){
        if(user === null) res.send("User Not Found");
        else if (user.username === req.body.username && user.password === req.body.password) res.send([msg='Valid Login',username=req.body.username]);
        else res.send("Invalid Password");
    });
});

movieRoutes.route('/Loginu').post(function(req,res){
    Users.findOne({username: req.body.username}, function(err,user){
        if(user === null) res.send("User Not Found");
        else if (user.username === req.body.username && user.password === req.body.password) res.send([msg='Valid Login',username=req.body.username]);
        else res.send("Invalid Password");
    });
});



movieRoutes.route('/Register').post(function(req, res){
    Users.findOne({username: req.body.username}, function(err,user){
        if(user === null) {
            res.send("User Not Found");
            let user = new Users(req.body);
            user.save()
                .then(user => {
                    res.status(200).json({'user': 'added successfully'});
                })
                .catch(err => {
                    res.status(400).send('adding new user has failed');
                });
        }
        else res.send("User Already Exists");
    });        
   
}); 

movieRoutes.route('/add').post(function(req, res){
    let movie = new Movie(req.body);
    movie.save()
        .then(movie => {
            res.status(200).json({'movie': 'Movie added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new Movie has failed');
        });
}); 

movieRoutes.route('/update/:id').put(function(req, res, next){
    Movie.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Movie.findOne({_id: req.params.id}).then(function(movie){
            res.send(movie);
        });
    }).catch(next);
});

app.use('/movies', movieRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});