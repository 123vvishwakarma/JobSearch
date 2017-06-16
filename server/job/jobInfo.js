// API to create Job --- /api/createJob
exports.createJob = function(req, res){
	console.log("Jobs to create: ", req.body);	
	
	var newJob = req.body;
	var schemaType = req.app.schema.job;
	
	req.app.crud.ceateDocument(newJob, schemaType, req.app, function(err, doc){
		if(err){
			console.log("Error in creating jobs: ",err);
			var response = {};
			response.res = false;
			response.message = "Unexpected error";
			res.json({response});
		} else {
			console.log("Created Job: ",doc);
			var response = {};
			response.res = true;
			response.result = doc;
			response.message = "Successfully saved";
			res.json({response});
			res.json({doc});
		}
	});	
};

// API to update Job --- /api/updateJob/:id
exports.updateJob = function(req, res){
	console.log("Fields that has to be updated: ", req.body);
	
	var jobId = req.params.id;
	var toUpdateDoc = req.body;
	var schemaType = req.app.schema.job;
	var query = {
		_id : jobId
	}
	
	req.app.crud.updateDocument(query, toUpdateDoc, schemaType, {}, req.app, function(err, doc){
		if(err){
			console.log("Error in updating jobs: ",err);
			var response = {};
			response.res = false;
			response.message = "Unexpected error";
			res.json({response});
		} else {
			console.log("Updated Job: ",doc);
			var response = {};
			response.res = true;
			response.result = doc;
			response.message = "Successfully updated";
			res.json({response});
			res.json({doc});
		}
	});
};

// API to get single Job - /api/getJob/:id
exports.getJob = function(req, res){
	console.log("Job to get: ", req.params);
	
	var jobId = req.params.id;
	var schemaType = req.app.schema.job;
	var selection = {};
	var query = {
		_id : jobId
	}
	
	req.app.crud.getOneDoc(query, schemaType, selection, req.app, function(err, doc){
		if(err){
			console.log("Error in getting single job: ",err);
			var response = {};
			response.res = false;
			response.message = "Unexpected error";
			res.json({response});
		} else {
			console.log("Got single Job: ",doc);
			var response = {};
			response.res = true;
			response.result = doc;
			response.message = "God single document";
			res.json({response});
			res.json({doc});
		}
	});
};

// API to get all Jobs - /api/getAllJobs
exports.getAllJobs = function(req, res){
	var schemaType = req.app.schema.job;
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

// API to get matching jobs for a candidate - /candidates/getJobsForCandidates/:id
exports.getJobsForCandidates = function(req, res){
 
 var candidateId = req.params.id;
 
 var eventEmitter = new events.EventEmitter();
 
 eventEmitter.on('getCandidateDoc', function(candidateId){
  var collection = req.app.schema.candidate;
  var selection = {};
  var query = {
   _id : candidateId
  }  
  req.app.crud.getOneDoc(query, collection, selection, req.app, function(err, doc){
   if(err){
    console.log("Error in getting single job: ",err);
    res.json("Unexpected error");
   } else {
    console.log("Got single Job: ",doc);
    eventEmitter.emit('getJobsForCandidates', doc);
   }
  });
 });
 
 eventEmitter.on('getJobsForCandidates', function(candidate){
  var collection = req.app.schema.job;
  var selection = {};
  var query = {skillsRequired: {$in:candidate.technicalSkill}, jobLocation: candidate.locationPreference};
  
  req.app.crud.getAll(query, collection, selection, req.app, function(err, docs){
   if(err){
    console.log("Error in getting all jobs: ",err);
    res.json("Unexpected error");
   } else {
    console.log("Got Jobs: ",docs);
    res.json(docs);
   }
  });
 });
 
 eventEmitter.emit('getCandidateDoc', candidateId);
 
};