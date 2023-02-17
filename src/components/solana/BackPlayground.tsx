import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const BackPlayground = () => {
  const wallet = useWallet();
  return (
    <>
      <h1>развлекайтесь</h1>
      <WalletMultiButton />
    </>
  );
};

export default BackPlayground;
