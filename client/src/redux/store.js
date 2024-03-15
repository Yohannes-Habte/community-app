import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './reducers/userReducer';
import sacramentReducer from './reducers/sacramentReducer';
import spiritualReducer from './reducers/spiritualReducer';
import prayerReducer from './reducers/prayerReducer';

// Store items in the local storage
const rootReducer = combineReducers({
  user: userReducer,
  sacrament: sacramentReducer,
  spiritual: spiritualReducer,
  prayer: prayerReducer,
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
