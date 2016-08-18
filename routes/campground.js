var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var middleware = require("../middleware");

//===============================
//CAMPGROUNDS ROUTES
//===============================

//INDEX - show all campgrounds
router.get("/", function(req, res){
   
    Campground.find({}, function(err, campgrounds) {
        if(err) {
            console.log(err);
        }else {
            res.render("campgrounds/index.ejs", {campgrounds: campgrounds}); 
        }
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new.ejs");
});

//CREATE - add a new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    var camp = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    };
    Campground.create(camp, function(err, newCamp) {
        if(err) {
            console.log(err);
        }else {
            res.redirect("/campgrounds");
        }
    });
});

//SHOW - show more info about one campground
router.get("/:id", function(req, res) {
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, camp) {
        if(err) {
            req.flash("error", "Campground not found.");
            console.log(err);
            res.redirect("/campgrounds");
        }else {
            res.render("campgrounds/show.ejs", {campground: camp});
        }
    });
});

//EDIT - show form to edit a campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err) {
            req.flash("error", "Campground not found.");
            res.redirect("/campgrounds");
        }
        res.render("campgrounds/edit.ejs", {campground: foundCampground});
    });
});

//UPDATE - update campground to DB
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, newCamp) {
        if(err) {
            req.flash("error", "Campground not found.");
            res.redirect("/campgrounds");
        }else {
            req.flash("success", "Campground updated successfully.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE - delete campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            req.flash("error", "Something went wrong.");
            res.redirect("/campgrounds");
        }else {
            req.flash("success", "Campground deleted successfully.");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;