import React, { useState, useMemo } from "react";
import Box from "../components/atoms/box.atom";
import logo from "../logo.png";
import { Grid, TextField } from "@mui/material";
import { ResizableButton } from "../styled_components";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import noop from "lodash-es/noop";

const SignUp = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [ticker, setTicker] = useState("");

  const redirectToProfile = () => {
    window.open(
      `http://localhost:3000/superfan/profile?name=${name}&&ticker=${ticker}&&cost=${price}`,
      "_self"
    );
  };

  const enableLogin = useMemo(() => name && ticker, [ticker, name]);

  return (
    <Box
      background="#000"
      height="100vh"
      width="100%"
      display="flex"
      flexDirextion="horizontal"
      overflow="scroll"
      alignItems="center"
    >
      <Box alignItems="center" px="30px" background="#6D5CD3" height="100%">
        <Box pt="330px">
          <img src={logo} alt="logo" width="260px" />
        </Box>
        <Box fontWeight="600">
          {"Build a fanbase and get rewarded for your content."}
        </Box>
      </Box>

      <Box px="60px" height="100%" pt="300px">
        <form noValidate>
          <Grid container spacing={2} color="#fff">
            <Grid item xs={12} borderColor="#fff">
              <Box
                fontSize="18px"
                display="flex"
                alignItems="flex-start"
                py="12px"
              >
                {"Name"}
              </Box>
              <TextField
                autoComplete="fname"
                name="Name"
                variant="outlined"
                required
                fullWidth
                label=""
                onChange={(e) => setName(e.target.value)}
                style={{
                  backgroundColor: "#fff",
                  border: '1px solid "fff',
                  borderRadius: "8px",
                }}
              />
            </Grid>
            <Grid item xs={12} borderColor="#fff">
              <Box
                fontSize="18px"
                display="flex"
                alignItems="flex-start"
                py="12px"
              >
                {"Earning per post"}
              </Box>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel
                  style={{
                    color: "#000",
                  }}
                  htmlFor="outlined-adornment-amount"
                ></InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">CCN</InputAdornment>
                  }
                  style={{
                    color: "#000",
                    background: "#fff",
                    borderRadius: "8px",
                  }}
                  label=""
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box
                display="flex"
                alignItems="flex-start"
                py="12px"
                fontSize="18px"
              >
                {"Ticker name"}
              </Box>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="username"
                label=""
                type="username"
                id=""
                autoComplete="username"
                onChange={(e) => setTicker(e.target.value)}
                style={{
                  backgroundColor: "#fff",
                  border: '1px solid "fff',
                  borderRadius: "8px",
                }}
              />
            </Grid>
          </Grid>
        </form>
        <Box
          pt="40px"
          display="flex"
          alignItems="center"
          width="100%"
          justifyContent="center"
        >
          <ResizableButton
            width="178px"
            borderRadius="20px"
            color="#fff"
            bgColor={enableLogin ? "#6D5CD3" : "#9c9c9c"}
            border={enableLogin ? "1px solid #6D5CD3" : "1px solid #9c9c9c"}
            hoverColor={enableLogin ? " #6D5CD3" : " #9c9c9c"}
            height="54px"
            onClick={enableLogin ? redirectToProfile : noop}
          >
            <Box fontSize="16px" fontWeight="600">
              {"Sign up"}
            </Box>
          </ResizableButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
