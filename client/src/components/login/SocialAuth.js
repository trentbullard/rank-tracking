import * as React from 'react';
import { Stack, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const SocialAuth = () => {
  const iconHeight = '1.75em';
  
  return (
    <Stack spacing={2} direction="row">
      <IconButton variant="outlined" sx={{ flex: 1 }}>
        <GoogleIcon sx={{ color: "#DF3E30", fontSize: iconHeight }} />
      </IconButton>
      <IconButton variant="outlined" sx={{ flex: 1 }}>
        <FacebookIcon sx={{ color: "#1877F2", fontSize: iconHeight }} />
      </IconButton>
      <IconButton variant="outlined" sx={{ flex: 1 }} >
        <TwitterIcon sx={{ color: "#1C9CEA", fontSize: iconHeight }} />
      </IconButton>
    </Stack>
  );
};

export default SocialAuth;
