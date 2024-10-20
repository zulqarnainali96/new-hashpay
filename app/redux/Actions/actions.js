const Types = {
    LOGIN_USER : 'LOGIN_USER',
    LOGOUT_USER : 'LOGOUT_USER',
    LOADING : 'LOADING',
    GET_BALANCE : 'GET_BALANCE',
    GET_USER_DATA : 'GET_USER_DATA',
    SHOW_MENU : "SHOW_MENU",
    SHOW_DROP_DOWN : "SHOW_DROP_DOWN" ,
    USER_ACCOUNT_ADDRESS : "USER_ACCOUNT_ADDRESS",
    HASH_BALANCE : "HASH_BALANCE",
    KUSD_BALANCE : "KUSD_BALANCE",
    KSS_BALANCE : "KSS_BALANCE",
    TOTAL_NAIRA_BALANCE : "TOTAL_NAIRA_BALANCE",
    USER_ALIAS : "USER_ALIAS"
 }

// Actions 
const LoginUser = (address, publicKey, seed) => ({
    type : Types.LOGIN_USER,
    payload : {address, publicKey, seed}
})
const LogoutUser = (address, publicKey, seed) => ({
    type : Types.LOGOUT_USER,
})
const loading = (payload) => ({
    type : Types.LOADING,
    payload : payload
})
const showMenu = (showmenu) => ({
    type : Types.SHOW_MENU,
    payload : showmenu
})
const showDropDown = (showDropdown) => ({
    type : Types.SHOW_DROP_DOWN,
    payload : showDropdown
})
const userAccountAddress = (userAddress) => ({
    type : Types.USER_ACCOUNT_ADDRESS,
    payload : userAddress
})
const getBalance = (balances) => ({
    type : Types.GET_BALANCE,
    payload : {
        ...balances
    }
})
const hashBalance = (hashbalance) => ({
    type : Types.HASH_BALANCE,
    payload : hashbalance
})

const kusdBalance = (kusdbalance) => ({
    type : Types.KUSD_BALANCE,
    payload : kusdbalance
})
const kssBalance = (kssdbalance) => ({
    type : Types.KSS_BALANCE,
    payload : kssdbalance
})
const getUserAlias = (userAlias) => ({
    type : Types.USER_ALIAS,
    payload : userAlias
})

const totalNairaBalance = (nairabalance) => ({
    type : Types.TOTAL_NAIRA_BALANCE,
    payload : nairabalance
})

const getUserData = (userData) => ({
    type : Types.GET_USER_DATA,
    payload : userData
})

const walletActions = {
    LoginUser,
    LogoutUser,
    loading,
    getBalance,
    getUserData,
    showMenu,
    totalNairaBalance,
    getUserAlias,
    showDropDown,
    hashBalance,
    kusdBalance,
    kssBalance,
    Types,
}
export default walletActions
export const show_Menu = showMenu 
export const showDropdownfunc = showDropDown
export const accountAddressfunc = userAccountAddress
