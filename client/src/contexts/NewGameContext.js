import * as React from 'react';

export const NewGameContext = React.createContext({});

export const NewGameProvider = ({ children }) => {
  const [sport, setSport] = React.useState({});
  const [leagues, setLeagues] = React.useState([]);
  const [selectedLeague, setSelectedLeague] = React.useState({});
  const [seasons, setSeasons] = React.useState([]);
  const [selectedSeason, setSelectedSeason] = React.useState({});
  const [matches, setMatches] = React.useState([]);
  const [selectedMatch, setSelectedMatch] = React.useState({});
  const [sets, setSets] = React.useState([]);
  const [selectedSet, setSelectedSet] = React.useState({});

  React.useEffect(() => {
    setSelectedSeason({});
    setSelectedMatch({});
    setSelectedSet({});
  }, [selectedLeague]);

  React.useEffect(() => {
    setSelectedMatch({});
    setSelectedSet({});
  }, [selectedSeason]);

  React.useEffect(() => {
    setSelectedSet({});
  }, [selectedMatch]);
  
  const state = {
    sport,
    setSport,
    leagues,
    setLeagues,
    selectedLeague,
    setSelectedLeague,
    seasons,
    setSeasons,
    selectedSeason,
    setSelectedSeason,
    matches,
    setMatches,
    selectedMatch,
    setSelectedMatch,
    sets,
    setSets,
    selectedSet,
    setSelectedSet,
  };
  
  return (
    <NewGameContext.Provider value={state}>
      {children}
    </NewGameContext.Provider>
  );
};

export default NewGameProvider;
