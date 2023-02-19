import { useWallet } from "@solana/wallet-adapter-react";
import { Icon28QrCodeOutline } from "@vkontakte/icons";
import {
  Avatar,
  Button,
  Div,
  Group,
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderButton,
  Tabs,
  TabsItem,
} from "@vkontakte/vkui";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-vkminiapps";
import { set } from "src/store";
import { PanelTypes } from "../../structure";

const ProfilePanelHome = ({ router }: { router: any }) => {
  const mainStorage = useSelector((state: any) => state.main);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState<"all" | "fav">("all");
  const [devMode, setDevMode] = useState(true);
  const wallet = useWallet();

  return (
    <>
      <PanelHeader>Профиль</PanelHeader>
      <Group className="profileHome">
        {mainStorage.user && (
          <Div className="profileHome__user">
            <Avatar
              size={48}
              src={mainStorage.user.photo_100}
              className="profileHome__user_avatar"
            />
            <div className="profileHome__user_data">
              <h4 className="profileHome__user_data-name">
                {mainStorage.user.first_name} {mainStorage.user.last_name}
              </h4>
              <p className="profileHome__user_data-wallet">
                {wallet.publicKey?.toString()}
              </p>
            </div>
          </Div>
        )}
        <Div className="profileHome__createEvent">
          <Button size="l" onClick={() => setDevMode(!devMode)}>
            {devMode ? "Выключить DevMode" : "Включить DevMode"}
          </Button>
          {devMode && (
            <>
              <Button
                mode="outline"
                size="l"
                onClick={() => router.toPanel(PanelTypes.PROFILE_NEW_EVENT)}
              >
                Создать мероприятие
              </Button>
              <Button
                mode="outline"
                size="l"
                onClick={() => {
                  dispatch(set({ profilePanelEventId: 0 }));
                  router.toPanel(PanelTypes.PROFILE_EVENT_INFO);
                }}
              >
                Открыть мероприятие (временно)
              </Button>
            </>
          )}
        </Div>
        {!devMode && (
          <>
            <Div>
              <Tabs>
                <TabsItem
                  selected={selectedTab == "all"}
                  onClick={() => setSelectedTab("all")}
                >
                  Мои токены
                </TabsItem>
                <TabsItem
                  selected={selectedTab == "fav"}
                  onClick={() => setSelectedTab("fav")}
                >
                  Понравившиеся
                </TabsItem>
              </Tabs>
            </Div>
            <Div>
              {selectedTab == "all" && <h1>All</h1>}
              {selectedTab == "fav" && <h1>{"Скоро :)"}</h1>}
            </Div>
          </>
        )}
        {devMode && (
          <Div>
            <h2>Мои мероприятия</h2>
          </Div>
        )}
      </Group>
    </>
  );
};

export default withRouter(ProfilePanelHome);
