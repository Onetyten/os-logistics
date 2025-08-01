import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer,persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import shipmentReducer from '/utils/state/shipmentSlice/shipmentSlice'
import darkModeReducer from '/utils/state/darkMode/darkModeSlice'
import selectedOrderReducer from '/utils/state/selectedOrder/selectedOrderSlice'
import setAuteScrollReducer from '/utils/state/setAutoScroll/setAutoScrollSlice'




const persistConfig={
    key:'root',
    version:1,
    storage,
    whitelist:['shipment','darkmode','selectedOrder']
}

const reducer = combineReducers({
    shipment:shipmentReducer,
    darkmode:darkModeReducer,
    selectedOrder:selectedOrderReducer,
    setScroll:setAuteScrollReducer
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
