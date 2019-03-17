import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BugIcon from '@material-ui/icons/BugReport';
import DateRange from '@material-ui/icons/DateRange';
import People from '@material-ui/icons/People';
import UserTypes from 'lib/UserTypes';
import { FormattedMessage } from 'react-intl';
import { serviceCategories } from 'lib/ServiceCategories';
import ServiceCategoryMenu from 'services/ServiceCategoryMenu1'

const SidebarLinks = [
  {
    path: '/services',
    name: <FormattedMessage id="services" />,
    icon: DashboardIcon,
    type: [UserTypes.ADMIN, UserTypes.BUSINESS, UserTypes.MIGRANT],
    option: ServiceCategoryMenu
  },
  {
    path: '/services/suggestions',
    name: <FormattedMessage id="nav.servicesuggestions" />,
    icon: DashboardIcon,
    type: [UserTypes.ADMIN, UserTypes.BUSINESS],
  },
  {
    path: '/events',
    name: <FormattedMessage id="events" />,
    icon: DateRange,
    type: [UserTypes.ADMIN, UserTypes.BUSINESS, UserTypes.MIGRANT],
  },
  {
    path: '/friends',
    name: <FormattedMessage id="friends" />,
    icon: People,
    type: [UserTypes.MIGRANT],
  },
  {
    path: '/admin/dashboard',
    name: <FormattedMessage id="nav.admins" />,
    icon: DashboardIcon,
    type: [UserTypes.ADMIN],
  },
  {
    path: '/bugs/report',
    name: <FormattedMessage id="report.bug" />,
    icon: BugIcon,
    type: [UserTypes.ADMIN, UserTypes.BUSINESS, UserTypes.MIGRANT],
  },
];

export default SidebarLinks;
