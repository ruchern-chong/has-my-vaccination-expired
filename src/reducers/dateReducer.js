const initialState = {
  dose: {},
};

const dateReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case "UPDATE_FIRST_DOSE":
      return {
        ...state,
        dose: { ...state.dose, first: action.payload },
      };
    case "UPDATE_SECOND_DOSE":
      return {
        ...state,
        dose: { ...state.dose, second: action.payload },
      };
    default:
      return state;
  }
};

export default dateReducer;
