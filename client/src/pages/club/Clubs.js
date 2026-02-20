import _ from 'lodash';
import * as React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import api from '../../api/api';
import { AuthContext } from '../../contexts/AuthContext';
import { FlashContext } from '../../contexts/FlashContext';
import { TitlePageLayout } from '../../components/layouts';
import ClubList from '../../components/club/ClubList';
import { isFalse } from '../../helpers/boolean';

const Clubs = () => {
  const [clubs, setClubs] = React.useState([]);
  const { addFlash } = React.useContext(FlashContext);
  const { currentUser } = React.useContext(AuthContext);
  const name = currentUser?.first_name || currentUser?.username || currentUser?.email;

  React.useEffect(() => {
    if (isFalse(currentUser)) return;
    api.get('/clubs', {
      params: { user_id: currentUser.id },
    })
      .then((res) => setClubs(_.reduce(res.data, (acc, club) => (
        _.find(acc, ['id', club.id]) ? acc : _.concat(acc, club)
      ), [])))
      .catch((error) => addFlash(_.get(error, 'response.data.error', 'something went wrong'), 'error'));
  }, [currentUser, addFlash]);

  return (
    <TitlePageLayout
      title={`${name}'s Clubs`}
      action={{
        component: AddCircleIcon,
        tooltip: 'Create a new club',
        url: '/clubs/new',
      }}
    >
      <ClubList clubs={clubs} />
    </TitlePageLayout>
  );
};

export default Clubs;
