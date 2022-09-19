import _ from 'lodash';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

import api from '../../api/api';
import { FlashContext } from '../../contexts/FlashContext';
import { NewGameContext } from '../../contexts/NewGameContext';
import FormLayout from '../../components/layouts/formPage/FormLayout';
import NewGameForm from '../../components/game/NewGameForm/NewGameForm';
import { timedDigest } from '../../helpers/cryptography';
import { isFalse } from '../../helpers/boolean';

const NewGame = () => {
  const [searchParams] = useSearchParams();
  const { addFlash } = React.useContext(FlashContext);
  const { sport, setSport } = React.useContext(NewGameContext);
  const sportName = searchParams.get('sport');

  React.useEffect(() => {
    if (isFalse(sportName)) return;
    api.get(`/sports`, {
      headers: {
        'Authorization': `Bearer ${timedDigest(`GET/api/sports`)}`,
      },
      params: {
        name: sportName,
      },
    }).then(res => {
      setSport(res.data[0]);
    }).catch(error => {
      addFlash(_.get(error, 'response.data.error', 'something went wrong'), 'error');
    });
  }, [sportName, setSport, addFlash]);

  return (
    isFalse(sport) ? (
      <FormLayout title={`couldn't find ${sportName}`} />
    ) : (
      <FormLayout title={`new ${sport.name} game`}>
        <NewGameForm sport={sport} />
      </FormLayout>
    )
  );
};

export default NewGame;
