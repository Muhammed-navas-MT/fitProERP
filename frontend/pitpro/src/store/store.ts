import { combineReducers,configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./slice/tokenSlice";
import superAdminSlice from "./slice/superAdminSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer,persistStore,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from "redux-persist"


const persistConfig = {
    key:"root",
    storage,
    whitelist:["token","superAdminData"]
};

const rootReducer = combineReducers({
    token:tokenSlice,
    superAdminData:superAdminSlice,
});

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
            },
        })
});

export const persistor  = persistStore(store);

export type rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
