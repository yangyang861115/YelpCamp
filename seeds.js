var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Desert Mesa",
        image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, accusantium, corporis, ipsam, error similique officiis consequuntur dicta id soluta officia quam ex dolorem debitis totam tempora velit illo facere expedita?"
    },     
    {
        name: "Cloud's Rest",
        image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, accusantium, corporis, ipsam, error similique officiis consequuntur dicta id soluta officia quam ex dolorem debitis totam tempora velit illo facere expedita?"
    }, 
    {
        name: "Canyon Floor",
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, accusantium, corporis, ipsam, error similique officiis consequuntur dicta id soluta officia quam ex dolorem debitis totam tempora velit illo facere expedita?"
    }, 
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        //Add a few campgrounds
        Comment.remove({}, function(err){
            if(err) {
                console.log(err);
            } else {
                console.log("removed comments!");
                // data.forEach(function(seed){
                //     Campground.create(seed, function(err, camp) {
                //         if(err) {
                //             console.log(err);
                //         }else {
                //             console.log("added a campground");
                //             //Add a few comments
                //             Comment.create({
                //                 text: "This place is great",
                //                 author: "Yang"
                //             }, function(err, comment){
                //                 if(err) {
                //                     console.log(err);
                //                 }else {
                //                     console.log("a comment is created");
                //                     camp.comments.push(comment);
                //                     camp.save(function(err, camp) {
                //                         if(err) {
                //                             console.log(err);
                //                         } else {
                //                             console.log("a comment is saved to campground");
                //                         }
                //                     });
                //                 }
                //             });
                //         }
                //     }) 
                // })
            }
        });
    });
    
}

module.exports = seedDB;