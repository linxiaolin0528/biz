var mongoose = require('mongoose'),
	Listing = mongoose.model('Listing'),
	Address = mongoose.model('Address'),
	_ = require('underscore'),
	url = require('url'),
	http = require('http');

// save listing 
exports.save = function(req, res){
	var item = new Listing();
	var address = new Address();

	address.address1 = req.body.address1;
	address.address2 = req.body.address2;
	address.city = req.body.city;
	address.state = req.body.state;
	address.country = req.body.country;
	address.zipCode = req.body.zipCode;

	item.name = req.body.name;
	item.webUrl = req.body.webUrl;
	item.phone = req.body.phone;

	address.save(function(err){
		if(err){
			res.render('listings/create',{
				res.render('listings/create',{
						item: item,
						errors: err.errors
					});
			});
		}else{
			item.save(function(err){
				if(err){
					res.render('listings/create',{
						item: item,
						errors: err.errors
					});
				}else{
					var output = JSON.stringify(item);
					res.redirect('/listings/get/' + item._id);
				}
			});
		}
	});

	
	
	
}

exports.create = function(req, res){
	var test = 'xxxxx';
	res.render('listings/create',{
		test: test
	});
}

exports.get = function(req, res){
	var listingID = req.params.id;
	Listing.find({'_id':listingID}).sort({'createdAt': -1})
		.exec(function(err, listings){
			if(err) return res.render('500')
			Listing.count().exec(function(err, count){
				res.render('listings/get', {
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
				res.render('listings/index', {
					title: 'List of listings',
					listings: listings
				});
			})
		});
}	

// edit listing
exports.edit = function(req, res){
	res.render('listings/edit', {
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
			res.render('listings/edit', {
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
		res.redirect('/listings');
	});
}