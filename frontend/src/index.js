import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import store from "./store/index.js";
import { Provider } from "react-redux";
import "./index.css";
// import reportWebVitals from "./reportWebVitals";

const App = lazy(() => import("./App"));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <BrowserRouter>
  <Provider store={store}>
    <Suspense fallback="loading...">
      <App />
      <Toaster
        toastOptions={{
          position: "top-right",
          style: {
            background: "#283046",
            color: "white",
          },
        }}
      />
    </Suspense>
  </Provider>
  // </BrowserRouter>
);
// reportWebVitals();
