import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import Toggle from "./Toggle";

// Combine reducers
const rootReducer = combineReducers({
    user: UserSlice,
    toggle: Toggle,
    // Add other slices here if needed
});

// Configure and export the store
export const store = configureStore({
    reducer: rootReducer,
    // Add any necessary middleware here
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [],
            },
        }),
});

export default store;
