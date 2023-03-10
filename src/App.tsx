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
  usePlatform,
  View,
} from "@vkontakte/vkui";
import ModalsRoot from "./components/modals/ModalsRoot";
import MobileNavigation from "./components/navigation/mobile";
import DesktopNavigation from "./components/navigation/desktop";
import bridge from "@vkontakte/vk-bridge";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set } from "./store";
import EventsPanelHome from "./panels/events/home";
import EventsPanelAbout from "./panels/events/about";
import ProfilePanelHome from "./panels/profile/home";
import ProfilePanelNewEvent from "./panels/profile/new_event";
import ProfilePanelNewTicket from "./panels/profile/new_ticket";
import ProfilePanelEventInfo from "./panels/profile/event_info";
import ProfilePanelEventWhitelist from "./panels/profile/event_whitelist";
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
  const platform = usePlatform();
  // const publicKey = true;
  const { publicKey } = useWallet();

  const OnScanQRClick = () => {
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
          // ты кароче в браузере открыл, а не в приложении
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
    if (!publicKey) {
      setTimeout(() => {
        router.toView(ViewTypes.WALLET);
      }, 100);
    } else {
      setTimeout(() => {
        router.toView(ViewTypes.EVENTS);
        router.toPanel(PanelTypes.EVENTS_HOME);
      }, 100);
    }
  }, [publicKey]);

  useEffect(() => {
    if (publicKey && mainStorage.user) {
      const data = fetch("https://vknft.seizure.icu/" + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: mainStorage.user.first_name,
          last_name: mainStorage.user.last_name,
          vk_id: mainStorage.user.id,
          wallet_public_key: publicKey.toString(),
        }),
      }).then((res) => {
        res
          .json()
          .then((data) => dispatch(set({ accountToken: data.access_token })));
      });
    }
  }, [publicKey, mainStorage.user]);

  return (
    <ConfigProvider>
      <AppRoot>
        <AdaptivityProvider>
          <SplitLayout
            style={{ justifyContent: "center" }}
            modal={<ModalsRoot />}
          >
            {platform == "vkcom" && publicKey && <DesktopNavigation />}
            <SplitCol>
              <Epic
                activeStory={router.activeView}
                tabbar={
                  publicKey && platform != "vkcom" && <MobileNavigation />
                }
              >
                <View id={ViewTypes.EVENTS} activePanel={router.activePanel}>
                  <Panel id={PanelTypes.EVENTS_HOME}>
                    <EventsPanelHome onScanQRClick={OnScanQRClick} />
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
                  <Panel id={PanelTypes.PROFILE_EVENT_INFO}>
                    <ProfilePanelEventInfo />
                  </Panel>
                  <Panel id={PanelTypes.PROFILE_NEW_TICKET}>
                    <ProfilePanelNewTicket />
                  </Panel>
                  <Panel id={PanelTypes.PROFILE_EVENT_WHITELIST}>
                    <ProfilePanelEventWhitelist />
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
