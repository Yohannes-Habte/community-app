import UpdateCommitteeMember from "../../../components/forms/updateCommittee/UpdateCommitteeMember";
import Footer from "../../../components/layout/footer/Footer";
import Header from "../../../components/layout/header/Header";
import "./UpdateCommitteeProfilePage.scss";
const UpdateCommitteeProfilePage = () => {
  return (
    <main className="update-committee-profile-page">
      <Header />
      <section className="update-committee-profile-page-container">
        <h3 className="update-committee-profile-page-title">
          Update Committee Member Profile
        </h3>

        <UpdateCommitteeMember />
      </section>

      <Footer />
    </main>
  );
};

export default UpdateCommitteeProfilePage;
