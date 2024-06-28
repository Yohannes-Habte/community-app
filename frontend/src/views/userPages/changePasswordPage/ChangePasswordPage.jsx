import React from 'react'
import "../UserProfilePage.scss"
import UserProfileSidebar from '../../../components/user/userProfileSidebar/UserProfileSidebar'
import UserChangePassword from '../../../components/user/changePassword/UserChangePassword'

const ChangePasswordPage = () => {
  return (
    <main className="user-profile-page">
      <section className="user-profile-page-container">
        <h1 className="user-profile-page-title">User Profile</h1>
        <div className="user-profile-wrapper">
          <UserProfileSidebar />
          <UserChangePassword />
        </div>
      </section>
    </main>
  )
}

export default ChangePasswordPage