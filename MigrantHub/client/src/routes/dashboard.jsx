import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import People from "@material-ui/icons/People";
import ServicePage from "../services/ServiceList";
import { serviceCategories } from 'lib/ServiceCategories';
import ServiceCategoryMenu from 'services/ServiceCategoryMenu2'

var dashRoutes = [
  {
    path: "/services",
    name: "Service Page",
    mini: "SP",
    icon: DashboardIcon,
    component: ServicePage,
    routeType: "Route",
    option: ServiceCategoryMenu
  },
  {
    path: "/events",
    name: "Event Page",
    mini: "EP",
    icon: DateRange,
    component: ServicePage
  },
  {
    path: "/friends",
    name: "Friends",
    mini: "FP",
    icon: People,
    component: ServicePage
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];

export default dashRoutes;
