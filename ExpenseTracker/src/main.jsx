import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/main.js";
import FirebaseProvider from "./store/firebase-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </Provider>
);
