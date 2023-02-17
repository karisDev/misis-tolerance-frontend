import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider } from "react-router-vkminiapps";
import structure from "./structure";
import "@vkontakte/vkui/dist/vkui.css";
import { Provider } from "react-redux";
import bridge from "@vkontakte/vk-bridge";
import store from "./store";

bridge.send("VKWebAppInit");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider structure={structure}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
