import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './reducers/userReducer';
import sacramentReducer from './reducers/sacramentReducer';
import spiritualReducer from './reducers/spiritualReducer';
import prayerReducer from './reducers/prayerReducer';
import priestReducer from './reducers/priestReducer';
import contributionReducer from './reducers/contributionReducer';
import eventReducer from './reducers/eventReducer';
import committeeReducer from './reducers/committeeReducer';
import financeReducer from './reducers/financeReducer';
import commentReducer from './reducers/commentReducer';

// Store items in the local storage
const rootReducer = combineReducers({
  user: userReducer,
  sacrament: sacramentReducer,
  spiritual: spiritualReducer,
  prayer: prayerReducer,
  priest: priestReducer,
  contributions: contributionReducer,
  event: eventReducer,
  committee: committeeReducer,
  finance: financeReducer,
  comment: commentReducer
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
