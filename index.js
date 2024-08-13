const express = require('express');
const path = require('path'); // Include the path module
const app = express();
const fs = require('fs');

app.set("view engine", "ejs");
app.use(express.json()); // Add missing parentheses
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req, res) {
    fs.readdir(`./files`,function(err, files){
        res.render("index",{files: files});// we can send any data from here to views folder
    });
});

app.get('/file/:filename', function(req, res) {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, filedata){
        res.render('show',{filename: req.params.filename, filedata:filedata});
    })
});

app.post('/create', function(req, res) {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
        res.redirect("/");
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
