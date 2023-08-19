import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterBusiness from "./pages/RegisterBusiness";
import RegisterCustomer from "./pages/RegisterCustomer";
import LoginCustomer from "./pages/loginCustomer";
import GetReward from "./pages/getReward";
import BusinessHome from "./pages/BusinessHome";
import CustomerHome from "./pages/CustomerHome";
import {
  ProtectedCustomer,
  TransactionHistory,
  ProtectedBusiness,
  LogInBusiness,
  TermsandCondition,
  AboutUs,
} from "./pages";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/joinBusiness" element={<RegisterBusiness />} />
          <Route path="/loginBusiness" element={<LogInBusiness />} />
          <Route path="/joinCustomer" element={<RegisterCustomer />} />
          <Route path="/loginCustomer" element={<LoginCustomer />} />
          <Route path="/getReward" element={<GetReward />} />
          <Route path="/terms_conditions" element={<TermsandCondition />} />
          <Route path="/transactionHistory" element={<TransactionHistory />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route
            path="/businessHome"
            element={
              <ProtectedBusiness>
                <BusinessHome />
              </ProtectedBusiness>
            }
          />
          <Route
            path="/customerHome"
            element={
              <ProtectedCustomer>
                <CustomerHome />
              </ProtectedCustomer>
            }
          />
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
