import {
  Icon28Profile,
  Icon28SettingsOutline,
  Icon28Square4Outline,
} from "@vkontakte/icons";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import { withRouter } from "react-router-vkminiapps";
import { ViewTypes } from "../../structure";

const MobileNavigation = ({ router }: { router: any }) => {
  return (
    <Tabbar mode="vertical">
      <TabbarItem
        aria-label="Мероприятия"
        onClick={() => router.toView(ViewTypes.EVENTS)}
        selected={router.activeView === ViewTypes.EVENTS}
        text="Мероприятия"
      >
        <Icon28Square4Outline />
      </TabbarItem>
      <TabbarItem
        aria-label="Настройки"
        onClick={() => router.toView(ViewTypes.SETTINGS)}
        selected={router.activeView === ViewTypes.SETTINGS}
        text="Настройки"
      >
        <Icon28SettingsOutline />
      </TabbarItem>
      <TabbarItem
        aria-label="Профиль"
        onClick={() => router.toView(ViewTypes.SETTINGS)}
        selected={router.activeView === ViewTypes.SETTINGS}
        text="Профиль"
      >
        <Icon28Profile />
      </TabbarItem>
    </Tabbar>
  );
};

export default withRouter(MobileNavigation);
