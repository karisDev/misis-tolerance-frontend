import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider } from "react-router-vkminiapps";
import structure from "./structure";
import "@vkontakte/vkui/dist/vkui.css";
import { Provider } from "react-redux";
import bridge from "@vkontakte/vk-bridge";
import store from "./store";
import WalletAdapterContext from "./components/solana/WalletAdapter";
import "./styles/index.scss";

bridge.send("VKWebAppInit");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WalletAdapterContext>
      <Provider store={store}>
        <RouterProvider structure={structure}>
          <App />
        </RouterProvider>
      </Provider>
    </WalletAdapterContext>
  </React.StrictMode>
);
