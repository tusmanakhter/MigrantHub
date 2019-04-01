import React from 'react';

export function getCategoryIcon(category) {
  switch (category) {
    case 'WorkAccidents':
      return <i className="fas fa-user-injured fa-2x" />;
    case 'AutomobileAccidents':
      return <i className="fas fa-car-crash fa-2x" />;
    case 'Welfare':
      return <i className="fas fa-spa fa-2x" />;
    case 'CommunityOrganizations':
      return <i className="fas fa-people-carry fa-2x" />;
    case 'BudgetAndDebtProblems':
      return <i className="fab fa-creative-commons-nc fa-2x" />;
    case 'ConsumerProtection':
      return <i className="fas fa-shield-alt fa-2x" />;
    case 'CommunityGroups':
      return <i className="fas fa-church fa-2x" />;
    case 'EmergencyAid':
      return <i className="fas fa-first-aid fa-2x" />;
    case 'SecondHandClothing':
      return <i className="fas fa-tshirt fa-2x" />;
    case 'SecondHandFurnitureAndClothing':
      return <i className="fas fa-tshirt fa-2x" />;
    case 'Employment':
      return <i className="fas fa-user-tie fa-2x" />;
    case 'EmploymentInsurance':
      return <i className="fas fa-user-tie fa-2x" />;
    case 'CommunityOrganizations':
      return <i className="fas fa-church fa-2x" />;
    case 'FamilyBenefits':
      return <i className="fas fa-users fa-2x" />;
    case 'Women':
      return <i className="fas fa-female fa-2x" />;
    case 'Immigration':
      return <i className="fas fa-user-check fa-2x" />;
    case 'Passport':
      return <i className="fas fa-passport fa-2x" />;
    case 'IncomeTaxes':
      return <i className="fas fa-hand-holding-usd fa-2x" />;
    case 'ResourcesForLGBTQPeople':
      return <i className="fas fa-dove fa-2x" />;
    case 'Housing':
      return <i className="fas fa-home fa-2x" />;
    case 'ApartmentSearch':
      return <i className="fas fa-building fa-2x" />;
    case 'InfoForLandlords':
      return <i className="fas fa-building fa-2x" />;
    case 'SocialHousing':
      return <i className="fas fa-building fa-2x" />;
    case 'CDNCommunityOrganizations':
      return <i className="fas fa-archway fa-2x" />;
    case 'Pensions':
      return <i className="fas fa-leaf fa-2x" />;
    case 'Seniors':
      return <i className="fas fa-leaf fa-2x" />;
    case 'DisabledPeople':
      return <i className="fab fa-accessible-icon fa-2x" />;
    case 'MentalHealth':
      return <i className="fas fa-heartbeat fa-2x" />;
    case 'HealthAndSocialServices':
      return <i className="fas fa-heartbeat fa-2x" />;
    case 'InformationAndReferralServices':
      return <i className="fas fa-info fa-2x" />;
    case 'LegalAid':
      return <i className="fas fa-gavel fa-2x" />;
    case 'MunicipalServices':
      return <i className="fas fa-university fa-2x" />;
    case 'VictimsOfCrime':
      return <i className="fab fa-redhat fa-2x" />;
    default:
      return null;
  }
}

export function getCategory(category) {
  const serviceCategories = {
    WorkAccidents: 'Work Accidents',
    AutomobileAccidents: 'Accidents',
    Welfare: 'Welfare',
    CommunityOrganizations: 'Community Organizations',
    BudgetAndDebtProblems: 'Budget And Debt Problems',
    ConsumerProtection: 'Consumer Protection',
    CommunityGroups: 'Community Groups',
    EmergencyAid: 'Emergency Aid',
    SecondHandClothing: 'Second-Hand Clothing',
    SecondHandFurnitureAndClothing: 'Second-Hand Furniture And Clothing',
    Employment: 'Employment',
    EmploymentInsurance: 'Employment Insurance',
    CommunityOrganizations: 'Community Organizations',
    FamilyBenefits: 'Family Benefits',
    Women: 'Women',
    Immigration: 'Immigration',
    Passport: 'Passport',
    IncomeTaxes: 'Income Taxes',
    ResourcesForLGBTQPeople: 'Resources For Lgbtq+ People',
    Housing: 'Housing',
    ApartmentSearch: 'Apartment Search',
    InfoForLandlords: 'Info For Landlords',
    SocialHousing: 'Social Housing',
    CDNCommunityOrganizations: 'C-D-N Community Organizations',
    Pensions: 'Pensions',
    Seniors: 'Seniors',
    DisabledPeople: 'Disabled People',
    MentalHealth: 'Mental Health',
    HealthAndSocialServices: 'Health And Social Services',
    InformationAndReferralServices: 'Information & Referral Services',
    LegalAid: 'Legal Aid',
    MunicipalServices: 'Municipal Services',
    VictimsOfCrime: 'Victims Of Crime',
  };
  return serviceCategories[category];
}

export function getSubCategory(subcategory) {
  const serviceSubCategories = {
    CommunityOrganizations: 'Community Organizations',
    Food: 'Food',
    CommunityOrganizations: 'Community Organizations',
    SmallBusiness: 'Small Business',
    JobSearch: 'Job Search',
    CommunityOrganizations: 'Community Organizations',
    SeniorsVolunteerSupportServices: 'Seniors’ Volunteer Support Services',
    SeniorsMealDelivery: 'Seniors’ Meal Delivery',
    SeniorsMiscellaneous: 'Seniors’ Miscellaneous',
    CommunityOrganizations: 'Community Organizations',
    ListeningServices: 'Listening Services',
    CrisisCentres: 'Crisis Centres',
    CommunityOrganizations: 'Community Organizations',
    Hospitals: 'Hospitals',
    CommunityLegalClinics: 'Community Legal Clinics',
    Courts: 'Courts',
  };
  return serviceSubCategories[subcategory];
}
