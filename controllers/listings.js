const Listing = require("../models/listing");   
const geocoder = require("../utils/geocoder");

module.exports.index = async (req, res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
};

module.exports.searchListings = async (req, res) => {
    const { q } = req.query;

    const allListings = await Listing.find({
        title: { $regex: q, $options: "i" }
    });

    if(allListings.length === 0) {
        req.flash("error", "No listings found matching your search.");
        return res.redirect("/listings");
    }

    res.render("listings/index", { allListings });
};

module.exports.renderNewForm = (req,res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews", 
        populate: {
        path: "author",
    },
})
    .populate("owner");
    if(!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listing");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};

 module.exports.createListing = async (req, res) => {

    let response = await geocoder.geocode(req.body.listing.location);

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    newListing.geometry = {
        type: "Point",
        coordinates: [
            response[0].longitude,
            response[0].latitude
        ]
    };

    console.log(newListing.geometry);

    await newListing.save();

    req.flash("success", "New Listing is created");
    res.redirect("/listings");
};

    module.exports.renderEditForm = async (req, res) => {
        let {id} = req.params;
        const listing = await Listing.findById(id);
        if(!listing) {
            req.flash("error", "Listing you requested for does not exist!");
            res.redirect("/listing");
        }

        let originalImageUrl = listing.image.url;
        originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_100,w_250");
        res.render("listings/edit.ejs", {listing,originalImageUrl});
    };

    module.exports.updateListing = async (req, res) => {
        let {id} = req.params;
        let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});


        if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename };
        await listing.save();
        }
        req.flash("success", "Listing Updated!");
        res.redirect(`/listings/${id}`);
    };

    module.exports.distroylisting = async (req,res) => {
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success", "Listing is Deleted!");
    res.redirect("/listings");
};