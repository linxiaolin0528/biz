var mongoose = require('mongoose'),
	Listing = mongoose.model('Listing'),
	Address = mongoose.model('Address');

// save listing 
exports.save = function(req, res){
	var listing = new Listing();
	var address = new Address();

	address.address1 = req.body.address1;
	address.address2 = req.body.address2;
	address.city = req.body.city;
	address.state = req.body.state;
	address.country = req.body.country;
	address.zipCode = req.body.zipCode;

	listing.name = req.body.name;
	listing.webUrl = req.body.webUrl;
	listing.phone = req.body.phone;
	listing.hours = req.body.hours;
	listing.payment =req.body.payment;
	listing.latitude = req.body.latitude;
	listing.longitude = req.body.longitude;
	listing.description = req.body.description;
	

	address.save(function(err){
		if(err){
			res.redirect('listingView/create');
			console.log(err.errors);
		}else{
			listing.save(function(err){
				if(err){
					console.log(err.errors);
					res.render('listingView/create');
				}else{
					var output = JSON.stringify(listing);
					res.redirect('/listing/get/' + listing._id);
				}
			});
		}
	});

}

exports.create = function(req, res){
	res.render('listingView/create');
}

exports.get = function(req, res){
	var listingID = req.params.id;
	Listing.find({'_id':listingID}).sort({'createdAt': -1})
		.exec(function(err, listings){
			if(err) return res.render('500')
			Listing.count().exec(function(err, count){
				res.render('listingView/get', {
					title:'Get Listing Object API',
					listingID: listingID,
					listings: listings
				});
			});
		});
}


// Show list of listings
exports.index = function(req,res){
	Listing.find({}).sort({'createdAt': -1})
		.exec(function(err, listings){
			if(err) return res.render('500')
			Listing.count().exec(function(err,count){
				res.render('listingView/index', {
					title: 'List of listings',
					listings: listings
				});
			})
		});
}	

// edit listing
exports.edit = function(req, res){
	res.render('listingView/edit', {
		title: 'Edit '+req.listing.title,
	    listing: req.listing
	});
}

// update listing
exports.update = function(req, res){
	var listing = req.listing;

	listing = _extend(listing, req.body);
	listing.save(function(err,doc){
		if(err){
			res.render('listingView/edit', {
				title: 'Edit listing',
				listing: listing,
				errors: err.erros	
			});
		} else {
			res.redirect('/listings/'+listing._id);
		}
	});
}

// delete listing
exports.destroy = function(req, res){
	var listing = req.listing;
	listing.remove(function(err){
		res.redirect('/listing');
	});
}