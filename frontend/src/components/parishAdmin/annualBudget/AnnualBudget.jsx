import axios from "axios";
import BudgetForm from "../../forms/annualBudget/BudgetForm";
import "./AnnualBudget.scss";
import { API } from "../../../utile/security/secreteKey";
import { useEffect, useState } from "react";

const AnnualBudget = () => {
  const [budgets, setBudgets] = useState([]);

  // Function to get all annual budgets
  useEffect(() => {
    const getAnnualBudgets = async () => {
      try {
        const response = await axios.get(`${API}/budgets`);
        setBudgets(response.data.result);
      } catch (error) {
        console.error("Error fetching budgets", error);
      }
    };

    getAnnualBudgets();
  }, []);

  return (
    <section className="annual-budgets-container">
      <BudgetForm />

      <h2 className="annual-budgets-title">Annual Budget</h2>

      {budgets.length > 0 ? (
        <article className="annual-budgets">
          {budgets.map((budget) => (
            <section key={budget._id} className="budget-card">
              <h3 className="budget-year">Year: {budget.year}</h3>

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
              <p className="budget-remarks">Remarks: {budget.remarks}</p>

              {/* Embedding the PDF document for Dioceses Confirmation */}
              <div className="budget-approval-confirmation-wrapper">
                <p className="budget-approval-confirmation-label">
                  Dioceses Budget Approval Confirmation:
                </p>
                {budget.diocesesConfirmation ? (
                  <>
                    {/* Embed the PDF */}
                    <iframe
                      src={`${budget.diocesesConfirmation}#toolbar=0`}
                      width="100%"
                      height="500px"
                      title={`Confirmation-${budget.year}`}
                    >
                      Your browser does not support PDF embedding.
                    </iframe>

                    {/* Fallback download link */}
                    <p>
                      If the PDF is not displayed, you can{" "}
                      <a
                        href={budget.diocesesConfirmation}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        download it here
                      </a>
                      .
                    </p>
                  </>
                ) : (
                  <p>No confirmation document available.</p>
                )}
              </div>
            </section>
          ))}
        </article>
      ) : (
        "No budgets available"
      )}
    </section>
  );
};

export default AnnualBudget;
