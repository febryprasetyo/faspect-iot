/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
const DashboardSpeedometer = lazy(()=> import("../pages/DashboardSpeedometer"));
const Stasiun = lazy(() => import("../pages/Stasiun"));
const User = lazy(() => import("../pages/User"));
const Mesin = lazy(() => import("../pages/Mesin"));

const coreRoutes = [
  {
    path: "/stasiun",
    title: "Stasiun",
    component: Stasiun,
  },
  {
    path: "/user",
    title: "User",
    component: User,
  },
  {
    path: "/mesin",
    title: "Mesin",
    component: Mesin,
  },
  {
    path: "/monitoring/:id",
    title: "Monitoring",
    component: DashboardSpeedometer
  }
];

const routes = [...coreRoutes];
export default routes;
