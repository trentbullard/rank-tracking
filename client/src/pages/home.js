import { Box, Typography } from '@mui/material';

import { TitlePageLayout } from '../components/layouts';
import { icons } from '../img/icons';

const Home = () => {
  const imgSize = "5rem";
  const currentUser = 'trent';

  return (
    <TitlePageLayout title={`${currentUser}'s Dashboard`}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" sx={{ width: "100%" }}>
        <Box component="img" src={icons().foosball} alt="foosball" sx={{ height: imgSize, width: imgSize }} />
        <Box component="img" src={icons().cornhole} alt="cornhole" sx={{ height: imgSize, width: imgSize }} />
        <Box component="img" src={icons().tabletennis} alt="tabletennis" sx={{ height: imgSize, width: imgSize }} />
        <Box component="img" src={icons().soccer} alt="soccer" sx={{ height: imgSize, width: imgSize }} />
      </Box>
    </TitlePageLayout>
  );
};

export default Home;
