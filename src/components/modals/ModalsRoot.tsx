import { Icon56MoneyTransferOutline } from "@vkontakte/icons";
import {
  CellButton,
  Group,
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  PanelHeaderClose,
  Placeholder,
} from "@vkontakte/vkui";
import { withRouter } from "react-router-vkminiapps";

const ModalsRoot = ({ router }: { router: any }) => {
  return (
    <ModalRoot activeModal={router.modal} onClose={router.toBack}>
      <ModalPage
        nav="test_modal"
        header={
          <ModalPageHeader
            before={<PanelHeaderClose onClick={router.toBack} />}
          >
            Dynamic modal
          </ModalPageHeader>
        }
      >
        <Group>
          <CellButton>test</CellButton>
          <Placeholder icon={<Icon56MoneyTransferOutline />} />
        </Group>
      </ModalPage>
    </ModalRoot>
  );
};

export default withRouter(ModalsRoot);
