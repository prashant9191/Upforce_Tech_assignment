import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import User from "./components/Pages/Register_User/User";
import PageNotFound from "./components/Pages/404/PageNotFound";
import View_User from "./components/Pages/View_Details/View_User";
import ViewTable from "./components/Pages/Edit_Details/ViewTable";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/addUser" element={<User />} />
        <Route path="/details" element={<ViewTable />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
