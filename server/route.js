var multer = require('multer');
var uploading = multer({
  dest: '/tmp',
});

module.exports = function(app) {

/*------------------------------------------------*/
	
	// Initial Load API
	app.get("/", function(req, res){
		res.send("Job Portal Application");
	});
	
/*------------------------------------------------*/

	// Jobs APIS - Start
	app.post('/api/createJob', require('./job/jobInfo').createJob);
	app.put('/api/updateJob/:id', require('./job/jobInfo').updateJob);
	app.get('/api/getJob/:id', require('./job/jobInfo').getJob);
	app.get('/api/getAllJobs', require('./job/jobInfo').getAllJobs);
	app.get('/api/getJobsForCandidates/:id', require('./job/jobInfo').getJobsForCandidates);
	
	// Jobs APIS - End
	
/*------------------------------------------------*/
	
	// Candidate APIS - Start
	app.post('/api/profileupload', uploading, require('./candidate/candidate').candidateProfileUpload);
	app.put('/api/updateCandidate/:id', require('./candidate/candidate').updateCandidate);
	app.get('/api/getCandidate/:id', require('./candidate/candidate').getCandidate);
	app.get('/api/getAllCandidates', require('./candidate/candidate').getAllCandidates);
	app.get('/api/getCandidatesForJob/:id', require('./candidate/candidate').getCandidatesForJob);
	
	// Candidate APIS - End
	
/*------------------------------------------------*/

}