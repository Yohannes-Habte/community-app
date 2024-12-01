import "./UpdateUserProfile.scss";
import UpdateMemberProfile from "../../forms/updateMemberProfile/UpdateMemberProfile";
import UserChangePassword from "../changePassword/UserChangePassword";
import MonthlyContribution from "../contribution/MonthlyContribution";
import AllUserServices from "../userServices/AllUserServices";
import ServicesRequest from "../servicesRequest/ServiceRequest";
import Addresses from "../addresses/Addresses";

const UpdateUserProfile = ({ isActive, setIsActive }) => {
  return (
    <article className="user-profile-container">
      {isActive === 1 && <UpdateMemberProfile />}

      {isActive === 2 && <Addresses />}

      {isActive === 3 && <UserChangePassword />}

      {isActive === 4 && <MonthlyContribution />}

      {isActive === 5 && <ServicesRequest setIsActive={setIsActive} />}

      {isActive === 6 && <AllUserServices />}
    </article>
  );
};

export default UpdateUserProfile;
