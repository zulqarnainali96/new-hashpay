import { configureStore, combineReducers } from '@reduxjs/toolkit'
import walletReducer from './Reducers/reducers'
import Authreducer from './Reducers/authReducer'
import { persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'


const persistConfig = {
  key : "root",
  storage : AsyncStorage,
  blacklist : ['Authreducer']
}

const rootReducers = combineReducers({
  Authreducer,
  walletReducer,

})

const persistedReducers = persistReducer(persistConfig, rootReducers)

const store = configureStore({
  reducer : persistedReducers,
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export default store

export const persistor = persistStore(store)
