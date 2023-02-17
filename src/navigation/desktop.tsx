import { Icon28NewsfeedOutline, Icon28ServicesOutline } from "@vkontakte/icons";
import { SplitCol, Panel, PanelHeader, Group, Cell } from "@vkontakte/vkui";
import { withRouter } from "react-router-vkminiapps";
import { ViewTypes } from "../structure";

const DesktopNavigation = ({ router }: { router: any }) => {
  return (
    <SplitCol fixed width={280} maxWidth={280}>
      <Panel id="navDesktop">
        <PanelHeader />
        <Group>
          <Cell
            onClick={() => router.toView(ViewTypes.MAIN)}
            selected={router.activeView == ViewTypes.MAIN}
            before={<Icon28NewsfeedOutline />}
          >
            Главная
          </Cell>
          <Cell
            onClick={() => router.toView(ViewTypes.SETTINGS)}
            selected={router.activeView == ViewTypes.SETTINGS}
            before={<Icon28ServicesOutline />}
          >
            Настройки
          </Cell>
        </Group>
      </Panel>
    </SplitCol>
  );
};

export default withRouter(DesktopNavigation);
