import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import store from "./store";

// vendor styles
import "react-toastify/dist/ReactToastify.css";

import { setupInterceptors } from "./utils/axios";
import App from "./App";
import { routes } from "./routes";

setupInterceptors();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ToastContainer
      theme='colored'
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Router>
      <Routes>
        <Route path={routes.Home} element={<App />} />
      </Routes>
    </Router>
  </Provider>
);
