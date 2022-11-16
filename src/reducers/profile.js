import { Types } from "../constants/actionTypes";

const initialState = {
  profile: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  formSubmitted: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN:
      return {
        ...state,
        profile: action.payload.user,
        formSubmitted: false, // after update user formsubmition reset
      };
    case Types.ADD_USER:
      return {
        ...state,
        profile: action.payload.user,
        formSubmitted: false, // after update user formsubmition reset
      };
    case Types.FORM_SUBMITION_STATUS:
      return {
        ...state,
        formSubmitted: action.payload.status,
      };
    default:
      return state;
  }
};

export default reducer;
