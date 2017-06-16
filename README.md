# JobSearch
Job Portal
//create user profile 
API - /api/profileupload
Method -post
req : {
name:vikas
phoneNumber:1234567891
email:djfaskldj@gmail.com
locationPreference:Bangalore
technicalSkill:c,c++
experience:2
currentLocation:Chhindwara
noticePeriod:3
educationQualification:MCA
}

res : {
    "response": {
        "res": true,
        "result": {
            "__v": 0,
            "name": "vikas",
            "phoneNumber": 1234567891,
            "email": "ddfajkkdj@gmail.com",
            "locationPreference": "Bangalore",
            "experience": "2",
            "currentLocation": "dhfhasjdk",
            "noticePeriod": 3,
            "educationQualification": "kjkjdsfj",
            "_id": "5943fa6f59da9f3fe844e065",
            "phoneNumberVerification": true,
            "technicalSkill": [
                "c,c++"
            ]
        },
        "message": "Successfully saved"
    }
}

//update user profile
Method -put
API - /api/updateCandidate/:id
req : {
name:vikas
phoneNumber:1234567891
email:vvishwakarma123@gmail.com
locationPreference:Bangalore
technicalSkill:c,c++
experience:2
currentLocation:Chhindwara
noticePeriod:3
educationQualification:MCA
}
Res : {
    "response": {
        "res": true,
        "result": {
            "_id": "5943ebc698d86c30f81e2148",
            "name": "boijakdfna",
            "phoneNumber": 7945621230,
            "email": "vvishwakarma123@gmail.com",
            "locationPreference": "Bangalore",
            "experience": "2",
            "currentLocation": "Chhindwara",
            "noticePeriod": 3,
            "educationQualification": "MCA",
            "__v": 0,
            "phoneNumberVerification": true,
            "technicalSkill": [
                "c,c++"
            ]
        },
        "message": "Successfully updated"
    }
}

//get single data
Method - get
API - /api/getCandidate/:id
req : /api/getJob/5451545645fdi655

//get all data
Method - get
API - /api/getAllCandidates
req : /api/getAllJobs

//get all job
Method - get
API - /api/getCandidatesForJob/:id
req : /api/getJobsForCandidates/544655664dfd4656


//create job information
Method - post
API - /api/createJob
Req : {
salary:25226252,
jobType: fulltime,
jobLocation : Bangalore,
}

Res : {
    "response": {
        "res": true,
        "result": {
            "__v": 0,
            "salary": "25226252",
            "jobType": fulltime,
            "jobLocation" : Bangalore,
            "_id": "594409ae046c7c3e38daef91",
            "skillsRequired": [],
            "startDate": "2017-06-16T16:39:10.374Z",
            "postedDate": "2017-06-16T16:39:10.374Z"
        },
        "message": "Successfully saved"
    }
}

//update job information
Method - post
API - /api/updateJob/:id
Req : /api/updateJob/6546558665jhh9

Res : {
    "response": {
        "res": true,
        "result": {
            "__v": 0,
            "salary": "25226252",
            "jobType": fulltime,
            "jobLocation" : Bangalore,
            "_id": "594409ae046c7c3e38daef91",
            "skillsRequired": [],
            "startDate": "2017-06-16T16:39:10.374Z",
            "postedDate": "2017-06-16T16:39:10.374Z"
        },
        "message": "Successfully saved"
    }
}

//get single data
Method - get
API - /api/getJob/:id
req : /api/getJob/5451545645fdi655

//get all data
Method - get
API - /api/getAllJobs
req : /api/getAllJobs

//get all job
Method - get
API - /api/getJobsForCandidates/:id
req : /api/getJobsForCandidates/544655664dfd4656
