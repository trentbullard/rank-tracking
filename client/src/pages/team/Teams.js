import _ from 'lodash';
import * as React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import api from '../../api/api';
import { AuthContext } from '../../contexts/AuthContext';
import { FlashContext } from '../../contexts/FlashContext';
import { TitlePageLayout } from '../../components/layouts';
import TeamList from '../../components/team/TeamList';
import { timedDigest } from '../../helpers/cryptography';
import { isFalse } from '../../helpers/boolean';

const Teams = () => {
  const [teams, setTeams] = React.useState([]);
  const { addFlash } = React.useContext(FlashContext);
  const { currentUser } = React.useContext(AuthContext);
  const name = currentUser?.first_name || currentUser?.username || currentUser?.email;
  
  React.useEffect(() => {
    if (isFalse(currentUser)) return;
    api.get(`/teams`, {
      headers: {
        'Authorization': `Bearer ${timedDigest(`GET/api/teams`)}`,
      },
      params: {user_id: currentUser.id},
    })
    .then(res => setTeams(res.data))
    .catch(error => {
      addFlash(_.get(error, 'response.data.error', 'something went wrong'), 'error');
    });
  }, [currentUser, addFlash]);
  
  return (
    <TitlePageLayout
      title={`${name}'s Teams`}
      // action={{
      //   component: AddCircleIcon,
      //   tooltip: 'Create a new team',
      //   url: '/teams/new',
      // }}
    >
      <TeamList teams={teams} />
    </TitlePageLayout>
  );
};

export default Teams;
