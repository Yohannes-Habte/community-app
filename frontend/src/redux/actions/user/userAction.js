import axios from "axios";
import {
  requestFailure,
  requestStart,
  requestSuccess,
} from "../../reducers/user/memberReducer";
import { API } from "../../../utiles/securitiy/secreteKey";
import { toast } from "react-toastify";

//==============================================================================
// Register user
//==============================================================================
export const registerUser = (userData) => async (dispatch) => {
  dispatch(requestStart({ type: "register" }));
  try {
    const response = await axios.post(`${API}/members/register`, userData);
    dispatch(
      requestSuccess({
        type: "register",
        data: response.data,
        dataType: "currentUser",
      })
    );
  } catch (error) {
    dispatch(requestFailure({ type: "register", error: error.message }));
  }
};

//==============================================================================
// Login user
//==============================================================================
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(requestStart({ type: "login" }));
  try {
    const { data } = await axios.post(`${API}/auth/login`, credentials);
    dispatch(
      requestSuccess({
        type: "login",
        data: data.user,
        dataType: "currentUser",
      })
    );

    toast.success(data.message);
    window.location.reload();
    localStorage.setItem("user", JSON.stringify(data.user));
  } catch (error) {
    dispatch(requestFailure({ type: "login", error: error.message }));
  }
};
//==============================================================================
// Update User
//==============================================================================
export const updateUser = (user) => async (dispatch) => {
  dispatch(requestStart({ type: "update" }));
  try {
    const response = await axios.put(`${API}/members/${user.id}`, user);
    dispatch(
      requestSuccess({
        type: "update",
        data: response.data,
        dataType: "currentUser",
      })
    );
  } catch (error) {
    dispatch(requestFailure({ type: "updateMember", error: error.message }));
  }
};

//==============================================================================
// Logout User
//==============================================================================

export const logoutUser = () => async (dispatch) => {
  dispatch(requestStart({ type: "logout" }));
  try {
    await axios.get(`${API}/members/logout`);
    dispatch(
      requestSuccess({ type: "logout", data: null, dataType: "currentUser" })
    );
  } catch (error) {
    dispatch(requestFailure({ type: "logout", error: error.message }));
  }
};

//==============================================================================
// Delete User
//==============================================================================
export const deleteUser = (id) => async (dispatch) => {
  dispatch(requestStart({ type: "deleteMember" }));
  try {
    await axios.delete(`${API}/members/address/${id}`);
    dispatch(
      requestSuccess({
        type: "deleteMember",
        data: id,
        dataType: "parishioners",
      })
    );
  } catch (error) {
    dispatch(requestFailure({ type: "deleteMember", error: error.message }));
  }
};

//==============================================================================
// Get all parishioners
//==============================================================================
export const getAllParishioners = () => async (dispatch) => {
  dispatch(requestStart({ type: "members" }));
  try {
    const response = await axios.get(`${API}/members`);
    dispatch(
      requestSuccess({
        type: "members",
        data: response.data.users,
        dataType: "parishioners",
      })
    );
  } catch (error) {
    dispatch(requestFailure({ type: "members", error: error.message }));
  }
};

//==============================================================================
// Change password
//==============================================================================

export const changeUserPassword = (passwordData) => async (dispatch) => {
  dispatch(requestStart({ type: "changePassword" }));
  try {
    const response = await axios.post(
      `${API}/members/change-password`,
      passwordData
    );
    dispatch(
      requestSuccess({
        type: "changePassword",
        data: response.data,
        dataType: "currentUser",
      })
    );
  } catch (error) {
    dispatch(requestFailure({ type: "changePassword", error: error.message }));
  }
};

//==============================================================================
// Add user address
//==============================================================================

export const addUserAddress = (addressData) => async (dispatch) => {
  dispatch(requestStart({ type: "address" }));
  try {
    const response = await axios.post(`${API}/members/address`, addressData);
    dispatch(
      requestSuccess({
        type: "address",
        data: response.data,
        dataType: "currentUser",
      })
    );
  } catch (error) {
    dispatch(requestFailure({ type: "address", error: error.message }));
  }
};

//==============================================================================
// Delete user address
//==============================================================================
export const deleteUserAddress = (addressId) => async (dispatch) => {
  dispatch(requestStart({ type: "deleteAddress" }));
  try {
    await axios.delete(`/api/addresses/${addressId}`);
    dispatch(
      requestSuccess({
        type: "deleteAddress",
        data: addressId,
        dataType: "currentUser",
      })
    );
  } catch (error) {
    dispatch(requestFailure({ type: "deleteAddress", error: error.message }));
  }
};

//==============================================================================
// Count all Users
//==============================================================================
export const countUsers = () => async (dispatch) => {
  dispatch(requestStart({ type: "count" }));
  try {
    const response = await axios.get("/api/users/count");
    dispatch(
      requestSuccess({ type: "count", data: response.data, dataType: "count" })
    );
  } catch (error) {
    dispatch(requestFailure({ type: "count", error: error.message }));
  }
};

// ==============================================================================
// ==============================================================================
// ==============================================================================
/**
// ==============================================================================
// Login component
// ==============================================================================
 
// If a user is logged in, they cannot access the login page
useEffect(() => {
  if (currentUser) {
    navigate("/");
  }
});

// Clear errors when the component mounts
useEffect(() => {
  dispatch(clearErrors());
}, [dispatch]);

const handleSubmit = (e) => {
  e.preventDefault();
  const { email, password } = formData;

  if (!validEmail(email)) {
    return toast.error("Please enter a valid email");
  }

  if (!validPassword(password)) {
    return toast.error(
      "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    );
  }

  dispatch(loginUser({ email, password }));
};

const resetHandler = () => {
  setFormData({
    email: "",
    password: "",
    showPassword: false,
    rememberMe: false,
  });
};

useEffect(() => {
  if (currentUser) {
    toast.success("Login successful!");
    localStorage.setItem("user", JSON.stringify(currentUser));
    resetHandler();
    navigate("/user/profile");
    window.location.reload();
  }
}, [currentUser, navigate]);

useEffect(() => {
  if (error && error.login) {
    toast.error(error.login);
    dispatch(clearErrors());
  }
}, [error, dispatch]);

// change handler
const changeHandler = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData({
    ...formData,
    [name]: type === "checkbox" ? checked : value,
  });
};


// ==============================================================================
// Members component
// ==============================================================================

  const dispatch = useDispatch();
  const parishioners = useSelector((state) => state.member.parishioners);
  const loading = useSelector((state) => state.user.loading.members);
  const error = useSelector((state) => state.user.error.members);

  // Local variables
  const [addUser, setAddUser] = useState(false);

  useEffect(() => {
    dispatch(getAllParishioners());
  }, [dispatch]);

 */
