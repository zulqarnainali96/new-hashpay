import Actions from "../Actions/actions";
import _ from "lodash";

const defaultState = {
  address: "",
  publicKey: "",
  seed : "",
  loader: false,
  kusd_balance: 0,
  hash_balance: 0,
  Kss_balance: 0,
  totalnairabalance : 0,
  userData : [],
  userAlias : ""
};

const walletReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Actions.Types.LOGIN_USER: {
      let { address, publicKey, seed } = action.payload;
      let newState = _.cloneDeep(state);
      newState.address = address;
      newState.publicKey = publicKey;
      newState.seed = seed;
      return newState;
    }
    case Actions.Types.LOGOUT_USER: {
      let newState = _.cloneDeep(state);
      newState.address = "";
      newState.publicKey = "";
      newState.seed = ""
      global.waves = null;
      return newState;
    }
    case Actions.Types.LOADING: {
      return { ...state, loader: action.payload };
    }
    case Actions.Types.HASH_BALANCE : {
      return {...state, hash_balance : action.payload}
    }
    
    case Actions.Types.KUSD_BALANCE : {
      return {...state, kusd_balance : action.payload}
    }

    case Actions.Types.KSS_BALANCE : {
      return {...state, kss_balance : action.payload}
    }
    case Actions.Types.TOTAL_NAIRA_BALANCE : {
      return {...state, totalnairabalance : action.payload}
    }
    case Actions.Types.USER_ALIAS : {
      return {...state, userAlias : action.payload}
    }

    case Actions.Types.GET_BALANCE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case Actions.Types.GET_USER_DATA : {
      return {
        ...state,
        userData : action.payload
      }
    }
    default:
      return state;
  }
};
export default walletReducer;
