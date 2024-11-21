import BudgetForm from "../../forms/annualBudget/BudgetForm";
import "./AnnualBudget.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAnnualBudget,
  fetchAllAnnualBudgets,
} from "../../../redux/actions/annualBudget/annualBudgetAction";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";

const AnnualBudget = () => {
  const dispatch = useDispatch();
  const { error, loading, annualBudgets } = useSelector(
    (state) => state.annualBudget
  );

  // Function to get all annual budgets
  useEffect(() => {
    dispatch(fetchAllAnnualBudgets());
  }, [dispatch]);

  // Delete budget function
  const deleteBudget = async (id) => {
    try {
      await dispatch(deleteAnnualBudget(id));
      dispatch(fetchAllAnnualBudgets());
    } catch (err) {
      alert("Error deleting budget");
    }
  };

  return (
    <section className="annual-budgets-container">
      <BudgetForm />

      <h2 className="annual-budgets-title">Annual Budget</h2>

      {loading ? (
        <PageLoader />
      ) : error ? (
        <Alert security="error">{error}</Alert>
      ) : annualBudgets.length === 0 ? (
        <Alert>No budgets available</Alert>
      ) : (
        <article className="annual-budgets">
          {annualBudgets.map((budget) => (
            <section key={budget._id} className="budget-card">
              <h3 className="budget-year">
                {" "}
                Annual Budget for the Year - {budget.year}
              </h3>

              <div className="items-planned-budget">
                {budget.plannedBudget.map((item) => (
                  <aside key={item._id} className="item-planned-budget">
                    <h4 className="item item-name">{item?.itemName}</h4>
                    <small className="item">Ref: {item.referenceNumber}</small>
                    <small className="item">Unit Cost: €{item.unitCost}</small>
                    <small className="item">Total Size: {item.quantity}</small>
                    <small className="item">
                      Total Cost: €{item.totalCost}
                    </small>
                    <small className="item description">
                      {item.description}
                    </small>
                  </aside>
                ))}
              </div>

              <h4 className="total-annual-budget">
                Total Annual Budget: ${budget.totalAnnualBudget}
              </h4>

              <small className="budget-status">
                Budget Status: {budget.budgetStatus}
              </small>

              <p className="budget-remarks">
                Remarks:{" "}
                {budget.remarks
                  ? budget.remarks
                  : "Remarks will be provided in the near future."}
              </p>

              <div className="buttons-box">
                <Link to={`/budgets/${budget._id}`} className="edit-budget">
                  Edit Budget
                </Link>
                <button
                  onClick={() => deleteBudget(budget._id)}
                  className="delete-budget"
                >
                  Delete Budget
                </button>
              </div>
            </section>
          ))}
        </article>
      )}
    </section>
  );
};

export default AnnualBudget;
