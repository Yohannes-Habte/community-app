import React from 'react';
import '../UserProfilePage.scss';
import UserProfileSidebar from '../../../components/user/userProfileSidebar/UserProfileSidebar';
import MonthlyContribution from '../../../components/user/contribution/MonthlyContribution';

const ContributionPage = () => {
  return (
    <main className="user-profile-page">
      <section className="user-profile-page-container">
        <h1 className="user-profile-page-title">User Profile</h1>
        <div className="user-profile-wrapper">
          <UserProfileSidebar />
          <MonthlyContribution />
        </div>
      </section>
    </main>
  );
};

export default ContributionPage;
