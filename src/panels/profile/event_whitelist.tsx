import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Div,
  Group,
  PanelHeader,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import { withRouter } from "react-router-vkminiapps";
import IWhitelist from "src/interfaces/IWhitelist";

const ProfilePanelEventWhitelist = ({ router }: { router: any }) => {
  const mainStorage = useSelector((state: any) => state.main);
  const [whitelist, setWhitelist] = useState<IWhitelist[]>([]);

  useEffect(() => {
    if (mainStorage.profilePanelEventId) {
      const data = [
        {
          id: 1,
          firstName: "Иван",
          lastName: "Иванов",
          imgSrc: "https://picsum.photos/200/200",
        },
      ] as IWhitelist[];
      setTimeout(() => {
        setWhitelist(data);
      }, 100);
    }
  }, [mainStorage.profilePanelEventId]);
  return (
    <>
      <PanelHeader before={<PanelHeaderBack onClick={router.toBack} />}>
        Whitelist
      </PanelHeader>
      <Group className="homeEventWhitelist">
        {whitelist.map((item) => (
          <Div className="homeEventWhitelist__header">
            <Avatar size={48} src={item.imgSrc} alt="Avatar" />
            <p className="homeEventWhitelist__title">
              {item.firstName} {item.lastName}
            </p>
          </Div>
        ))}
      </Group>
    </>
  );
};

export default withRouter(ProfilePanelEventWhitelist);
