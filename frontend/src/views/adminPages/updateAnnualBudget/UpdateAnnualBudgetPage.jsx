import UpdateAnnualBudget from "../../../components/forms/updateAnnualBudget/UpdateAnnualBudget";
import "./UpdateAnnualBudgetPage.scss";

const UpdateAnnualBudgetPage = () => {
  return (
    <main className="update-annual-budget-page">
      <section  className="update-annual-budget-page-container">
        <h1 className="update-annual-budget-page-title">Update Annual Budget</h1>

        <UpdateAnnualBudget />
      </section>
    </main>
  );
};

export default UpdateAnnualBudgetPage;
