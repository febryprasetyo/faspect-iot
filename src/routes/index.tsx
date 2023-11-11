/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
const DashboardSpeedometer = lazy(()=> import("../pages/DashboardSpeedometer"));
const Stasiun = lazy(() => import("../pages/Stasiun"));
const User = lazy(() => import("../pages/User"));
const Mesin = lazy(() => import("../pages/Mesin"));
const NotFoundPage = lazy(()=> import("../pages/404"))

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
  },
  {
    path: "*",
    title: "404",
    component: NotFoundPage
  }
];

const routes = [...coreRoutes];
export default routes;
