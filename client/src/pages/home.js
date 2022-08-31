import { Box, Typography } from '@mui/material';

import { TitlePageLayout } from '../components/layouts';

const Home = () => {
  const currentUser = 'trent';

  return (
    <TitlePageLayout title={`Hello ${currentUser}`} />
  );
};

export default Home;
