
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userReducer from "@/redux/slices/userSlice.tsx";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    // whitelist: ['user'] // Only store the auth state.
}


const persistedReducers = persistReducer(persistConfig, rootReducer);


const userStore = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })

})


export const persistor = persistStore(userStore);
export default userStore;

export type RootState = ReturnType<typeof userStore.getState>;
export type AppDispatch = typeof userStore.dispatch;
