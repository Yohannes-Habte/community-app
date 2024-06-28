import React from "react";
import "../UserProfilePage.scss";
import UserInbox from "../../../components/user/inbox/UserInbox";
import UserProfileSidebar from "../../../components/user/userProfileSidebar/UserProfileSidebar";

const UserInboxPage = () => {
  return (
    <main className="user-profile-page">
      <section className="user-profile-page-container">
        <h1 className="user-profile-page-title">User Profile</h1>
        <div className="user-profile-wrapper">
          <UserProfileSidebar />
          <UserInbox />
        </div>
      </section>
    </main>
  );
};

export default UserInboxPage;
