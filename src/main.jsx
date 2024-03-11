import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Appwrapper from "./Context/DataContext.jsx";
import ThemeProvider from "./Context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Appwrapper>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Appwrapper>
  </React.StrictMode>
);
