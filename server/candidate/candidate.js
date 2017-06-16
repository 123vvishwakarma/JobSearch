var events = require('events');
var fs = require('fs');
var mkdirp = require('mkdirp');
var async = require('async');

//API to create candidate profile --- /api/profileupload 
exports.candidateProfileUpload = function(req, res) {
	var eventEmitter = new events.EventEmitter();
	var schemaType = req.app.schema.candidate;
	var data_module = req.body.data;
	var destinationPath = './images/' + req.body.phoneNumber; // create a directory
	if(typeof data_module != "undefined"){
       if(typeof data_module !== "object"){
			data_module = JSON.parse(data_module); 
		} 
    }else{
       data_module = req.body;
    }
	schemaType.find({phoneNumber : data_module.phoneNumber}).exec(function(err, candidateInfo){
      	if(err){
      		console.log("Error :",err);
      	} else if (candidateInfo.length > 0 ){
    		var response = {};
			response.res = false;
			response.message = "User already exists";
    		res.json({response});     		
    	} else {
      		if (req.files){
				eventEmitter.emit('checkForFolderExist', schemaType, destinationPath, data_module);
			} else {
				eventEmitter.emit('createDocument', schemaType, data_module);	
			}
    	}
  	});


	eventEmitter.on('checkForFolderExist', function(schemaType, destinationPath, body){
		if (fs.existsSync(destinationPath)) {
            eventEmitter.emit('uploadDocuments', schemaType, destinationPath, body);
      	} else {
            mkdirp(destinationPath, function(err) {
    	        if (err) {
                    console.log("Error: ", err);
                    return new Error("Error while creating folder");
                } else {
				   	eventEmitter.emit('uploadDocuments', schemaType, destinationPath, body);
				}
            });
      	} 
    });
	eventEmitter.on('uploadDocuments', function(schemaType, path, body){   
		var files = req.files;
		var filename;
        async.forEach(Object.keys(files), function (item, callback){
			var destPath = destinationPath;
            var fileObj = req.files[item];
			
            var sourceFileLoc = fileObj.path;
			var originalname = fileObj.fieldname;
			var extension = fileObj.extension;
            if(item == originalname){
				console.log("inside unload image");
                filename = originalname + "." + extension;
            }
			
            if (fs.existsSync(destPath)) {
               destPath += "/" + filename;
			   console.log("dest file location",destPath);
                fs.createReadStream(sourceFileLoc).
                    pipe(fs.createWriteStream(destPath));
                callback(); // tell async that the iterator has completed
            } else {
				console.log("outside data");
			}
        }, function(err) {
			if(err){
				console.log("Error!!!!!!!!!!!!!!");
			}else{
				console.log('All image uploaded');
			    eventEmitter.emit('createDocument', schemaType, body);	
			}
        });
    });
	eventEmitter.on('createDocument', function(schemaType, body){
		req.app.crud.createCandidateProfile(schemaType, body, req.app, function(err, result){
			if(err){
				console.log("Error :",err);
				var response = {};
				response.res = false;
				response.message = "Unexpected error";
				res.json({response});
			} else {
				console.log("Result :", result);
				var response = {};
				response.res = true;
				response.result = result;
				response.message = "Successfully saved";
				res.json({response});
			}
		});
	});
}

//API to update candidate profile --- /api/updateCandidate/:id
exports.updateCandidate = function(req, res){
	console.log("Fields that has to be updated: ", req.body);
	var eventEmitter = new events.EventEmitter();
	var candidateId = req.params.id;
	var toUpdateDoc = req.body;
	var schemaType = req.app.schema.candidate;
	var query = {
		_id : candidateId
	}
	var destinationPath = './images/' + req.body.phoneNumber;
	eventEmitter.on('checkForFolderExist', function(schemaType, destinationPath, toUpdateDoc){
		if (fs.existsSync(destinationPath)) {
            eventEmitter.emit('uploadDocuments', schemaType, destinationPath, toUpdateDoc);
      	} else {
            mkdirp(destinationPath, function(err) {
    	        if (err) {
                    console.log("Error: ", err);
                    return new Error("Error while creating folder");
                } else {
				   	eventEmitter.emit('uploadDocuments', schemaType, destinationPath, toUpdateDoc);
				}
            });
      	} 
    });
	eventEmitter.on('uploadDocuments', function(schemaType, path, toUpdateDoc){   
		var files = req.files;
		var filename;
        async.forEach(Object.keys(files), function (item, callback){
			var destPath = destinationPath;
            var fileObj = req.files[item];
			
            var sourceFileLoc = fileObj.path;
			var originalname = fileObj.fieldname;
			var extension = fileObj.extension;
            if(item == originalname){
				console.log("inside unload image");
                filename = originalname + "." + extension;
            }
			
            if (fs.existsSync(destPath)) {
               destPath += "/" + filename;
			   console.log("dest file location",destPath);
                fs.createReadStream(sourceFileLoc).
                    pipe(fs.createWriteStream(destPath));
                callback(); // tell async that the iterator has completed
            } else {
				console.log("outside data");
			}
        }, function(err) {
			if(err){
				console.log("Error!!!!!!!!!!!!!!");
			}else{
				console.log('All image uploaded');
			    eventEmitter.emit('updateDocument', schemaType, toUpdateDoc);	
			}
        });
    });

	eventEmitter.on('updateDocument', function(schemaType, toUpdateDoc){
		req.app.crud.updateDocument(query, toUpdateDoc, schemaType, {}, req.app, function(err, doc){
			if(err){
				console.log("Error in updating candidates: ",err);
				var response = {};
				response.res = false;
				response.message = "Unexpected error";
				res.json({response});
			} else {
				console.log("Updated Candidate: ",doc);
				var response = {};
				response.res = true;
				response.result = doc;
				response.message = "Successfully updated";
				res.json({response});
			}
		});
	});
	if (req.files){
		console.log("inside");
		eventEmitter.emit('checkForFolderExist', schemaType, destinationPath, toUpdateDoc);
	} else {
		console.log("outside");
		eventEmitter.emit('updateDocument', schemaType, toUpdateDoc);	
	}
};

// API to get single Candidate --- /api/getCandidate/:id
exports.getCandidate = function(req, res){
	console.log("Candidate to get: ", req.params);
	
	var candidateId = req.params.id;
	var schemaType = req.app.schema.candidate;
	var selection = {};
	var query = {
		_id : candidateId
	}
	
	req.app.crud.getOneDoc(query, schemaType, selection, req.app, function(err, doc){
		if(err){
			console.log("Error in getting single candidate: ",err);
			var response = {};
			response.res = false;
			response.message = "Unexpected error";
			res.json({response});
		} else {
			console.log("Got single Candidate: ",doc);
			var response = {};
			response.res = true;
			response.result = doc;
			response.message = "Got single document";
			res.json({response});
		}
	});
};

// API to get all Candidates - /api/getAllCandidates
exports.getAllCandidates = function(req, res){
	var schemaType = req.app.schema.candidate;
	var selection = {};
	
	req.app.crud.getAll(schemaType, selection, req.app, function(err, docs){
		if(err){
			console.log("Error in getting all jobs: ",err);
			var response = {};
			response.res = false;
			response.message = "Unexpected error";
			res.json({response});
		} else {
			console.log("Got Jobs: ",docs);
			var response = {};
			response.res = true;
			response.result = docs;
			response.message = "Got all documents";
			res.json({response});
		}
	});
};


// API to get matching candidates for a job - /api/getCandidatesForJob/:id
exports.getCandidatesForJob = function(req, res){
 
 var jobId = req.params.id;
 
 var eventEmitter = new events.EventEmitter();
 
 eventEmitter.on('getJobDoc', function(jobId){
  var collection = req.app.schema.job;
  var selection = {};
  var query = {
   _id : jobId
  }  
  req.app.crud.getOneDoc(query, collection, selection, req.app, function(err, doc){
   if(err){
    console.log("Error in getting single job: ",err);
    res.json("Unexpected error");
   } else {
    console.log("Got single Job: ",doc);
    eventEmitter.emit('getCandidatesForJob', doc);
   }
  });
 });
 
 eventEmitter.on('getCandidatesForJob', function(job){
  console.log("job",job);
  var collection = req.app.schema.candidate;
  var selection = {};
  var query = {technicalSkill: {$in:job.skillsRequired}, locationPreference: job.jobLocation};
  
  req.app.crud.getAll(query, collection, selection, req.app, function(err, docs){
   if(err){
    console.log("Error in getting all jobs: ",err);
    res.json("Unexpected error");
   } else {
    console.log("Got Candidates: ",docs);
    res.json(docs);
   }
  });
 });
 
 eventEmitter.emit('getJobDoc', jobId);
 
};
