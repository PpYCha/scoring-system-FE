import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Account from "./pages/account/Account";

import Login from "./pages/Login";

import Dashboard from "./pages/dashboard/Dashboard";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Event from "./pages/event/Event";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Judge from "./pages/judge/JudgeLayout";
import Contestant from "./pages/contestant/Contestant";
import JudgeLayout from "./pages/judge/JudgeLayout";

const Router = () => {
  const RequireAuth = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser ? children : <Navigate to="/" />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            // <RequireAuth>
            <DashboardLayout />
            // </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="events" element={<Event />} />
          <Route path="accounts" element={<Account />} />
          <Route path="contestants" element={<Contestant />} />
          ``
          {/*
          <Route path="categories" element={<Category />} />
          <Route path="criterias" element={<Criteria />} />
          <Route path="scores" element={<Score />} /> */}
        </Route>

        <Route path="judges" element={<JudgeLayout />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
