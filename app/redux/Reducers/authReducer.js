import Actions from "../Actions/actions";

const defaultState = {
  showmenu: false,
  showDropdown: false,
  accountAddress: "",
};

const Authreducer = (state = defaultState, action) => {
  switch (action.type) {
    case Actions.Types.SHOW_MENU: {
      return { ...state, showmenu: action.payload };
    }
    case Actions.Types.SHOW_DROP_DOWN: {
      return { ...state, showDropdown: action.payload };
    }
    case Actions.Types.USER_ACCOUNT_ADDRESS:
      return { ...state, accountAddress: action.payload };
    default:
      return state;
  }
};

export default Authreducer;
