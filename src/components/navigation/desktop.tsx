// Данный компонент не используется

import { Icon28Profile, Icon28Square4Outline } from "@vkontakte/icons";
import {
  SplitCol,
  Panel,
  PanelHeader,
  Group,
  Cell,
  Div,
} from "@vkontakte/vkui";
import { withRouter } from "react-router-vkminiapps";
import { ViewTypes } from "../../structure";

const DesktopNavigation = ({ router }: { router: any }) => {
  return (
    <SplitCol fixed width={280} maxWidth={280}>
      <Panel id="navDesktop">
        <Div style={{ paddingTop: "0", paddingLeft: "0" }}>
          <Group>
            <Cell
              className={
                router.activeView == ViewTypes.EVENTS ? "nav-active" : ""
              }
              onClick={() => router.toView(ViewTypes.EVENTS)}
              selected={router.activeView == ViewTypes.EVENTS}
              before={<Icon28Square4Outline />}
            >
              Мероприятия
            </Cell>
            <Cell
              className={
                router.activeView == ViewTypes.PROFILE ? "nav-active" : ""
              }
              onClick={() => router.toView(ViewTypes.PROFILE)}
              selected={router.activeView == ViewTypes.PROFILE}
              before={<Icon28Profile />}
            >
              Профиль
            </Cell>
          </Group>
        </Div>
      </Panel>
    </SplitCol>
  );
};

export default withRouter(DesktopNavigation);
