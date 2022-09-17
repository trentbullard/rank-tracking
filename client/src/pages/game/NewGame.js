import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

import FormLayout from '../../components/layouts/formPage/FormLayout';
import NewGameForm from '../../components/game/NewGameForm';

const NewGame = () => {
  const [searchParams] = useSearchParams();
  const sport = searchParams.get('sport');

  return (
    <FormLayout title={`new ${sport} game`}>
      <NewGameForm sport={sport} />
    </FormLayout>
  );
};

export default NewGame;
