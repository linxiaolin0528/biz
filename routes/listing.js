exports.add = function(req, res, next){
	res.render('../public/views/listing/add');
};

exports.get = function(req, res, next){
	console.log('get listing id: ' + req.params.id);
	req.db.Listing.findById(req.params.id, function(err, obj){
		if(err) next(err);
		if(!obj) next('cannot find');
		res.json(200, obj);
	});
};


exports.search = function(req, res, next){
	res.render('../public/views/listing/search');
}



exports.performSearch = function(req, res, next){
	
	var statement = {
		'location.state': req.query.state,
		'location.zipCode': req.query.zipCode,
		'name': req.query.name
	}
	console.log('search listing : ' + JSON.stringify(statement) );
	var query = req.db.Listing.findOne(statement);

	query.exec(function(err, listings){
		if(err){
			next(err);
		}else{
			res.json(200, listings);
		}
	});
}


exports.save = function(req, res, next){
	var location = {
		address1: req.body.address1,
		address2: req.body.address2,
		city: req.body.city,
		state: req.body.state,
		zipCode: req.body.zipCode,
		country: req.body.country
	};
	req.db.Listing.create({
		location: location,
		name: req.body.name,
		phone: req.body.phone,
		webUrl: req.body.webUrl,
		mobile: req.body.mobile,
		fax: req.body.fax,
		hours: req.body.hours,
		payment: req.body.payment,
		latitude: req.body.latitude,
		longitude: req.body.longitude,
		description: req.body.description
	}, function(err, obj){
		if(err) next(err);
		if(!obj) next('can not create');
		res.json(200, obj);
	})
};




exports.upload = function(req, res, next){
	
}