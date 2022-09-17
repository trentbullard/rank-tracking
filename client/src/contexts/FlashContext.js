import * as React from 'react';

export const FlashContext = React.createContext({
  flashList: [],
  setFlashList: () => {},
});

export const FlashProvider = ({ children }) => {
  const [flashList, setFlashList] = React.useState([]);

  const addFlash = React.useCallback((message, type) => setFlashList(f => [...f, {message, type}]), []);

  const removeFlash = index => {
    const newFlashList = [...flashList];
    newFlashList.splice(index, 1);
    setFlashList(newFlashList);
  };

  const state = {
    flashList,
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
