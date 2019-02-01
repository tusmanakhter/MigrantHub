import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
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
    path: '/admin/dashboard/admins',
    name: <FormattedMessage id="nav.admins" />,
    icon: DashboardIcon,
    type: [UserTypes.ADMIN],
  },
  {
    path: '/admin/dashboard/admins/deleted',
    name: <FormattedMessage id="nav.deleted" />,
    icon: DashboardIcon,
    type: [UserTypes.ADMIN],
  },
  {
    path: '/admin/dashboard/admins/rejected',
    name: <FormattedMessage id="nav.rejected" />,
    icon: DashboardIcon,
    type: [UserTypes.ADMIN],
  },
  {
    path: '/admin/dashboard/admins/unapproved',
    name: <FormattedMessage id="nav.unapproved" />,
    icon: DashboardIcon,
    type: [UserTypes.ADMIN],
  },
];

export default SidebarLinks;
