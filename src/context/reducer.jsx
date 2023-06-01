import actionHelper from "./actionHelper";

const actions = actionHelper();

const reducer = (state, action) => {
  try {
    switch (action.type) {
      case actions.START_LOADING:
        return { ...state, loading: true };
      case actions.END_LOADING:
        return { ...state, loading: false };

      case actions.UPDATE_C_USER:
        localStorage.setItem("currentUser", JSON.stringify(action.payload));
        return { ...state, currentUser: action.payload };

      case actions.RESET_CURRENT_USER:
        localStorage.removeItem("currentUser");
        return { ...state, currentUser: null };

      case actions.UPDATE_USER_ACCOUNT:
        return {
          ...state,
          userAccount: { ...state.userAccount, ...action.payload },
        };

      case actions.RESET_USER_ACCOUNT:
        return {
          ...state,
          userAccount: {
            name: "",
            email: "",
            password: "",
            contactNumber: "",
            event: "",
            role: "",
            status: "",
          },
        };
      case actions.UPDATE_EVENT:
        return {
          ...state,
          event: { ...state.event, ...action.payload },
        };

      case actions.RESET_EVENT:
        return {
          ...state,
          event: {
            title: "",
            description: "",
            date: "",
          },
        };
      case actions.UPDATE_SUBEVENT:
        return {
          ...state,
          subEvent: { ...state.subEvent, ...action.payload },
        };

      case actions.RESET_SUBEVENT:
        return {
          ...state,
          subEvent: {
            title: "",
            date: "",
          },
        };
      case actions.UPDATE_CATEGORY:
        return {
          ...state,
          category: { ...state.category, ...action.payload },
        };

      case actions.RESET_CATEGORY:
        return {
          ...state,
          category: {
            category: "",
            description: "",
            percentage: "",
            event_id: "",
          },
        };
      case actions.UPDATE_CRITERIA:
        return {
          ...state,
          criteria: { ...state.criteria, ...action.payload },
        };

      case actions.RESET_CRITERIA:
        return {
          ...state,
          criteria: {
            description: "",
            percentage: "",
            category_id: "",
          },
        };
      case actions.UPDATE_SCORE:
        return {
          ...state,
          score: { ...state.score, ...action.payload },
        };

      case actions.RESET_SCORE:
        return {
          ...state,
          score: {
            description: "",
            category_id: "",
          },
        };
      case actions.UPDATE_CONTESTANT:
        return {
          ...state,
          contestant: { ...state.contestant, ...action.payload },
        };

      case actions.RESET_CONTESTANT:
        return {
          ...state,
          contestant: {
            name: "",
            municipality: "",
            age: "",
            weight: "",
            height: "",
            shoeSize: "",
            swimsuitSize: "",
            bust: "",
            waist: "",
            hips: "",
            nickname: "",
            dateOfBirth: "",
            birthPlace: "",
            event_id: "",
            cotestant_number: "",
          },
        };

      default:
        throw new Error("Invalid action type!");
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default reducer;
