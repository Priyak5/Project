import React, { useRef, useState } from "react";
import { ResizableButton } from "../../styled_components";
import Box from "../atoms/box.atom";
import logo from "../../logo.png";
import { ethers } from "ethers";
import axios from "axios";
import noop from "lodash-es/noop";
import { toast } from "react-toastify";
import { url } from "../../constants";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [signatures, setSignatures] = useState([]);
  const [address, setAddress] = useState("");
  const [hash, setHash] = useState("");
  const [error, setError] = useState();
  const [showLogin, setShowLogin] = useState(false);
  const [isConnected, setIsConnceted] = useState(false);
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  const isUserLoggedin =
    window.localStorage.getItem("user_id") === "" ||
    window.localStorage.getItem("user_id") === undefined;
  const navigate = useNavigate();
  const signMessage = async ({ setError, message }) => {
    try {
      if (!window.ethereum) {
        toast.error("No crypto wallet found. Please install it.", {
          toastId: "login_failed",
          style: {
            background: "#FBF6F7",
            border: "1px solid #EF4F5F",
            borderRadius: "4px",
            fontSize: "14px",
            color: "#EF4F5F",
          },
        });
        return;
      }

      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      const address = await signer.getAddress();
      console.log(address, signature, "here");
      setAddress(address);
      setHash(signature);
      loginUser(address, signature);

      return {
        message,
        signature,
        address,
      };
    } catch (err) {
      setError(err.message);
      setShowLogin(false);
    }
    redirectToSignup();
  };

  const redirectToSignup = () => {
    navigate("superfan/signup");
  };

  const loginUser = (address, hash) => {
    setShowLogin(false);
    const payload = {
      ethereum_address: address,
      signature_hash: hash,
    };
    axios
      .post("http://43.205.190.168:8000/user/login/", payload)
      .then(function (response) {
        const userExists = !(response.data.payload.name === "");
        const userId = response.data.payload.user_id;

        const isError = response.data.error_msg;
        if (isError === "") {
          const accessToken = response.data.payload.jwt_credentials.access;
          window.localStorage.setItem("Authorization", `JWT ${accessToken}`);
          window.localStorage.setItem("user_id", userId);

          if (userExists) {
            redirectToProfile();
          } else {
            redirectToSignup();
          }
        }
      })
      .catch(function (error) {
        setShowLogin(true);
        toast.error("Failed to login. " + error.message, {
          toastId: "login_failed",
          style: {
            background: "#FBF6F7",
            border: "1px solid #EF4F5F",
            borderRadius: "4px",
            fontSize: "14px",
            color: "#EF4F5F",
          },
        });
      });
  };

  const handleSign = async (e) => {
    const sig = signMessage({
      setError,
      message: "You are signing into SuperFans.",
    });
    await sig;
    if (sig.result !== undefined) {
      setSignatures([...signatures, sig]);
      if (isMetamaskInstalled) {
        setIsConnceted(true);
      }
    }
  };

  const redirectToProfile = () => {
    navigate(
      `/superfan/profile?user_id=${window.localStorage.getItem("user_id")}`
    );
  };

  return (
    <Box
      top="0px"
      position="absolute"
      width="100%"
      height="max-content"
      display="flex"
      justifyContent="space-between"
      background="#000"
      p="16px"
    >
      <Box pt="30px" pl="100px">
        <img src={logo} alt="logo" width="260px" />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        pt="15px"
        pl="345px"
        pr="180px"
        onClick={isConnected ? noop : handleSign}
      >
        {isConnected ? (
          <>
            <Box
              width="178px"
              borderRadius="20px"
              color="#fff"
              bgColor="#6D5CD3"
              height="64px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box fontSize="16px" fontWeight="600">
                {"Wallet connected"}
              </Box>
            </Box>
          </>
        ) : (
          <ResizableButton
            width="178px"
            borderRadius="20px"
            color="#fff"
            bgColor="#6D5CD3"
            border="1px solid 
          #6D5CD3"
            height="64px"
          >
            <Box fontSize="16px" fontWeight="600">
              {"Connect to wallet"}
            </Box>
          </ResizableButton>
        )}
        {showLogin && isMetamaskInstalled && (
          <ResizableButton
            width="178px"
            borderRadius="20px"
            color="#fff"
            bgColor="#6D5CD3"
            border="1px solid 
        #6D5CD3"
            height="64px"
            onClick={() => handleSign()}
          >
            <Box fontSize="16px" fontWeight="600">
              {"Login/Signup"}
            </Box>
          </ResizableButton>
        )}
        {/* {isUserLoggedin && (
          <Box pl="10px">
            <ResizableButton
              width="178px"
              borderRadius="20px"
              color="#fff"
              bgColor="#6D5CD3"
              border="1px solid 
          #6D5CD3"
              height="64px"
              onClick={redirectToProfile}
            >
              <Box fontSize="16px" fontWeight="600">
                {"Go to profile"}
              </Box>
            </ResizableButton>
          </Box>
        )} */}
      </Box>
    </Box>
  );
};

export default Navbar;
