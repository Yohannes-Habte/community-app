import React from 'react';
import "../UserProfilePage.scss"
import UserProfileSidebar from '../../../components/user/userProfileSidebar/UserProfileSidebar';
import UpdateUserProfile from '../../../components/user/updateUserProfile/UpdateUserProfile';


const UserProfilePage = () => {
  return (
    <main className="user-profile-page">
      <section className='user-profile-page-container'>
        <h1 className='user-profile-page-title'>User Profile</h1>
        <div className='user-profile-wrapper'>
          <UserProfileSidebar />
          <UpdateUserProfile />
        </div>
      </section>
    </main>
  );
};

export default UserProfilePage;
