import { Icon28QrCodeOutline } from "@vkontakte/icons";
import {
  Button,
  Group,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderButton,
} from "@vkontakte/vkui";
import { withRouter } from "react-router-vkminiapps";
import { PanelTypes } from "../../structure";

const EventsPanelAbout = ({ router }: { router: any }) => {
  return (
    <>
      <PanelHeader
        before={<PanelHeaderBack onClick={router.toBack}>Tets</PanelHeaderBack>}
      >
        О нас
      </PanelHeader>
      ...ы
    </>
  );
};

export default withRouter(EventsPanelAbout);
