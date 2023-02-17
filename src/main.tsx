import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider } from "react-router-vkminiapps";
import structure from "./structure";
import "@vkontakte/vkui/dist/vkui.css";
import bridge from "@vkontakte/vk-bridge";

bridge.send("VKWebAppInit");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider structure={structure}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
