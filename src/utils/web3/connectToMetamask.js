const connectMetamask = async () => {
  // Check if Metamask is installed and enabled
  if (typeof window.ethereum !== "undefined") {
    // Request account access
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        // User approved account access
        const account = accounts[0];
        console.log("Connected to Metamask");
        console.log("Selected account:", account);
        // Perform further operations with the account
      })
      .catch((error) => {
        console.error("Failed to connect to Metamask:", error);
      });
  } else {
    console.error("Metamask not detected. Please install Metamask extension.");
  }
};

export default connectMetamask;
