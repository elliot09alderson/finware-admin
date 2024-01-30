import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Router from "./router/Router";
import LALA from "./views/auth/LALA.jsx";
import AdminLogin from "./views/auth/AdminLogin.jsx";
import UnAuthorized from "./views/UnAuthorized.jsx";
import { BrowserRouter } from "react-router-dom";
import { publicRoutes } from "./router/routes/publicRoutes.jsx";
// import { getRoutes } from "./router/routes";
// import { get_user_info } from "./store/Reducers/authReducer";
// import { useRoutes } from "react-router-dom";
// const Router = ({ allRoutes }) => {
//   const routes = useRoutes(allRoutes);
//   return routes;
// };
function App() {
  const dispatch = useDispatch();
  // no token initially
  // const { token } = useSelector((state) => state.auth);

  // routes
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

  // useEffect(() => {
  //   const routes = getRoutes();
  //   setAllRoutes([...allRoutes, routes]);
  // }, []);

  // useEffect(() => {
  //   if (token) {
  //     dispatch(get_user_info());
  //   }
  // }, [token]);
  // console.log(allRoutes);

  return (
    <BrowserRouter>
      <Router allRoutes={allRoutes} />;
    </BrowserRouter>
  );
}

export default App;
