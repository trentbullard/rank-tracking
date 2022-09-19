import _ from 'lodash';
import * as React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import api from '../../api/api';
import { AuthContext } from '../../contexts/AuthContext';
import { FlashContext } from '../../contexts/FlashContext';
import { TitlePageLayout } from '../../components/layouts';
import GameList from '../../components/game/GameList';
import { timedDigest } from '../../helpers/cryptography';
import { isFalse } from '../../helpers/boolean';

const Games = () => {
  const [games, setGames] = React.useState([]);
  const { addFlash } = React.useContext(FlashContext);
  const { currentUser } = React.useContext(AuthContext);
  const name = currentUser?.first_name || currentUser?.username || currentUser?.email;

  React.useEffect(() => {
    return;
    if (isFalse(currentUser)) return;
    api.get(`/games`, {
      headers: {
        'Authorization': `Bearer ${timedDigest(`GET/api/games`)}`,
      },
      params: {user_id: currentUser.id},
    })
    .then(res => setGames(res.data))
    .catch(error => {
      addFlash(_.get(error, 'response.data.message', 'something went wrong'), 'error');
    });
  }, [currentUser, addFlash]);

  return (
    <TitlePageLayout
      title={`${name}'s Games`}
      action={{
        component: AddCircleIcon,
        tooltip: 'Create a new game',
        url: '/games/new',
      }}
    >
      <GameList games={games} />
    </TitlePageLayout>
  );
};

export default Games;
