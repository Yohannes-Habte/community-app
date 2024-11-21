import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import memberReducer from "./reducers/user/memberReducer";
import serviceReducer from "./reducers/service/serviceReducer";
import categoryReducer from "./reducers/serviceCategory/categoryReducer";
import delegationReducer from "./reducers/delegation/delegationReducer";
import financeReducer from "./reducers/finance/financeReducer";
import contributionReducer from "./reducers/contribution/contributionReducer";
import committeeReducer from "./reducers/committee/committeeReducer";
import eventReducer from "./reducers/event/eventReducer";
import commentReducer from "./reducers/comment/commentReducer";
import annualBudgetSlice from "./reducers/annualBudget/annualBudgetReducer";

// Store items in the local storage
const rootReducer = combineReducers({
  member: memberReducer,
  priest: delegationReducer,
  contributions: contributionReducer,
  event: eventReducer,
  committee: committeeReducer,
  comment: commentReducer,
  service: serviceReducer,
  category: categoryReducer,
  finance: financeReducer,
  annualBudget: annualBudgetSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Create a Persist Reducer variable
const persistedReducer = persistReducer(persistConfig, rootReducer);

// create Sore variable
export const Store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export persistor
export const persistor = persistStore(Store);

// const Store = configureStore({
//   reducer: {
//     member: memberReducer,
//     priest: delegationReducer,
//     contributions: contributionReducer,
//     event: eventReducer,
//     committee: committeeReducer,
//     comment: commentReducer,
//     service: serviceReducer,
//     category: categoryReducer,
//     finance: financeReducer,
//   },
// });

// export default Store;

