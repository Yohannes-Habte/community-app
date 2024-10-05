import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import contributionReducer from "./reducers/contributionReducer";
import eventReducer from "./reducers/eventReducer";
import committeeReducer from "./reducers/committeeReducer";
import commentReducer from "./reducers/commentReducer";
import memberReducer from "./reducers/user/memberReducer";
import serviceReducer from "./reducers/service/serviceReducer";
import categoryReducer from "./reducers/serviceCategory/categoryReducer";
import delegationReducer from "./reducers/delegation/delegationReducer";
import financeReducer from "./reducers/finance/financeReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    member: memberReducer,
    priest: delegationReducer,
    contributions: contributionReducer,
    event: eventReducer,
    committee: committeeReducer,
    comment: commentReducer,
    service: serviceReducer,
    category: categoryReducer,
    finance: financeReducer,
  },
});

export default Store;
