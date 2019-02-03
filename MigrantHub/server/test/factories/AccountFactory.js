module.exports.validMigrantAccount = function() {
  return {
    proficiencyExams : {
      ielts : "false",
      french : "true",
      others : "Computer Programming"
    },
    languages : [
        {
            name : "French",
            writingLevel : "beginner",
            speakingLevel : "beginner"
        }
    ],
    family : [
        {
            age : "14",
            gender : "male",
            relation : "brother",
            relationshipStatus : "single"
        },
        {
            age : "50",
            gender : "female",
            relation : "mother",
            relationshipStatus : "married"
        },
        {
            age : "51",
            gender : "male",
            relation : "father",
            relationshipStatus : "married"
        }
    ],
    workExperience : [
        {
            title : "Admin",
            company : "Concordia",
            years : "2"
        }
    ],
    email : "test@test.com",
    userType: "local",
    password : "testtest",
    confirmPassword : "testtest",
    firstName : "test",
    lastName : "test",
    address : "1455 Boulevard de Maisonneuve O",
    apartment : "",
    city : "Montreal",
    province : "QC",
    postalCode : "H3G 1M8",
    phoneNumber : "(514) 848-2424",
    age : "22",
    gender : "male",
    nationality : "Canadian",
    relationshipStatus : "single",
    status : "citizen",
    writingLevel : "intermediate",
    speakingLevel : "intermediate",
    motherTongue : "English",
    educationLevel : "secondary",
    jobStatus : "student",
    lookingForJob : "false",
    currentIncome : "15000",
    settlingLocation : "LAVAL, QC",
    settlingDuration : "15",
    joiningReason : "help"
  };
};

module.exports.emptyMigrantAccount = function() {
  return {
    proficiencyExams : {
      ielts : "",
      french : "",
      others : ""
    },
    languages : [
        {
            name : "",
            writingLevel : "",
            speakingLevel : ""
        }
    ],
    family : [
        {
            age : "",
            gender : "",
            relation : "",
            relationshipStatus : ""
        },
        {
            age : "",
            gender : "",
            relation : "",
            relationshipStatus : ""
        },
        {
            age : "",
            gender : "",
            relation : "",
            relationshipStatus : ""
        }
    ],
    workExperience : [
        {
            title : "",
            company : "",
            years : ""
        }
    ],
    email : "",
    userType: "",
    password : "",
    confirmPassword : "",
    firstName : "",
    lastName : "",
    address : "",
    apartment : "",
    city : "",
    province : "",
    postalCode : "",
    phoneNumber : "",
    age : "",
    gender : "",
    nationality : "",
    relationshipStatus : "",
    status : "",
    writingLevel : "",
    speakingLevel : "",
    motherTongue : "",
    educationLevel : "",
    jobStatus : "",
    lookingForJob : "",
    currentIncome : "",
    settlingLocation : "",
    settlingDuration : "",
    joiningReason : ""
  };
};


module.exports.invalidNumbersMigrantAccount = function() {
  return {
    proficiencyExams : {
      ielts : "false",
      french : "true",
      others : "Computer Programming"
    },
    languages : [
        {
            name : "French",
            writingLevel : "beginner",
            speakingLevel : "beginner"
        }
    ],
    family : [
        {
            age : "-14",
            gender : "male",
            relation : "brother",
            relationshipStatus : "single"
        },
        {
            age : "-8",
            gender : "female",
            relation : "mother",
            relationshipStatus : "married"
        },
        {
            age : "-51",
            gender : "male",
            relation : "father",
            relationshipStatus : "married"
        }
    ],
    workExperience : [
        {
            title : "Admin",
            company : "Concordia",
            years : "years"
        }
    ],
    email : "lax@hotmail.com",
    userType: "local",
    password : "$2a$10$U1yloqe8t2ultaLED/XXduPY/msYNk15aFEehh0eACXvStsDewHs2",
    confirmPassword : "$2a$10$U1yloqe8t2ultaLED/XXduPY/msYNk15aFEehh0eACXvStsDewHs2",
    firstName : "Lax",
    lastName : "Test",
    address : "1455 Boulevard de Maisonneuve O",
    apartment : "",
    city : "Montreal",
    province : "QC",
    postalCode : "H3G 1M8",
    phoneNumber : "(514) 848-2424",
    age : "-1",
    gender : "male",
    nationality : "Canadian",
    relationshipStatus : "single",
    status : "citizen",
    writingLevel : "intermediate",
    speakingLevel : "intermediate",
    motherTongue : "English",
    educationLevel : "secondary",
    jobStatus : "student",
    lookingForJob : "false",
    currentIncome : "-15000",
    settlingLocation : "LAVAL, QC",
    settlingDuration : "invalid",
    joiningReason : "help"
  }
}
module.exports.validBusinessAccount = function() {
  return {
    email : "test@test.com",
    userType: "local",
    password : "testtest",
    confirmPassword : "testtest",
    firstName : "test",
    lastName : "test",
    address : "1455 Boulevard de Maisonneuve O",
    apartment : "",
    city : "Montreal",
    province : "QC",
    postalCode : "H3G 1M8",
    phoneNumber : "(514) 848-2424",
    corpId: "1112223",
    organizationName: "test",
    orgType: "test",
    department: "test",
    serviceType: "test",
    description: "test"
  };
};

module.exports.emptyBusinessAccount = function() {
  return {
    email : "",
    userType: "",
    password : "",
    confirmPassword : "",
    firstName : "",
    lastName : "",
    address : "1",
    apartment : "",
    city : "",
    province : "",
    postalCode : "",
    phoneNumber : "",
    corpId: "",
    organizationName: "",
    orgType: "",
    department: "",
    serviceType: "",
    description: ""
  };
};

module.exports.validAdminAccount = function() {
  return {
    email : "test@test.com",
    userType: "local",
    password : "testtest",
    confirmPassword : "testtest"
  };
};

module.exports.emptyAdminAccount = function() {
  return {
    email : "",
    userType: "",
    password : "",
    confirmPassword : ""
  };
};