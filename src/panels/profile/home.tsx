import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-vkminiapps";
import ImageCard from "../../components/cards/ImageCard";
import { set } from "../../store";
import { PanelTypes } from "../../structure";

const ProfilePanelHome = ({ router }: { router: any }) => {
  const mainStorage = useSelector((state: any) => state.main);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState<"all" | "fav">("all");
  const [devMode, setDevMode] = useState(true);
  const [tickets, setTickets] = useState<any>([]);
  const wallet = useWallet();

  useEffect(() => {
    const getTickets = async () => {
      /*
      {
    "owner": "3P6CAzWbQmhip9SNVuG1XU15MDyGSBRvfAKmgnpV4GP7",
    "assets": [
        {
            "name": "FRONTEND AAA NNN",
            "collectionName": "Unknown",
            "tokenAddress": "6otwC2qMF946hZPmgJMBSKcHM8yE9egTLUsa4h5qie37",
            "collectionAddress": "9dLPa7otfht4rszhdSL6EjfSLwENibhKa3yCqYTf1LqP",
            "imageUrl": "https://nftstorage.link/ipfs/bafybeigbqmjqajhrxlp4cczaow3lj6hybwjcd4j45drpwttmdeppprzsme",
            "traits": [
                {
                    "trait_type": "ticket_type",
                    "value": "VIP+STRIP"
                },
                {
                    "trait_type": "zone",
                    "value": 4
                },
                {
                    "trait_type": "encrypted_img",
                    "value": "https://nextcloud.seizure.icu/s/nCbFHYz8kfa5Xi7/download/pic.enc.png"
                }
            ],
            "chain": "SOL",
            "creators": [
                {
                    "address": "BmDQXhAuwC3vn63qHDjStt2HCFpei64GrReCARxT9tYW",
                    "verified": 1,
                    "share": 100
                }
            ],
            "network": "devnet",
            "description": "encrypted ticket for front 2",
            "provenance": [
                {
                    "txHash": "2GY6u9yr7AZtjzJXcqXMKpdda3yiyXj7MZJwNrcWp9i3Rn6rLtB1GNwdXUeiHRpUHFSPpybe1sSSUY6PHPTVxS7A",
                    "blockNumber": 196760272,
                    "date": "2023-02-19T09:04:39.000Z"
                }
            ]
        }
    ]
}
      */
      const response = await fetch("https://vknft.seizure.icu/get/nfts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + mainStorage.accountToken || "",
        },
      });
      const data = await response.json();
      setTickets(data.assets);
    };

    if (mainStorage.accountToken) {
      getTickets();
    }
  }, [mainStorage.accountToken]);

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
                  dispatch(set({ profilePanelEventId: 1 }));
                  router.toPanel(PanelTypes.PROFILE_EVENT_INFO);
                }}
              >
                Открыть мероприятие (временно)
              </Button>
              <WalletMultiButton />
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
              {selectedTab == "all" &&
                tickets.map((ticket: any) => {
                  // name: string;
                  // body: string;
                  // imgSrc: string;
                  return (
                    <ImageCard
                      key={ticket.name}
                      name={ticket.name}
                      body={ticket.description}
                      imgSrc={ticket.imageUrl}
                    />
                  );
                })}
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
