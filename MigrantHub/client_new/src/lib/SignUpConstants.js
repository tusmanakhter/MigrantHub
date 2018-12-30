export const provinces = [
  { value: 'AB', label: 'Alberta' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland and Labrador' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NU', label: 'Nunavut' },
  { value: 'ON', label: 'Ontario' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'QC', label: 'Quebec' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'YT', label: 'Yukon' },
];

export const statuses = [
  { value: 'immigrant', label: 'Immigrant' },
  { value: 'refugee', label: 'Refugee' },
  { value: 'resident', label: 'Permanent Resident' },
  { value: 'citizen', label: 'Citizen' },
];

export const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export const relationshipStatuses = [
  { value: 'married', label: 'Married' },
  { value: 'single', label: 'Single' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
];

export const joiningReasons = [
  { value: 'help', label: 'Help' },
  { value: 'findJob', label: 'Find Job' },
];

export const languageLevels = [
  { value: 'none', label: 'None' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export const relations = [
  { value: 'daughter', label: 'Daughter' },
  { value: 'son', label: 'Son' },
  { value: 'mother', label: 'Mother' },
  { value: 'father', label: 'Father' },
  { value: 'brother', label: 'Brother' },
  { value: 'sister', label: 'Sister' },
];

export const jobStatuses = [
  { value: 'fulltime', label: 'Full Time' },
  { value: 'parttime', label: 'Part Time' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'student', label: 'Student' },
];

export const lookingForJobOptions = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' },
];

export const educationLevels = [
  { value: 'earlyChildhood', label: 'Early childhood' },
  { value: 'elementary', label: 'Elementary' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'secondary', label: 'High School/Secondary' },
  { value: 'trade', label: 'Trade/Vocational School' },
  { value: 'bachelors', label: 'Bachelors' },
  { value: 'masters', label: 'Mastors' },
  { value: 'doctorate', label: 'Ph.D/Doctorate' },
];

export const proficiencyExaminations = [
  { value: 'ielts', label: 'IELTS' },
  { value: 'french', label: 'French' },
];

export const organizationTypes = [
  { value: 'FDRL', label: 'Federal' },
  { value: 'NGOV', label: 'Non-governmental' },
  { value: 'PROV', label: 'Provincial' },
];

export const familyObject = {
  age: '', gender: '', relation: '', relationshipStatus: '',
};

export const workObject = {
  title: '', company: '', years: '',
};

export const langObject = {
  name: '', writingLevel: '', speakingLevel: '',
};
