import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import contributionReducer from "./reducers/contributionReducer";
import eventReducer from "./reducers/eventReducer";
import committeeReducer from "./reducers/committeeReducer";
import financeReducer from "./reducers/financeReducer";
import commentReducer from "./reducers/commentReducer";
import memberReducer from "./reducers/user/memberReducer";
import serviceReducer from "./reducers/service/serviceReducer";
import categoryReducer from "./reducers/serviceCategory/categoryReducer";
import delegationReducer from "./reducers/delegation/delegationReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    member: memberReducer,
    priest: delegationReducer,
    contributions: contributionReducer,
    event: eventReducer,
    committee: committeeReducer,
    finance: financeReducer,
    comment: commentReducer,
    service: serviceReducer,
    category: categoryReducer,
  },
});

export default Store;
