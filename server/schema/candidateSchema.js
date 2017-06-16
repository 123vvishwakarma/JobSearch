//'use strict';

exports = module.exports = function(app, mongoose) {
  var candidateSchema = mongoose.Schema({ 
    "name" : String,
    "phoneNumber" : { type:Number, unique:true},
    "email": String,
    "locationPreference": String,
    "technicalSkill": [{type : String}],
    "resumeUrl": String,
    "profileUrl": String,
    "experience": String,
    "currentLocation": String,
    "noticePeriod":Number,
    "educationQualification": String,
    "phoneNumberVerification": {type:Boolean, default: true}
  	});
  var candidate = mongoose.model('candidate', candidateSchema);
  app.schema.candidate = candidate;
    
};