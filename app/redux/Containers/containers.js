import { connect } from "react-redux";
import Action from "../Actions/actions";

const mapStateToProps = (state) => ({
  walletState: {
    address: state.walletReducer.address,
    publicKey: state.walletReducer.publicKey,
    seed: state.walletReducer.seed,
    loader: state.walletReducer.loader,
    kusd_balance: state.walletReducer.kusd_balance,
    hash_balance: state.walletReducer.hash_balance,
    kss_balance: state.walletReducer.kss_balance,
    userData: state.walletReducer.userData,
    userAlias: state.walletReducer.userAlias,
    totalnairabalance: state.walletReducer.totalnairabalance,
  },
});

const mapDisptachToProps = (dispatch) => ({
  walletActions: {
    loginUser: (address, publicKey, seed) =>
      dispatch(Action.LoginUser(address, publicKey, seed)),
    logoutUser: () => dispatch(Action.LogoutUser()),
    loading: (loading) => dispatch(Action.loading(loading)),
    getBalance: (balances) => dispatch(Action.getBalance(balances)),
    getUserData: (userData) => dispatch(Action.getUserData(userData)),
    hashBalance: (hashbalance) => dispatch(Action.hashBalance(hashbalance)),
    kusdBalance: (kusdbalance) => dispatch(Action.kusdBalance(kusdbalance)),
    kssBalance: (kssbalance) => dispatch(Action.kssBalance(kssbalance)),
    getUserAlias: (userAlias) => {
      dispatch(Action.getUserAlias(userAlias))},
    totalNairaBalance: (nairabalance) =>
      dispatch(Action.totalNairaBalance(nairabalance)),
  },
});

function WalletContainer(component) {
  return connect(mapStateToProps, mapDisptachToProps)(component);
}

export default WalletContainer;
