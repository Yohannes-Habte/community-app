import React, { useState } from 'react';
import '../UserProfilePage.scss';
import UserProfileSidebar from '../../../components/user/userProfileSidebar/UserProfileSidebar';
import UpdateUserProfile from '../../../components/user/updateUserProfile/UpdateUserProfile';

const UserProfilePage = () => {
  const [isActive, setIsActive] = useState(1);

  
  const [lang, setIsLang] = useState("german");

  
  const userLang= {
    german:{
    profile:"Mitgelied Profiel",
  },
    english:{
      profile:"User Profile",
    }
  }

  return (
    <main className="user-profile-page">
      <section className="user-profile-page-container">
        <h1 className="user-profile-page-title"> {userLang[lang].profile} </h1>
        {/* <h1 className="user-profile-page-title">User Profile</h1> */}
        <div className="user-profile-wrapper">
          <UserProfileSidebar isActive={isActive} setIsActive={setIsActive} />
          <UpdateUserProfile isActive={isActive} />
        </div>
      </section>
    </main>
  );
};

export default UserProfilePage;
