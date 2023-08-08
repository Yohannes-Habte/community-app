export const ACTION = {
  // User
  USER_REGISTER_START: 'USER_REGISTER_START',
  USER_REGISTER_SUCCESS: 'USER_REGISTER_SUCCESS',
  USER_REGISTER_FAIL: 'USER_REGISTER_FAIL',

  USER_SIGNIN_START: 'USER_SIGNIN_START',
  USER_SIGNIN_SUCCESS: 'USER_SIGNIN_SUCCESS',
  USER_SIGNIN_FAIL: 'USER_SIGNIN_FAIL',

  USER_LOG_OUT: 'USER_LOG_OUT',

  // Sacraments
  SACRMENT_SEND_START: 'SACRMENT_SEND_START',
  SACRMENT_SEND_SUCCESS: 'SACRMENT_SEND_SUCCESS',
  SACRMENT_SEND_FAIL: 'SACRMENT_SEND_FAIL',

  // Prayer
  PRAYER_SEND_START: 'PRAYER_SEND_START',
  PRAYER_SEND_SUCCESS: 'PRAYER_SEND_SUCCESS',
  PRAYER_SEND_FAIL: 'PRAYER_SEND_FAIL',

  // Spiritual
  SPIRITUAL_SEND_START: 'SPIRITUAL_SEND_START',
  SPIRITUAL_SEND_SUCCESS: 'SPIRITUAL_SEND_SUCCESS',
  SPIRITUAL_SEND_FAIL: 'SPIRITUAL_SEND_FAIL',

  // Comment
  COMMENT_SEND_START: 'COMMENT_SEND_START',
  COMMENT_SEND_SUCCESS: 'COMMENT_SEND_SUCCESS',
  COMMENT_SEND_FAIL: 'COMMENT_SEND_FAIL',
};
const UserReducer = (state, action) => {
  switch (action.type) {
    // User Register
    case ACTION.USER_REGISTER_START:
      return { ...state, loading: true, error: '' };
    case ACTION.USER_REGISTER_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: '' };
    case ACTION.USER_REGISTER_FAIL:
      return { ...state, error: action.payload, loading: false };

    case ACTION.USER_SIGNIN:
      return { ...state, user: action.payload };

    // User Sigin
    case ACTION.USER_SIGNIN_START:
      return { ...state, loading: true, error: '' };
    case ACTION.USER_SIGNIN_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: '' };
    case ACTION.USER_SIGNIN_FAIL:
      return { ...state, error: action.payload, loading: false };

    // User Logout
    case ACTION.USER_LOG_OUT:
      return { ...state, user: null };

    // Sacrament
    case ACTION.SACRMENT_SEND_START:
      return { ...state, loading: true, error: '' };

    case ACTION.SACRMENT_SEND_SUCCESS:
      return { ...state, sacrament: action.payload, loading: false, error: '' };

    case ACTION.SACRMENT_SEND_FAIL:
      return { ...state, error: action.payload, loading: false };

    // Prayer
    case ACTION.PRAYER_SEND_START:
      return { ...state, loading: true, error: '' };

    case ACTION.PRAYER_SEND_SUCCESS:
      return { ...state, prayer: action.payload, loading: false, error: '' };

    case ACTION.PRAYER_SEND_FAIL:
      return { ...state, error: action.payload, loading: false };

    // Spiritual
    case ACTION.SPIRITUAL_SEND_START:
      return { ...state, loading: true, error: '' };

    case ACTION.SPIRITUAL_SEND_SUCCESS:
      return { ...state, spiritual: action.payload, loading: false, error: '' };

    case ACTION.SPIRITUAL_SEND_FAIL:
      return { ...state, error: action.payload, loading: false };

    // Comment
    case ACTION.COMMENT_SEND_START:
      return { ...state, loading: true, error: '' };

    case ACTION.COMMENT_SEND_SUCCESS:
      return { ...state, comment: action.payload, loading: false, error: '' };

    case ACTION.COMMENT_SEND_FAIL:
      return { ...state, error: action.payload, loading: false };

    // Defaul
    default:
      return state;
  }
};

export default UserReducer;
