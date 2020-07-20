const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const config = require("./config.js");
const funs = require("./functions.js");
const mongoose = require("mongoose");

//connecting to the mongoDB database using mongoose
mongoose.connect("mongodb+srv://admin-marco:" + config.mongoPassword +"@cluster0-0gjai.mongodb.net/BlogDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});


//creating a schema for the posts we are going to be adding to the database
const postSchema = {
    title: String,
    author: String,
    date: String,
    text: String,
    category: String
}

const Post = mongoose.model("Post", postSchema);

const app = express();


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



//home page
app.get("/", function (req, res) {
    Post.find({}, function (err, posts) {
        res.render('index', {posts: posts});
    })
})

//Brings user to page where they can create a new blog post
app.get("/create" + config.password, function (req, res) {
    res.render('create');
})

//when a user submits a new blog post
app.get("/submit", function (req, res) {
    res.render('submit')
})

//When user submits a new blog post
app.post("/create", function (req, res) {
    const post = new Post({
        title: req.body.postTitle,
        author: req.body.postAuthor,
        text: req.body.postBody,
        category: req.body.postCategory,
        date: funs.getDate()
    })

    post.save();

    console.log(post);
    res.redirect("submit");


})

app.get("/posts/:postTitle", function (req, res) {
    const postTitle = req.params.postTitle.replace("%20", " ");
    console.log(postTitle);

    Post.findOne({title: postTitle}, function (err, post) {
        if(err || post === null){
            res.render("404");
        }else{
            res.render("post", {post: post});
        }


    })
})

app.get("/profile", function(req, res){
    res.render('profile');
})

app.get("/maintenance", function(req, res){
    res.render('maintenance');
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3000");
})