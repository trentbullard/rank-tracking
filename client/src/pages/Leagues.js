import * as React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { AuthContext } from '../contexts/AuthContext';
import { TitlePageLayout } from '../components/layouts';
import LeagueList from '../components/league/LeagueList';

const Leagues = () => {
  const { currentUser } = React.useContext(AuthContext);
  const name = currentUser?.first_name || currentUser?.username || currentUser?.email;

  return (
    <TitlePageLayout
      title={`${name}'s Leagues`}
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
