import _ from 'lodash';
import * as React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import api from '../../api/api';
import { AuthContext } from '../../contexts/AuthContext';
import { FlashContext } from '../../contexts/FlashContext';
import { TitlePageLayout } from '../../components/layouts';
import LeagueList from '../../components/league/LeagueList';
import { timedDigest } from '../../helpers/cryptography';
import { isFalse } from '../../helpers/boolean';

const Leagues = () => {
  const [leagues, setLeagues] = React.useState([]);
  const { addFlash } = React.useContext(FlashContext);
  const { currentUser } = React.useContext(AuthContext);
  const name = currentUser?.first_name || currentUser?.username || currentUser?.email;

  React.useEffect(() => {
    if (isFalse(currentUser)) return;
    api.get(`/leagues`, {
      headers: {
        'Authorization': `Bearer ${timedDigest(`GET/api/leagues`)}`,
      },
      params: {owner_id: currentUser.id},
    })
    .then(res => setLeagues(_.reduce(res.data, (acc, league) => {
      return _.find(acc, ['id', league.id]) ? acc : _.concat(acc, league);
    }, [])))
    .catch(error => addFlash(_.get(error, 'response.data.message', 'something went wrong'), 'error'));
  }, [currentUser, addFlash]);
  
  return (
    <TitlePageLayout
      title={`${name}'s Leagues`}
      action={{
        component: AddCircleIcon,
        tooltip: 'Create a new league',
        url: '/leagues/new',
      }}
    >
      <LeagueList leagues={leagues} />
    </TitlePageLayout>
  );
};

export default Leagues;
