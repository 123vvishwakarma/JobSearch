var mongoose = require('mongoose');

module.exports = {
	MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/job_portal',// for local system
}