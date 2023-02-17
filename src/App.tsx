// App.tsx
import {
  withRouter,
  useRouterSelector,
  useRouterActions,
} from "react-router-vkminiapps";
import { ViewTypes, PanelTypes } from "./structure";
import {
  AdaptivityProvider,
  Epic,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Tabbar,
  TabbarItem,
  View,
} from "@vkontakte/vkui";
import { Icon28NewsfeedOutline, Icon28ServicesOutline } from "@vkontakte/icons";

const App = ({ router }: { router: any }) => {
  // вместо HOC witRouter для функциональных компонентов можно использовать хуки
  // const { activeView, activePanel } = useRouterSelector();
  // const { toView, toPanel, toBack } = useRouterActions();

  return (
    <AdaptivityProvider>
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
            ...
          </Panel>
          <Panel id={PanelTypes.MAIN_ABOUT}>
            <PanelHeader before={<PanelHeaderBack onClick={router.toBack} />}>
              О нас
            </PanelHeader>
            ...
          </Panel>
        </View>
        <View id={ViewTypes.SETTINGS} activePanel={router.activePanel}>
          <Panel id={PanelTypes.SETTINGS}>
            <PanelHeader>Настройки</PanelHeader>
            ...
          </Panel>
        </View>
      </Epic>
    </AdaptivityProvider>
  );
};

export default withRouter(App);
