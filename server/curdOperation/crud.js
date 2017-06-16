// Function to insert document 

exports.createCandidateProfile = function(schemaType, body, app, callBack){
	console.log("inside :",body);
	var dataToBeSaved = {};
	dataToBeSaved.name = body.name;
	dataToBeSaved.phoneNumber = body.phoneNumber;
	dataToBeSaved.email = body.email;
	dataToBeSaved.locationPreference = body.locationPreference;
	dataToBeSaved.technicalSkill = body.technicalSkill;
	dataToBeSaved.experience = body.experience;
	dataToBeSaved.currentLocation = body.currentLocation;
	dataToBeSaved.noticePeriod = body.noticePeriod;
	dataToBeSaved.educationQualification = body.educationQualification;
	var newuser = new schemaType(dataToBeSaved);
	newuser.save(function(err, result) {
		if (err){
			console.log("Error :",err);
			callBack("Error in saving","");
		} else {
			callBack("",result);
		}
	});		
}

// Function to update document

exports.updateDocument = function (query, toUpdateDoc, collection, options, app, callback){
	options.new = true;
	collection.findOneAndUpdate(query, toUpdateDoc, options).exec(function(err, doc){
		if(err){
			callback(err, "");
		} else {
			callback("", doc);
		}
	});
};

// Function to get document

exports.getOneDoc = function (query, collection, selection, app, callback){
	console.log("inside data");
	collection.findOne(query, selection).exec(function(err, doc){
		if(err){
			callback(err, "");
		} else {
			callback("", doc);
		}
	});
};

// Function to get document

exports.getAll = function (collection, selection, app, callback){
	collection.find({}, selection).exec(function(err, doc){
		if(err){
			callback(err, "");
		} else {
			callback("", doc);
		}
	});
};

//Function to insert documents

exports.ceateDocument = function (toSaveDoc, collection, app, callback){
	console.log("toSaveDoc :",toSaveDoc);
	var newDoc = new collection(toSaveDoc);
	newDoc.save(function(err, doc){
		if(err){
			callback(err, "");
		} else {
			callback("", doc);
		}
	});
};


