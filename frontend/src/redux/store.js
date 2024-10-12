import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import eventReducer from "./reducers/eventReducer";
import committeeReducer from "./reducers/committeeReducer";
import commentReducer from "./reducers/commentReducer";
import memberReducer from "./reducers/user/memberReducer";
import serviceReducer from "./reducers/service/serviceReducer";
import categoryReducer from "./reducers/serviceCategory/categoryReducer";
import delegationReducer from "./reducers/delegation/delegationReducer";
import financeReducer from "./reducers/finance/financeReducer";
import contributionReducer from "./reducers/contribution/contributionReducer";

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
