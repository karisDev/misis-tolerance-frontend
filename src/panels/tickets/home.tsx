import { Group, PanelHeader } from "@vkontakte/vkui";
import { withRouter } from "react-router-vkminiapps";

const TicketsPanelHome = ({ router }: { router: any }) => {
  return (
    <>
      <PanelHeader separator={false}>Профиль</PanelHeader>
      <Group></Group>
    </>
  );
};

export default withRouter(TicketsPanelHome);
