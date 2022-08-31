import * as React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { TitlePageLayout } from '../components/layouts';
import LeagueList from '../components/league/LeagueList';

const Leagues = () => {
  const currentUser = 'trent';

  return (
    <TitlePageLayout
      title={`${currentUser}'s Leagues`}
      action={{
        component: AddCircleIcon,
        tooltip: 'Create a new league',
        url: '/leagues/new',
      }}
    >
      <LeagueList />
    </TitlePageLayout>
  )
};

export default Leagues;
