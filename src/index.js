import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

import { store } from './store'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterBusiness from "./pages/RegisterBusiness";
import RegisterCustomer from "./pages/RegisterCustomer";
import LoginCustomer from "./pages/loginCustomer";
import GetReward from "./pages/getReward";
import BusinessHome from "./pages/BusinessHome";
import CustomerHome from "./pages/CustomerHome";
import { TransactionHistory } from "./pages";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/joinBusiness" element={<RegisterBusiness />} />
        <Route path="/joinCustomer" element={<RegisterCustomer />} />
        <Route path="/loginCustomer" element={<LoginCustomer />} />
        <Route path="/getReward" element={<GetReward />} />
        <Route path="/transactionHistory" element={<TransactionHistory />} />
        <Route path="/businessHome" element={<BusinessHome />} />
        <Route path="/customerHome" element={<CustomerHome />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
