import { lazy } from "react";
import LALA from "../../views/auth/LALA.jsx";
const Success = lazy(() => import("../../views/Success"));
// const Login = lazy(() => import("../../views/auth/Login"));
// const Register = lazy(() =>
//   import("../../views/auth/multistep-form/MultistepForm/MultiStepForm")
// );
const AdminLogin = lazy(() => import("../../views/auth/AdminLogin.jsx"));
// const Home = lazy(() => import("../../views/Home"));
const UnAuthorized = lazy(() => import("../../views/UnAuthorized"));

export const publicRoutes = [
  { path: "/", element: <LALA /> },
  {
    path: "/login",
    element: <AdminLogin />,
  },
  {
    path: "/unauthorized",
    element: <UnAuthorized />,
  },
  {
    path: "/success?",
    element: <Success />,
  },
];
