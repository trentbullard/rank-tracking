import * as React from 'react';

export const FlashContext = React.createContext({
  flash: [],
  setFlash: () => {},
});

export const FlashProvider = ({ children }) => {
  const [flash, setFlash] = React.useState([]);

  const addFlash = message => {
    setFlash([...flash, message]);
  };

  const removeFlash = index => {
    const newFlash = [...flash];
    newFlash.splice(index, 1);
    setFlash(newFlash);
  };

  const state = {
    flash,
    addFlash,
    removeFlash,
  };
  
  return (
    <FlashContext.Provider value={state}>
      {children}
    </FlashContext.Provider>
  );
};

export default FlashProvider;
