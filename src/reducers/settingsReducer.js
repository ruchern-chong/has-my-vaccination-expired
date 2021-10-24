const initialState = {
  lang: 'en'
};

const settingsReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case 'SET_LANGUAGE':
      return { ...state, lang: action.payload };
    default:
      return state;
  }
};

export default settingsReducer;
