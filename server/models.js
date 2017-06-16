exports = module.exports = function(app, mongoose) {
	require('./schema/candidateSchema')(app, mongoose);
	require('./schema/jobSchema')(app, mongoose);
};