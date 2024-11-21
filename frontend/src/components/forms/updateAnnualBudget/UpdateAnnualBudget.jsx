import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./UpdateAnnualBudget.scss";
import { FaListAlt } from "react-icons/fa";
import { Alert } from "@mui/material";
import {
  fetchSingleAnnualBudget,
  updateAnnualBudget,
} from "../../../redux/actions/annualBudget/annualBudgetAction";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";

const UpdateAnnualBudget = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { error, loading, currentAnnualBudget } = useSelector(
    (state) => state.annualBudget
  );

  const [formData, setFormData] = useState({
    budgetStatus: "",
    remarks: "",
  });

  const { budgetStatus, remarks } = formData;

  // Load the current budget details
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleAnnualBudget(id));
    }
  }, [id, dispatch]);

  // Update formData when currentAnnualBudget is loaded
  useEffect(() => {
    if (currentAnnualBudget) {
      setFormData({
        budgetStatus: currentAnnualBudget.budgetStatus || "",
        remarks: currentAnnualBudget.remarks || "",
      });
    }
  }, [currentAnnualBudget]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = { budgetStatus, remarks };
    dispatch(updateAnnualBudget(id, updatedData));
  };

  return (
    <form onSubmit={handleSubmit} className="update-annual-budget-form">
      <div className="input-container">
        <FaListAlt className="input-icon" />
        <select
          name="budgetStatus"
          id="budgetStatus"
          value={budgetStatus}
          onChange={handleChange}
          aria-label="Budget Status"
          className="input-field"
        >
          <option value="" disabled>
            Select Budget Status
          </option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <label htmlFor="budgetStatus" className="input-label">
          Budget Status
        </label>
        <span className="input-highlight"></span>
      </div>

      <div className="input-container">
        <FaListAlt className="input-icon" />
        <textarea
          name="remarks"
          id="remarks"
          value={remarks}
          rows={8}
          cols={20}
          onChange={handleChange}
          placeholder="Enter remarks"
          aria-label="Remarks"
          className="input-field"
        ></textarea>
        <label htmlFor="remarks" className="input-label">
          Remarks
        </label>
        <span className="input-highlight"></span>
      </div>
      {error && <Alert severity="error">{error}</Alert>}

      <button
        type="submit"
        disabled={loading}
        className="update-annual-budget-form-btn"
      >
        {loading ? <ButtonLoader isLoading={loading} /> : "Update Budget"}
      </button>
    </form>
  );
};

export default UpdateAnnualBudget;
