import { withRouter } from "react-router-vkminiapps";
import { ViewTypes, PanelTypes } from "./structure";
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  Epic,
  Group,
  Panel,
  PanelHeader,
  SplitCol,
  SplitLayout,
  View,
} from "@vkontakte/vkui";
import ModalsRoot from "./components/modals/ModalsRoot";
import MobileNavigation from "./components/navigation/mobile";
import bridge from "@vkontakte/vk-bridge";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set } from "./store";
import EventsPanelHome from "./panels/events/home";
import EventsPanelAbout from "./panels/events/about";
import ProfilePanelHome from "./panels/profile/home";
import ProfilePanelNewEvent from "./panels/profile/new_event";
import WalletPanelHome from "./panels/wallet/home";

import BackPlayground from "./components/solana/BackPlayground";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useWallet } from "@solana/wallet-adapter-react";

// вместо HOC witRouter для функциональных компонентов можно использовать хуки
// https://dev.vk.com/bridge/VKWebAppStorageSet сделать авторизацию по токену
// const { activeView, activePanel } = useRouterSelector();
// const { toView, toPanel, toBack } = useRouterActions();
const App = ({ router }: { viewWidth: number; router: any }) => {
  const mainStorage = useSelector((state: any) => state.main);
  const dispatch = useDispatch();
  // const publicKey = true;
  const { publicKey } = useWallet();

  const OnScanQRClick = () => {
    console.log("hello");
    // Sending method
    bridge
      .send("VKWebAppOpenCodeReader")
      .then((data) => {
        if (data.code_data) {
          // Результат сканирования получен
          console.log(data.code_data);
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  };

  const OnOpenEventById = (id: number) => {
    dispatch(set({ aboutPanelEventId: id }));
    router.toPanel(PanelTypes.EVENTS_ABOUT);
  };

  useEffect(() => {
    bridge.subscribe((event) => {
      if (!event.detail) {
        return;
      }

      const { type, data } = event.detail;

      if (type === "VKWebAppOpenCodeReaderResult") {
        // Reading result of the Code Reader
        console.log(data.code_data);
        // wr
      }

      if (type === "VKWebAppOpenCodeReaderFailed") {
        // Catching the error
        console.log(data.error_type, data.error_data);
        if (data.error_data.error_code == 6) {
        }
      }
    });
  }, []);

  useEffect(() => {
    if (mainStorage.user) return;

    bridge.send("VKWebAppGetUserInfo").then((user) => {
      dispatch(set({ user }));
    });
  }, []);

  useEffect(() => {
    console.log(mainStorage);
  }, [mainStorage]);

  useEffect(() => {
    if (!publicKey) {
      setTimeout(() => {
        router.toView(ViewTypes.WALLET);
      }, 100);
    } else {
      router.toView(ViewTypes.EVENTS);
    }
  }, [publicKey]);

  return (
    <ConfigProvider>
      <AppRoot>
        <AdaptivityProvider>
          <SplitLayout
            style={{ justifyContent: "center" }}
            modal={<ModalsRoot />}
          >
            <SplitCol>
              <Epic
                activeStory={router.activeView}
                tabbar={publicKey && <MobileNavigation />}
              >
                <View id={ViewTypes.EVENTS} activePanel={router.activePanel}>
                  <Panel id={PanelTypes.EVENTS_HOME}>
                    <EventsPanelHome
                      onScanQRClick={OnScanQRClick}
                      onOpenEventById={OnOpenEventById}
                    />
                  </Panel>
                  <Panel id={PanelTypes.EVENTS_ABOUT}>
                    <EventsPanelAbout />
                  </Panel>
                </View>
                <View id={ViewTypes.SETTINGS} activePanel={router.activePanel}>
                  <Panel id={PanelTypes.SETTINGS}>
                    <PanelHeader>Настройки</PanelHeader>
                    <Group>
                      <BackPlayground />
                    </Group>
                  </Panel>
                </View>
                <View id={ViewTypes.PROFILE} activePanel={router.activePanel}>
                  <Panel id={PanelTypes.PROFILE_HOME}>
                    <ProfilePanelHome />
                  </Panel>
                  <Panel id={PanelTypes.PROFILE_NEW_EVENT}>
                    <ProfilePanelNewEvent />
                  </Panel>
                </View>
                <View id={ViewTypes.WALLET} activePanel={router.activePanel}>
                  <Panel
                    style={{
                      height: "100vh",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    id={PanelTypes.WALLET_HOME}
                  >
                    <WalletPanelHome />
                  </Panel>
                </View>
              </Epic>
            </SplitCol>
          </SplitLayout>
        </AdaptivityProvider>
      </AppRoot>
    </ConfigProvider>
  );
};

export default withRouter(App);
