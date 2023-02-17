import { Icon28QrCodeOutline } from "@vkontakte/icons";
import { Button, Group, PanelHeader, PanelHeaderButton } from "@vkontakte/vkui";
import { withRouter } from "react-router-vkminiapps";
import { PanelTypes } from "../../structure";

const EventsPanelHome = ({
  router,
  OnScanQRClick: OnScanQR,
}: {
  router: any;
  OnScanQRClick: () => void;
}) => {
  return (
    <>
      <PanelHeader
        before={
          <PanelHeaderButton onClick={OnScanQR}>
            <Icon28QrCodeOutline />
          </PanelHeaderButton>
        }
      >
        Главнаяf
      </PanelHeader>
      <Group>
        <Button onClick={() => router.toPanel(PanelTypes.EVENTS_ABOUT)}>
          Knopka
        </Button>
      </Group>
    </>
  );
};

export default withRouter(EventsPanelHome);
