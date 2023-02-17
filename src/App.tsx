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
  Platform,
  SplitCol,
  SplitLayout,
  Tabbar,
  TabbarItem,
  usePlatform,
  View,
} from "@vkontakte/vkui";
import { Icon28NewsfeedOutline, Icon28ServicesOutline } from "@vkontakte/icons";
import ModalsRoot from "./modals/ModalsRoot";
import MobileNavigation from "./navigation/mobile";

const App = ({ router }: { viewWidth: number; router: any }) => {
  // вместо HOC witRouter для функциональных компонентов можно использовать хуки
  // const { activeView, activePanel } = useRouterSelector();
  // const { toView, toPanel, toBack } = useRouterActions();
  const platform = usePlatform();

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
                tabbar={platform == Platform.VKCOM && <MobileNavigation />}
              >
                <View id={ViewTypes.MAIN} activePanel={router.activePanel}>
                  <Panel id={PanelTypes.MAIN_HOME}>
                    <PanelHeader>Главная</PanelHeader>
                    <Button onClick={() => router.toModal("test_modal")}>
                      Tset
                    </Button>
                  </Panel>
                  <Panel id={PanelTypes.MAIN_ABOUT}>
                    <PanelHeader
                      before={<PanelHeaderBack onClick={router.toBack} />}
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
