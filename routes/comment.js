var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//===============================
//COMMENTS ROUTES
//===============================

//NEW - show form to create new comment
router.get("/new", middleware.isLoggedIn,function(req, res) {
    var campId = req.params.id;
    Campground.findById(campId, function(err, camp) {
        if(err) {
            req.flash("error", "Comment not found.");
            console.log(err);
        }else {
            res.render("comments/new.ejs", {campground: camp});
        }
    });
});

//CREATE - add a new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    var campId = req.params.id;
    var comment = req.body.comment;
    Campground.findById(campId, function(err, camp) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        }else {
            Comment.create(comment, function(err, newcomment) {
                if(err) {
                    req.flash("error", "Something went wrong.");
                    console.log(err);
                }else {
                    //add username and id to comment
                    newcomment.author.username = req.user.username;
                    newcomment.author.id = req.user._id;
                    //save comment
                    newcomment.save();
                    
                    camp.comments.push(newcomment);
                    camp.save();
                    
                    req.flash("success", "Successfully added comment.");
                    res.redirect("/campgrounds/" + campId);
                }
            });
        }
    });
});

//EDIT - show form to edit comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err) {
            res.redirect("back");
        }else {
            res.render("comments/edit.ejs", {campground_id: req.params.id, comment : comment}); 
        }
    })
})

//UPDATE - update comment in DB
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment) {
        if(err) {
            res.redirect("back");
        }else {
            res.redirect("/campgrounds/" + req.params.id); 
        }
    }); 
});

//DELETE - delete comment in DB
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err, comment) {
        if(err) {
            res.redirect("back");
        }else {
            Campground.findById(req.params.id, function(err, camp) {
                //delete comment in Campground comments array
                for(var i = 0; i < camp.comments.length; i++) {
                    if(camp.comments[i].equals(req.params.comment_id)){
                        var idx = i;
                    }
                }
               
                camp.comments.splice(idx, 1);
                camp.save();
            });
            req.flash("success", "Successfully deleted the comment.");
            res.redirect("/campgrounds/"+ req.params.id);
        }

    });
})

module.exports = router;