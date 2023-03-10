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
  ScreenSpinner,
  Tabs,
  TabsItem,
} from "@vkontakte/vkui";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-vkminiapps";
import ImageCard from "../../components/cards/ImageCard";
import { set } from "../../store";
import { PanelTypes } from "../../structure";
import emptySvg from "../../assets/empty.svg";

const ProfilePanelHome = ({ router }: { router: any }) => {
  const mainStorage = useSelector((state: any) => state.main);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"all" | "fav">("all");
  const [devMode, setDevMode] = useState(false);
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
      setLoading(true);
      getTickets()
        .catch((e) => {
          console.log(e);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [mainStorage.accountToken]);

  return (
    <>
      <PanelHeader separator={false}>??????????????</PanelHeader>

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
            {devMode ? "?????????????????? DevMode" : "???????????????? DevMode"}
          </Button>
          {devMode && (
            <>
              <Button
                mode="outline"
                size="l"
                onClick={() => router.toPanel(PanelTypes.PROFILE_NEW_EVENT)}
              >
                ?????????????? ??????????????????????
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
                  ?????? ????????????
                </TabsItem>
                <TabsItem
                  selected={selectedTab == "fav"}
                  onClick={() => setSelectedTab("fav")}
                >
                  ??????????????????????????
                </TabsItem>
              </Tabs>
            </Div>
            <Div className="profileHome__tickets">
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
              {selectedTab == "fav" && <h1>{"?????????? :)"}</h1>}
              {selectedTab == "all" && tickets.length == 0 && (
                <Div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img src={emptySvg} alt="empty" />
                  <p>?????? ???????? ?????????? :(</p>
                </Div>
              )}
            </Div>
          </>
        )}
      </Group>
      {loading && <ScreenSpinner />}
    </>
  );
};

export default withRouter(ProfilePanelHome);
