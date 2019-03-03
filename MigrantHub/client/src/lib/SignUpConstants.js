import React from 'react';
import { FormattedMessage } from 'react-intl';

export const provinces = [
  { value: 'AB', label: <FormattedMessage id="provinces.ab" /> },
  { value: 'BC', label: <FormattedMessage id="provinces.bc" /> },
  { value: 'MB', label: <FormattedMessage id="provinces.mb" /> },
  { value: 'NB', label: <FormattedMessage id="provinces.nb" /> },
  { value: 'NL', label: <FormattedMessage id="provinces.nl" /> },
  { value: 'NS', label: <FormattedMessage id="provinces.ns" /> },
  { value: 'NT', label: <FormattedMessage id="provinces.nt" /> },
  { value: 'NU', label: <FormattedMessage id="provinces.nu" /> },
  { value: 'ON', label: <FormattedMessage id="provinces.on" /> },
  { value: 'PE', label: <FormattedMessage id="provinces.pe" /> },
  { value: 'QC', label: <FormattedMessage id="provinces.qc" /> },
  { value: 'SK', label: <FormattedMessage id="provinces.sk" /> },
  { value: 'YT', label: <FormattedMessage id="provinces.yt" /> },
];

export const statuses = [
  { value: 'immigrant', label: <FormattedMessage id="status.immigrant" /> },
  { value: 'refugee', label: <FormattedMessage id="status.refugee" /> },
  { value: 'resident', label: <FormattedMessage id="status.pr" /> },
  { value: 'citizen', label: <FormattedMessage id="status.citizen" /> },
];

export const genders = [
  { value: 'male', label: <FormattedMessage id="male" /> },
  { value: 'female', label: <FormattedMessage id="female" /> },
  { value: 'other', label: <FormattedMessage id="other" /> },
];

export const relationshipStatuses = [
  { value: 'married', label: <FormattedMessage id="relationship.married" /> },
  { value: 'single', label: <FormattedMessage id="relationship.single" /> },
  { value: 'divorced', label: <FormattedMessage id="relationship.divorced" /> },
  { value: 'widowed', label: <FormattedMessage id="relationship.widowed" /> },
  { value: 'separated', label: <FormattedMessage id="relationship.separated" /> },
];

export const joiningReasons = [
  { value: 'help', label: <FormattedMessage id="join.help" /> },
  { value: 'findJob', label: <FormattedMessage id="join.findjob" /> },
];

export const languageLevels = [
  { value: 'none', label: <FormattedMessage id="levels.none" /> },
  { value: 'beginner', label: <FormattedMessage id="levels.beg" /> },
  { value: 'intermediate', label: <FormattedMessage id="levels.int" /> },
  { value: 'advanced', label: <FormattedMessage id="levels.adv" /> },
];

export const relations = [
  { value: 'daughter', label: <FormattedMessage id="relations.daughter" /> },
  { value: 'son', label: <FormattedMessage id="relations.son" /> },
  { value: 'mother', label: <FormattedMessage id="relations.mom" /> },
  { value: 'father', label: <FormattedMessage id="relations.dad" /> },
  { value: 'brother', label: <FormattedMessage id="relations.bro" /> },
  { value: 'sister', label: <FormattedMessage id="relations.sis" /> },
];

export const jobStatuses = [
  { value: 'fulltime', label: <FormattedMessage id="job.full" /> },
  { value: 'parttime', label: <FormattedMessage id="job.part" /> },
  { value: 'unemployed', label: <FormattedMessage id="job.unemployed" /> },
  { value: 'student', label: <FormattedMessage id="job.student" /> },
];

export const lookingForJobOptions = [
  { value: 'true', label: <FormattedMessage id="yes" /> },
  { value: 'false', label: <FormattedMessage id="no" /> },
];

export const educationLevels = [
  { value: 'earlyChildhood', label: <FormattedMessage id="education.ec" /> },
  { value: 'elementary', label: <FormattedMessage id="education.elem" /> },
  { value: 'intermediate', label: <FormattedMessage id="education.int" /> },
  { value: 'secondary', label: <FormattedMessage id="education.sec" /> },
  { value: 'trade', label: <FormattedMessage id="education.trade" /> },
  { value: 'cegep', label: <FormattedMessage id="education.cegep" /> },
  { value: 'bachelors', label: <FormattedMessage id="education.bach" /> },
  { value: 'masters', label: <FormattedMessage id="education.mast" /> },
  { value: 'doctorate', label: <FormattedMessage id="education.doc" /> },
];

export const proficiencyExaminations = [
  { value: 'ielts', label: 'IELTS' },
  { value: 'french', label: <FormattedMessage id="french" /> },
];

export const organizationTypes = [
  { value: 'FDRL', label: <FormattedMessage id="org.fdrl" /> },
  { value: 'NGOV', label: <FormattedMessage id="org.ngov" /> },
  { value: 'PROV', label: <FormattedMessage id="org.prov" /> },
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
