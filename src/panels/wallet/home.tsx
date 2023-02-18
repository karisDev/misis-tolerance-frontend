import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Icon56WalletOutline } from "@vkontakte/icons";
import { Button, Div } from "@vkontakte/vkui";
import { withRouter } from "react-router-vkminiapps";

const WalletPanelHome = ({ router }: { router: any }) => {
  return (
    <Div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon56WalletOutline />
      <h3 style={{ margin: "0" }}>Предупреждение!</h3>
      <p style={{ textAlign: "center" }}>
        Для дальнейшего использования приложения
        <br />
        необходимо привязать кошелек
      </p>
      <WalletMultiButton />
    </Div>
  );
};

export default withRouter(WalletPanelHome);
