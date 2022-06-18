import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";

function ManualHeader() {
  const {
    enableWeb3,
    account,
    isWeb3Enabled,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    console.log(isWeb3Enabled);
    if (isWeb3Enabled) return;

    if (localStorage.getItem("connected")) {
      enableWeb3();
    }

    // return () => {
    //   null;
    // };
  }, [isWeb3Enabled]);

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      if (!account) {
        deactivateWeb3();
        localStorage.removeItem("connected");
      }
    });

    // return () => {
    //   second
    // }
  }, []);

  const handleEnableWeb3 = async () => {
    try {
      await enableWeb3();
      localStorage.setItem("connected", "injected");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1>Header</h1>
      {account ? (
        <div>Connected to {account}</div>
      ) : (
        <button onClick={handleEnableWeb3} disabled={isWeb3EnableLoading}>
          Connect
        </button>
      )}
    </div>
  );
}

export default ManualHeader;
