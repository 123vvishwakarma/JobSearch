    //'use strict';

exports = module.exports = function(app, mongoose) {
  var jobSchema = mongoose.Schema({ 
    "salary": {type: String},
    "postedDate": {type:Date, default: Date.now},
    "startDate": {type:Date, default: Date.now},
    "endDate": Date,
    "designation": {type: String},
    "employmentType": {type: String},
    "jobLocation": {type: String},
    "qualifications": {type: String},
    "organizationName": {type: String},
    "orgainizationDescription": {type: String},
    "skillsRequired": [{type : String}],
    "recruiterName": {type: String},
    "recruiterEmail": {type: String},
    "recruiterPhoneNumber": {type: String},
    'verificationStatus': {type: String},
    'SubscriptionType': {type: String},
    'jobType': {type: String},  // PartTime ,FullTime
    'jobDescription': {type: String},
    'priority': {type: String}//Normal,Medium,High
  	});
  var job = mongoose.model('job', jobSchema);
  app.schema.job = job;
    
};