import { withRouter } from "react-router-vkminiapps";
import { ViewTypes, PanelTypes } from "./structure";
import {
  AdaptivityProvider,
  AppRoot,
  Button,
  CellButton,
  ConfigProvider,
  Epic,
  Group,
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderClose,
  Placeholder,
  SplitCol,
  SplitLayout,
  Tabbar,
  TabbarItem,
  View,
} from "@vkontakte/vkui";
import {
  Icon28NewsfeedOutline,
  Icon28ServicesOutline,
  Icon56MoneyTransferOutline,
} from "@vkontakte/icons";
import ModalsRoot from "./modals/ModalsRoot";

const App = ({ router }: { router: any }) => {
  // вместо HOC witRouter для функциональных компонентов можно использовать хуки
  // const { activeView, activePanel } = useRouterSelector();
  // const { toView, toPanel, toBack } = useRouterActions();

  const modal = <ModalsRoot />;

  return (
    <ConfigProvider>
      <AppRoot>
        <AdaptivityProvider>
          <SplitLayout modal={modal}>
            <SplitCol>
              <Epic
                activeStory={router.activeView}
                tabbar={
                  <Tabbar>
                    <TabbarItem
                      onClick={() => router.toView(ViewTypes.MAIN)}
                      selected={router.activeView === ViewTypes.MAIN}
                      text="Главная"
                    >
                      <Icon28NewsfeedOutline />
                    </TabbarItem>
                    <TabbarItem
                      onClick={() => router.toView(ViewTypes.SETTINGS)}
                      selected={router.activeView === ViewTypes.SETTINGS}
                      text="Настройки"
                    >
                      <Icon28ServicesOutline />
                    </TabbarItem>
                  </Tabbar>
                }
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
