import { createContext, useEffect, useReducer } from 'react';

let INITIAL_STATE;
const searchStore = JSON.parse(localStorage.getItem('search')) || null;

if (searchStore) {
  INITIAL_STATE = searchStore;
} else
  INITIAL_STATE = {
    city: null,
    dates: [],
    options: {
      adults: null,
      children: null,
      room: null,
    },
  };

export const SearchContext = createContext(INITIAL_STATE);
export const SearchActions = {
  add: 'ADD',
  reset: 'RESET',
};
const SearchReducer = (state, action) => {
  switch (action.type) {
    case SearchActions.add:
      return action.payload;

    case SearchActions.reset:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
  const value = {
    city: state.city,
    dates: state.dates,
    options: state.options,
    dispatch,
  };
  useEffect(() => {
    localStorage.setItem('search', JSON.stringify(state));
  }, [state]);

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
