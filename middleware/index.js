//all the middleware 
var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.isLoggedIn = function (req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
};

middlewareObj.checkCommentOwnership = function (req, res, next){
    //does the user login?
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, comment) {
            if(err) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                //does the user own the comment? 
                if(comment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permisstion to do that.");
                    res.redirect("back");
                }
            }
        });
    }else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
};

middlewareObj.checkCampgroundOwnership = function (req, res, next){
    //is user logged in
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err) {
               res.redirect("back");
           }else {
               //does the user own the campground
               if(foundCampground.author.id.equals(req.user._id)){
                    next();
               }else {
                    req.flash("error", "You don't have permisstion to do that.");
                    res.redirect("back");
               }
           }
        });
    }else {
        //if not, redirect
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
};


module.exports = middlewareObj;