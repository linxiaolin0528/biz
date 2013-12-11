var mongoose = require('mongoose'),
	Category = mongoose.model('Category');

exports.get = function(req, res){
	var categoryID = req.params.id;
	Category.find({'_id':categoryID}).sort({'createdAt': -1})
		.exec(function(err, categories){
			if(err) return res.render('500')
			Category.count().exec(function(err, count){
				res.render('categoryView/get', {
					categoryID: categoryID,
					categories: categories
				});
			});
	});
}

exports.create = function(req, res){
	res.render('categoryView/create');
}

// save category 
exports.save = function(req, res){
	var category = new Category();
	category.name = req.body.name;
	category.save(function(err){
		if(err){
			console.log(err.errors);
			res.render('categoryView/create');
		}else{
			var output = JSON.stringify(category);
			res.redirect('/category/get/' + category._id);
		}
	});
}


// Show list of categories
exports.index = function(req,res){
	Category.find({}).sort({'createdAt': -1})
		.exec(function(err, categories){
			if(err) return res.render('500')
			Category.count().exec(function(err,count){
				res.render('categoryView/index', {
					title: 'List of categories',
					categories: categories
				});
			})
		});
}	


