import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  parishioners: [],
  count: null,

  // Loading states
  loading: {
    register: false,
    login: false,
    update: false,
    logout: false,
    changePassword: false,
    address: false,
    deleteAddress: false,
    members: false,
    count: false,
  },

  // Error states
  error: {
    register: null,
    login: null,
    update: null,
    logout: null,
    changePassword: null,
    address: null,
    deleteAddress: null,
    members: null,
    count: null,
  },
};

const setLoading = (state, action) => {
  state.loading[action.payload] = true;
  state.error[action.payload] = null;
};

const setSuccess = (state, action) => {
  if (action.payload.dataType) {
    state[action.payload.dataType] = action.payload.data;
  }
  state.loading[action.payload.type] = false;
  state.error[action.payload.type] = null;
};

const setFailure = (state, action) => {
  state.error[action.payload.type] = action.payload.error;
  state.loading[action.payload.type] = false;
};

const userReducer = createSlice({
  name: "member",
  initialState,
  reducers: {
    // Generic start
    requestStart: (state, action) => setLoading(state, action),

    // Generic success
    requestSuccess: (state, action) => setSuccess(state, action),

    // Generic failure
    requestFailure: (state, action) => setFailure(state, action),

    // Clear errors
    clearErrors: (state) => {
      Object.keys(state.error).forEach((key) => {
        state.error[key] = null;
      });
    },
  },
});

export const { requestStart, requestSuccess, requestFailure, clearErrors } =
  userReducer.actions;

export default userReducer.reducer;
