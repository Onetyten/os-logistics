import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer,persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import shipmentReducer from '/utils/state/shipmentSlice/shipmentSlice'
import darkModeReducer from '/utils/state/darkMode/darkModeSlice'
import selectedOrderReducer from '/utils/state/selectedOrder/selectedOrderSlice'




const persistConfig={
    key:'root',
    version:1,
    storage,
    whitelist:['darkmode','selectedOrder']
}

const reducer = combineReducers({
    shipment:shipmentReducer,
    darkmode:darkModeReducer,
    selectedOrder:selectedOrderReducer
})

const persistedReducer = persistReducer(persistConfig,reducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
