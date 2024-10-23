import UpdateFinancialReport from "../../../components/forms/updateFinancialReport/UpdateFinancialReport";
import "./UpdateFinancialReportPage.scss";

const UpdateFinancialReportPage = () => {
  return (
    <main className="update-financial-report-page">
      <section className="update-financial-report-page-container">
        <h1 className="update-financial-report-page-title">
          {" "}
          Update Financial Report
        </h1>

        <UpdateFinancialReport />
      </section>
    </main>
  );
};

export default UpdateFinancialReportPage;
