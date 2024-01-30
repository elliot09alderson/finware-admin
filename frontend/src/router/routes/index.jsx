import { privateRoutes } from "./privateRoutes";
import MainLayout from "../../layout/MainLayout";
import ProtectRoute from "./ProtectRoute";

export const getRoutes = () => {
  const allRoute = [];
  // r=> {
  //     path: "admin/dashboard",
  //     element: <AdminDashboard />,
  //     role: "admin",
  //   },

  privateRoutes.map((r) => {
    r.element = <ProtectRoute route={r}>{r.element}</ProtectRoute>;
  });

  return {
    path: "/",
    element: <MainLayout />,
    children: privateRoutes,
  };
};
