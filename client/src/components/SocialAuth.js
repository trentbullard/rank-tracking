import * as React from 'react';
import { Stack, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const SocialAuth = () => {
  return (
    <Stack spacing={2} direction="row">
      <IconButton
        sx={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "0.5675rem",
          flex: 1,
        }}
      >
        <GoogleIcon sx={{ color: "#DF3E30" }} width={22} height={22} />
      </IconButton>
      <IconButton
        sx={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "0.5675rem",
          flex: 1,
        }}
      >
        <FacebookIcon sx={{ color: "#1877F2" }} width={22} height={22} />
      </IconButton>
      <IconButton
        sx={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "0.5675rem",
          flex: 1,
        }}
      >
        <TwitterIcon sx={{ color: "#1C9CEA" }} width={22} height={22} />
      </IconButton>
    </Stack>
  );
};

export default SocialAuth;
