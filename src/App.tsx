import { withRouter } from "react-router-vkminiapps";
import { ViewTypes, PanelTypes } from "./structure";
import {
  AdaptivityProvider,
  AppRoot,
  Button,
  ConfigProvider,
  Epic,
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

// вместо HOC witRouter для функциональных компонентов можно использовать хуки
// const { activeView, activePanel } = useRouterSelector();
// const { toView, toPanel, toBack } = useRouterActions();
const App = ({ router }: { viewWidth: number; router: any }) => {
  const mainStorage = useSelector((state: any) => state.main);
  const dispatch = useDispatch();

  const OnScanQRClick = () => {
    // Sending method
    bridge.send("VKWebAppOpenCodeReader", {});
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
                <View id={ViewTypes.MAIN} activePanel={router.activePanel}>
                  <Panel id={PanelTypes.MAIN_HOME}>
                    <PanelHeader
                      before={
                        <PanelHeaderButton onClick={OnScanQRClick}>
                          <Icon28QrCodeOutline />
                        </PanelHeaderButton>
                      }
                    >
                      Главнаяf
                      <Button
                        onClick={() => router.toPanel(PanelTypes.MAIN_ABOUT)}
                      >
                        Knopka
                      </Button>
                    </PanelHeader>
                  </Panel>
                  <Panel id={PanelTypes.MAIN_ABOUT}>
                    <PanelHeader
                      before={
                        <PanelHeaderBack onClick={router.toBack}>
                          Tets
                        </PanelHeaderBack>
                      }
                    >
                      О нас
                    </PanelHeader>
                    ...ы
                  </Panel>
                </View>
                <View id={ViewTypes.SETTINGS} activePanel={router.activePanel}>
                  <Panel id={PanelTypes.SETTINGS}>
                    <PanelHeader>Настройки</PanelHeader>
                    тест
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
