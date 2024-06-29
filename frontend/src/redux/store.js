import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import sacramentReducer from "./reducers/sacramentReducer";
import spiritualReducer from "./reducers/spiritualReducer";
import prayerReducer from "./reducers/prayerReducer";
import priestReducer from "./reducers/priestReducer";
import contributionReducer from "./reducers/contributionReducer";
import eventReducer from "./reducers/eventReducer";
import committeeReducer from "./reducers/committeeReducer";
import financeReducer from "./reducers/financeReducer";
import commentReducer from "./reducers/commentReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    sacrament: sacramentReducer,
    spiritual: spiritualReducer,
    prayer: prayerReducer,
    priest: priestReducer,
    contributions: contributionReducer,
    event: eventReducer,
    committee: committeeReducer,
    finance: financeReducer,
    comment: commentReducer,
  },
});

export default Store;
