import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';

import appReducer from "./appReducer";
import userReducer from "./userReducer";
import adminReducer from './adminReducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist';
/**
 * Tại sao không lưu biến vào localstorage thay vì đó là redux
 *  Khi localstorage thay đổi thì các biến state trong các component đó ko đc update lại
 *  khi dùng redux thì khi có sự thay đổi các biến trong component thì update lại biến trong redux -->Lưu vào LocalStorage
 *  */ 

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['isLoggedIn', 'userInfo']
};
 
const appPersistConfig = {
    ...persistCommonConfig,
    key: 'app',
    whitelist: ['language']
  }

export default (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer),
    admin: adminReducer,
})