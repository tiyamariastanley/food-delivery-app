import React from "react";
import { Header } from "./components/Header";
import { Body } from "./components/Body";
import { Footer } from "./components/Footer";
import { Outlet } from "react-router-dom";
import "../index.css";
import { UserContext } from "./components/utils/UserContext";
import { Provider } from "react-redux";
import Store from "./components/utils/Store";

export const App = () => {
  return (
    <Provider store={Store}>
      <UserContext.Provider value={{ user: "Tiya" }}>
        <div>
          <Header></Header>
          <div className="min-h-screen my-10 mx-20">
            <Outlet />
          </div>
          <Footer></Footer>
        </div>
      </UserContext.Provider>
    </Provider>
  );
};
