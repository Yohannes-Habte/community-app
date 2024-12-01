import { useState } from "react";
import "./UserProfilePage.scss";
import UserProfileSidebar from "../../components/user/userProfileSidebar/UserProfileSidebar";
import UpdateUserProfile from "../../components/user/updateUserProfile/UpdateUserProfile";
import Footer from "../../components/layout/footer/Footer";

const UserProfilePage = () => {
  const [isActive, setIsActive] = useState(1);

  return (
    <main className="user-profile-page">
      <section className="user-profile-page-container">
        <h1 className="user-profile-page-title"> User profile </h1>

        <div className="user-profile-wrapper">
          <UserProfileSidebar isActive={isActive} setIsActive={setIsActive} />
          <UpdateUserProfile isActive={isActive} setIsActive={setIsActive} />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default UserProfilePage;
