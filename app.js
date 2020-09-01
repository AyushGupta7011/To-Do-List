const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Buy Momos","Eat Momos","Buy More Momos","Eat More Momos"];
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    
    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    res.render("list",{kindofDay: day, newListItem: items});

});

app.post("/", function(req, res){

    let item =req.body.newItem;

    if(req.body.list === "Work"){
      workItems.push(item);
      res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req,res){
    res.render("list",{listTitle: "Work List", newListItems: workItems});
});

app .post("/work", function(req,res){
    let item =req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})


app.listen(3000, function() {
    console.log("Server started at port 3000");
});