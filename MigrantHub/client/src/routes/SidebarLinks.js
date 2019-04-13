import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BugIcon from '@material-ui/icons/BugReport';
import FixIcon from '@material-ui/icons/Build';
import DateRange from '@material-ui/icons/DateRange';
import People from '@material-ui/icons/People';
import Forum from '@material-ui/icons/Forum';
import UserTypes from 'lib/UserTypes';
import { buildForumUrl } from 'helpers/Forms';
import { FormattedMessage } from 'react-intl';

const SidebarLinks = [
  {
    path: '/services/suggestions',
    name: <FormattedMessage id="nav.servicesuggestions" />,
    icon: DashboardIcon,
    type: [UserTypes.ADMIN, UserTypes.BUSINESS],
  },
  {
    path: '/categories',
    name: <FormattedMessage id="services" />,
    icon: DashboardIcon,
    type: [UserTypes.ADMIN, UserTypes.BUSINESS, UserTypes.MIGRANT],
  },
  {
    path: '/events',
    name: <FormattedMessage id="events" />,
    icon: DateRange,
    type: [UserTypes.ADMIN, UserTypes.BUSINESS, UserTypes.MIGRANT],
  },
  {
    path: '/jobs',
    name: <FormattedMessage id="job" />,
    icon: DashboardIcon,
    type: [UserTypes.ADMIN, UserTypes.BUSINESS, UserTypes.MIGRANT],
  },
  {
    path: '/friends',
    name: <FormattedMessage id="friends" />,
    icon: People,
    type: [UserTypes.MIGRANT],
  },
  {
    path: buildForumUrl(),
    name: 'Forum',
    icon: Forum,
    type: [UserTypes.ADMIN, UserTypes.BUSINESS, UserTypes.MIGRANT],
    subdomain: true,
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
  {
    path: '/bugs',
    name: <FormattedMessage id="view.bug" />,
    icon: FixIcon,
    type: [UserTypes.ADMIN],
  },
];

export default SidebarLinks;
