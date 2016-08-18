var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat-app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var chouchou = new Cat({
//     name: "miao",
//     age: 1,
//     temperament: "my pet 2" 
// });

// chouchou.save(function(err, cat) {
//     if(err) {
//         console.log(err);
//     }else {
//         console.log(cat);
//     }
// });
Cat.create({
    name: "white",
    age: 3,
    temperament: "my pet 3" 
}, function(err, cat) {
     if(err) {
        console.log(err);
    }else {
        console.log(cat);
    }
});

Cat.find({}, function(err, cats) {
    if(err) {
        console.log(err);
    }else {
        console.log(cats);
    }
});
