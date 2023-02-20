import {
  Icon56CheckCircleOutline,
  Icon56ErrorOutline,
  Icon56MoneyTransferOutline,
} from "@vkontakte/icons";
import {
  Button,
  CellButton,
  Div,
  Group,
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  PanelHeaderClose,
  Placeholder,
} from "@vkontakte/vkui";
import { withRouter } from "react-router-vkminiapps";
import { PanelTypes, ViewTypes } from "../../structure";

const ModalsRoot = ({ router }: { router: any }) => {
  return (
    <ModalRoot activeModal={router.modal} onClose={router.toBack}>
      <ModalPage
        nav="ticket_accepted"
        header={<ModalPageHeader>Успешно!</ModalPageHeader>}
      >
        <Group>
          <Div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Icon56CheckCircleOutline style={{ color: "lightgreen" }} />
            <p>
              Токен успешно получен!
              <br />
              Получение токена может
              <br />
              занять до 5 минут
            </p>
          </Div>
          <Div>
            <Button
              stretched
              size="l"
              onClick={() => {
                router.toBack();
                router.toView(ViewTypes.PROFILE);
                router.toPanel(PanelTypes.PROFILE_HOME);
              }}
            >
              Перейти к профилю
            </Button>
          </Div>
        </Group>
      </ModalPage>
      <ModalPage nav="ticket_error">
        <Group>
          <Div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Icon56ErrorOutline style={{ color: "#ffcccb" }} />
            <p>
              Произошла ошибка
              <br />
              Попробуйте чуть позже
            </p>
          </Div>
          <Div>
            <Button
              stretched
              size="l"
              onClick={() => {
                router.toBack();
              }}
            >
              Назад
            </Button>
          </Div>
        </Group>
      </ModalPage>
      <ModalPage nav="event_edit">
        <Group>
          <Div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Button
              size="l"
              stretched
              onClick={() => {
                router.toBack();
                router.toView(ViewTypes.PROFILE);
                router.toPanel(PanelTypes.PROFILE_NEW_TICKET);
              }}
            >
              Новый билет
            </Button>
            <Button
              size="l"
              stretched
              onClick={() => {
                router.toBack();
                router.toView(ViewTypes.PROFILE);
                router.toPanel(PanelTypes.PROFILE_EVENT_WHITELIST);
              }}
            >
              Whitelist
            </Button>
            <Button
              stretched
              size="l"
              mode="secondary"
              onClick={() => {
                router.toBack();
              }}
            >
              Назад
            </Button>
          </Div>
        </Group>
      </ModalPage>
    </ModalRoot>
  );
};

export default withRouter(ModalsRoot);
