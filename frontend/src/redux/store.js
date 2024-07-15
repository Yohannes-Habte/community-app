import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import priestReducer from "./reducers/priestReducer";
import contributionReducer from "./reducers/contributionReducer";
import eventReducer from "./reducers/eventReducer";
import committeeReducer from "./reducers/committeeReducer";
import financeReducer from "./reducers/financeReducer";
import commentReducer from "./reducers/commentReducer";
import memberReducer from "./reducers/user/memberReducer";
import serviceReducer from "./reducers/service/serviceReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    member: memberReducer,
    priest: priestReducer,
    contributions: contributionReducer,
    event: eventReducer,
    committee: committeeReducer,
    finance: financeReducer,
    comment: commentReducer,
    service: serviceReducer,
  },
});

export default Store;
