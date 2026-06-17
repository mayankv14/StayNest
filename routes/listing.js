const express = require("express");
const { modelName } = require("../models/review");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


router //index route and create route
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        validateListing,
        upload.single("listing[image]"),
        wrapAsync(listingController.createListing)
    );

//    .post( upload.single('listing[image]'), (req,res) => {
//     res.send(req.file);
//    });



//New & Create Route (Get and Post request)
//New Route (to create new route)
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.get("/search", listingController.searchListings);


router //show route & delete route & update
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
    isLoggedIn,
    isOwner, 
    upload.single("listing[image]"),
    validateListing, 
    wrapAsync(listingController.updateListing)
)
.delete(isLoggedIn, isOwner,wrapAsync(listingController.distroylisting))

//Edit Route (get{for form}, put req. Update it and put)
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;