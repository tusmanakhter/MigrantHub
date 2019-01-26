import React from 'react';
import serviceRoutes from "./Routes";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import People from "@material-ui/icons/People";
import ServicePage from "../services/ServiceList";
import { FormattedMessage } from 'react-intl';
import { serviceCategories } from 'lib/ServiceCategories';
import ServiceCategoryMenu from 'services/ServiceCategoryMenu2'

var dashRoutes = [
  {
    path: "/services",
    name: <FormattedMessage id="services"/>,
    mini: "SP",
    icon: DashboardIcon,
    component: ServicePage,
    routeType: "Route",
    option: ServiceCategoryMenu
  },
  {
    path: "/events",
    name: <FormattedMessage id="events"/>,
    mini: "EP",
    icon: DateRange,
    component: ServicePage
  },
  {
    path: "/friends",
    name: <FormattedMessage id="friends"/>,
    mini: "FP",
    icon: People,
    component: ServicePage
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];

export default dashRoutes;
