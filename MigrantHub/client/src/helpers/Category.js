import React from 'react';

export function getCategoryIcon(category) {
  switch(category) {
    case 'WorkAccidents':
      return <i class="fas fa-user-injured fa-2x"/>;
    case 'AutomobileAccidents':
      return <i class="fas fa-car-crash fa-2x"/>;
    case 'Welfare':
      return <i class="fas fa-spa fa-2x"/>;
    case 'CommunityOrganizations':
      return <i class="fas fa-people-carry fa-2x"/>;
    case 'BudgetAndDebtProblems':
      return <i class="fas fa-creative-commons-nc fa-2x"/>;
    case 'ConsumerProtection':
      return <i class="fas fa-shield-alt fa-2x"/>;
    case 'CommunityGroups':
      return <i class="fas fa-church fa-2x"/>;
    case 'EmergencyAid':
      return <i class="fas fa-first-aid fa-2x"/>;
    case 'SecondHandClothing':
      return <i class="fas fa-tshirt fa-2x"/>;
    case 'SecondHandFurnitureAndClothing':
      return <i class="fas fa-tshirt fa-2x"/>;
    case 'Employment':
      return <i class="fas fa-user-tie fa-2x"/>;
    case 'EmploymentInsurance':
      return <i class="fas fa-user-tie fa-2x"/>;
    case 'CommunityOrganizations':
      return <i class="fas fa-church fa-2x"/>;
    case 'FamilyBenefits':
      return <i class="fas fa-users fa-2x"/>;
    case 'Women':
      return <i class="fas fa-female fa-2x"/>;
    case 'Immigration':
      return <i class="fas fa-user-check fa-2x"/>;
    case 'Passport':
      return <i class="fas fa-passport fa-2x"/>;
    case 'IncomeTaxes':
      return <i class="fas fa-hand-holding-usd fa-2x"/>;
    case 'ResourcesForLGBTQPeople':
      return <i class="fas fa-dove fa-2x"/>;
    case 'Housing':
      return <i class="fas fa-home fa-2x"/>;
    case 'ApartmentSearch':
      return <i class="fas fa-building fa-2x"/>;
    case 'InfoForLandlords':
      return <i class="fas fa-building fa-2x"/>;
    case 'SocialHousing':
      return <i class="fas fa-building fa-2x"/>;
    case 'CDNCommunityOrganizations':
      return <i class="fas fa-canadian-maple-leaf fa-2x"/>;
    case 'Pensions':
      return <i class="fas fa-leaf fa-2x"/>;
    case 'Seniors':
      return <i class="fas fa-leaf fa-2x"/>;
    case 'DisabledPeople':
      return <i class="fas fa-accessible-icon fa-2x"/>;
    case 'MentalHealth':
      return <i class="fas fa-heartbeat fa-2x"/>;
    case 'HealthAndSocialServices':
      return <i class="fas fa-heartbeat fa-2x"/>;
    case 'InformationAndReferralServices':
      return <i class="fas fa-info fa-2x"/>;
    case 'LegalAid':
      return <i class="fas fa-gavel fa-2x"/>;
    case 'MunicipalServices':
      return <i class="fas fa-university fa-2x"/>;
    case 'VictimsOfCrime':
      return <i class="fas fa-redhat fa-2x"/>;
    default:
      return null;
  }
}

export function getCategory(category) {
  const serviceCategories = {
    'WorkAccidents': 'Work Accidents',
    'AutomobileAccidents': 'Accidents',
    'Welfare': 'Welfare',
    'CommunityOrganizations': 'Community Organizations',
    'BudgetAndDebtProblems': 'Budget And Debt Problems',
    'ConsumerProtection': 'Consumer Protection',
    'CommunityGroups': 'Community Groups',
    'EmergencyAid': 'Emergency Aid',
    'SecondHandClothing': 'Second-Hand Clothing',
    'SecondHandFurnitureAndClothing': 'Second-Hand Furniture And Clothing',
    'Employment': 'Employment',
    'EmploymentInsurance': 'Employment Insurance',
    'CommunityOrganizations': 'Community Organizations',
    'FamilyBenefits': 'Family Benefits',
    'Women': 'Women',
    'Immigration': 'Immigration',
    'Passport': 'Passport',
    'IncomeTaxes': 'Income Taxes',
    'ResourcesForLGBTQPeople': 'Resources For Lgbtq+ People',
    'Housing': 'Housing',
    'ApartmentSearch': 'Apartment Search',
    'InfoForLandlords': 'Info For Landlords',
    'SocialHousing': 'Social Housing',
    'CDNCommunityOrganizations': 'C-D-N Community Organizations',
    'Pensions': 'Pensions',
    'Seniors': 'Seniors',
    'DisabledPeople': 'Disabled People',
    'MentalHealth': 'Mental Health',
    'HealthAndSocialServices': 'Health And Social Services',
    'InformationAndReferralServices': 'Information & Referral Services',
    'LegalAid': 'Legal Aid',
    'MunicipalServices': 'Municipal Services',
    'VictimsOfCrime': 'Victims Of Crime',
  };
  return serviceCategories[category];
}

export function getSubCategory(subcategory) {
  const serviceSubCategories = {
    'CommunityOrganizations': 'Community Organizations',
    'Food': 'Food',
    'CommunityOrganizations': 'Community Organizations',
    'SmallBusiness': 'Small Business',
    'JobSearch': 'Job Search',
    'CommunityOrganizations': 'Community Organizations',
    'SeniorsVolunteerSupportServices': 'Seniors’ Volunteer Support Services',
    'SeniorsMealDelivery': 'Seniors’ Meal Delivery',
    'SeniorsMiscellaneous': 'Seniors’ Miscellaneous',
    'CommunityOrganizations': 'Community Organizations',
    'ListeningServices': 'Listening Services',
    'CrisisCentres': 'Crisis Centres',
    'CommunityOrganizations': 'Community Organizations',
    'Hospitals': 'Hospitals',
    'CommunityLegalClinics': 'Community Legal Clinics',
    'Courts': 'Courts',
  };
  return serviceSubCategories[subcategory];
}