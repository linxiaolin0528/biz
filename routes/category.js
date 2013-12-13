exports.add = function(req, res, next){
	res.render('../public/views/category/add');
};

exports.save = function(req, res, next){
	req.db.Category.create({
		name: req.body.name
	}, function(err, obj){
		if(err) next(err);
		if(!obj) next('can not create');
		res.json(200, obj);
	})
};


exports.get = function(req, res, next){
	console.log('get category id: ' + req.params.id);
	req.db.Category.findById(req.params.id, function(err, obj){
		if(err) next(err);
		if(!obj) next('cannot find');
		res.json(200, obj);
	});
};


exports.list = function(req, res, next){
	console.log('get a list of categories');
	req.db.Category.find({}, function(err, obj){
		if(err) next(err);
		res.json(200, obj);
	});
}
