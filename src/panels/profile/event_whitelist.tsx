import { useEffect } from "react";
import { useSelector } from "react-redux";

const ProfilePanelEventWhitelist = () => {
  const mainStorage = useSelector((state: any) => state.mainStorage);

  useEffect(() => {}, [mainStorage.profilePanelEventId]);
  return (
    <div>
      <h2></h2> ProfilePanelEventWhitelist
    </div>
  );
};

export default ProfilePanelEventWhitelist;
