import { withRouter } from "react-router-vkminiapps";
import { ViewTypes, PanelTypes } from "./structure";
import {
  AdaptivityProvider,
  AppRoot,
  Button,
  ConfigProvider,
  Epic,
  Group,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderButton,
  Platform,
  SplitCol,
  SplitLayout,
  Tabbar,
  TabbarItem,
  View,
} from "@vkontakte/vkui";
import {
  Icon28NewsfeedOutline,
  Icon28QrCodeOutline,
  Icon28ServicesOutline,
} from "@vkontakte/icons";
import ModalsRoot from "./components/modals/ModalsRoot";
import MobileNavigation from "./components/navigation/mobile";
import bridge from "@vkontakte/vk-bridge";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set } from "./store";
import EventsPanelHome from "./panels/events/home";
import EventsPanelAbout from "./panels/events/about";
import BackPlayground from "./components/solana/BackPlayground";
import "@solana/wallet-adapter-react-ui/styles.css";

// вместо HOC witRouter для функциональных компонентов можно использовать хуки
// https://dev.vk.com/bridge/VKWebAppStorageSet сделать авторизацию по токену 
// const { activeView, activePanel } = useRouterSelector();
// const { toView, toPanel, toBack } = useRouterActions();
const App = ({ router }: { viewWidth: number; router: any }) => {
  const mainStorage = useSelector((state: any) => state.main);
  const dispatch = useDispatch();

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
                tabbar={<MobileNavigation />}
              >
                <View id={ViewTypes.EVENTS} activePanel={router.activePanel}>
                  <Panel id={PanelTypes.EVENTS_HOME}>
                    <EventsPanelHome OnScanQRClick={OnScanQRClick} />
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
              </Epic>
            </SplitCol>
          </SplitLayout>
        </AdaptivityProvider>
      </AppRoot>
    </ConfigProvider>
  );
};

export default withRouter(App);
