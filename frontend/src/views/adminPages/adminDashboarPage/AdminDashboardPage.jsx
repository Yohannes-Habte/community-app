import { useState } from "react";
import "./AdminDashboardPage.scss";
import AdminHeader from "../../../components/parishAdmin/layout/adminHeader/AdminHeader";
import AdminSidebar from "../../../components/parishAdmin/layout/adminSidebar/AdminSidebar";
import Footer from "../../../components/layout/footer/Footer";
import AdminDashboardView from "../../../components/parishAdmin/layout/adminDashboardView/AdminDashboardView";

const AdminDashboardPage = () => {
  const [isActive, setIsActive] = useState(1);

  return (
    <main className="admin-dashboard-page">
      <AdminHeader isActive={isActive} setIsActive={setIsActive} />
      <section className="admin-dashboard-page-container">
        <h1 className="admin-dashboard-page-title"> Admin Dashboard </h1>

        <div className="admin-dashboarw-sections-wrapper">
          <AdminSidebar isActive={isActive} setIsActive={setIsActive} />
          <AdminDashboardView isActive={isActive} setIsActive={setIsActive} />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default AdminDashboardPage;
