import "./UpdateUserProfile.scss";
import UpdateMemberProfile from "../../forms/updateMemberProfile/UpdateMemberProfile";
import UserAddress from "../address/UserAddress";
import UserChangePassword from "../changePassword/UserChangePassword";
import MonthlyContribution from "../contribution/MonthlyContribution";
import AllUserServices from "../userServices/AllUserServices";
import ServicesRequest from "../servicesRequest/ServiceRequest";


const UpdateUserProfile = ({ isActive }) => {
  return (
    <article className="user-profile-container">
      {isActive === 1 && <UpdateMemberProfile />}

      {isActive === 2 && <UserAddress />}

      {isActive === 3 && <UserChangePassword />}

      {isActive === 4 && <MonthlyContribution />}

      {isActive === 5 && <ServicesRequest />}

      {isActive === 6 && <AllUserServices />}
    </article>
  );
};

export default UpdateUserProfile;
