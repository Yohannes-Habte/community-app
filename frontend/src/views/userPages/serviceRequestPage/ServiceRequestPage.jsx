import UserProfileSidebar from "../../../components/user/userProfileSidebar/UserProfileSidebar";
import ServiceRequest from "../../../components/user/serviceRequest/ServiceRequest";

const ServiceRequestPage = () => {
  return (
    <main className="user-profile-page">
      <section className="user-profile-page-container">
        <h1 className="user-profile-page-title">User Profile</h1>
        <div className="user-profile-wrapper">
          <UserProfileSidebar />
          <ServiceRequest />
        </div>
      </section>
    </main>
  );
};

export default ServiceRequestPage;
