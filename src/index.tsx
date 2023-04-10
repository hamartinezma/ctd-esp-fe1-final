import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // Agregado
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>,
    document.getElementById("root")
  );
});

