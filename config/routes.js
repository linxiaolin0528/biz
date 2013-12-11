var mongoose = require('mongoose'),
    Listing = mongoose.model('Listing'),
    async = require('async');

module.exports = function (app) {  

    // home route
    

    // listings
    var listing = require('../app/controllers/listingController');
    app.get('/', listing.index);
    app.get('/listing/', listing.index);
    app.get('/listing/get/:id', listing.get);
    app.get('/listing/create', listing.create);
    
    app.post('/listing/save', listing.save);

    app.get('/listing/:id/edit', listing.edit);
    app.put('/listing/:id', listing.update);
    app.del('/listing/:id',  listing.destroy);

    // category
    var category = require('../app/controllers/categoryController');
    app.get('/category/get/:id', category.get);
    app.get('/category/create', category.create);
    app.get('/category/', category.index);
    app.post('/category/save', category.save);


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
