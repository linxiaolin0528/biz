var mongoose = require('mongoose'),
    Listing = mongoose.model('Listing'),
    async = require('async');

module.exports = function (app) {
    // Listing routes
    var listings = require('../app/controllers/listings');
    
    // home route
    app.get('/', listings.index);
    app.get('/listings/get/:id', listings.get);
    app.get('/listings/create', listings.create);
    
    app.post('/listings/save', listings.save);


    app.get('/listings/:id/edit', listings.edit);
    app.put('/listings/:id', listings.update);
    app.del('/listings/:id',  listings.destroy);

// app.get('/\/users\/(\d*)\/?(edit)?/',){
//     // /user/10
//     // /user/10/
//     // /user/10/edit

//     var message = 'user #' + req.params[0] + "'s profile";
//     if(req.params[1] === 'edit'){
//         message = "Editing " + message;
//     }else{
//         message = "Viewing " + message;

//     }
// }





    app.param('listingId', function (req, res, next, id) {
        Listing.findOne({ _id : id })
        .exec(function (err, listing) {
            if (err) return next(err);
            if (!listing) return next(new Error('Failed to load Listing ' + id));
            req.profile = listing;
            next();
        });
    });



}
