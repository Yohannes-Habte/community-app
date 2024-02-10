import React from 'react'
import UserProfileSidebar from '../../../components/user/userProfileSidebar/UserProfileSidebar'
import AllUserServices from '../../../components/user/userServices/AllUserServices'

const AllUserServicespage = () => {
  return (
    <main className="user-profile-page">
    <section className="user-profile-page-container">
      <h1 className="user-profile-page-title">User Profile</h1>
      <div className="user-profile-wrapper">
        <UserProfileSidebar />
        <AllUserServices />
      </div>
    </section>
  </main>
  )
}

export default AllUserServicespage