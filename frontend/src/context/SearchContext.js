import { createContext, useEffect, useReducer } from 'react';

let INITIAL_STATE;
const searchStore = JSON.parse(localStorage.getItem('search')) || null;

if (searchStore) {
  INITIAL_STATE = searchStore;
} else
  INITIAL_STATE = {
    city: null,
    dates: [],
    diffDay:null,
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
      let value = action.payload;
      let startDate = new Date(value.dates[0].startDate);
      let endDate = new Date(value.dates[0].endDate);
      let diffDay = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1; //ONE DAY
      value = { ...value, diffDay };
      return value;

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
    diffDay: state.diffDay,
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
