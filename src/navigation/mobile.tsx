import { Icon28NewsfeedOutline, Icon28ServicesOutline } from "@vkontakte/icons";
import { Tabbar, TabbarItem } from "@vkontakte/vkui";
import { withRouter } from "react-router-vkminiapps";
import { ViewTypes } from "../structure";

const MobileNavigation = ({ router }: { router: any }) => {
  return (
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
  );
};

export default withRouter(MobileNavigation);
