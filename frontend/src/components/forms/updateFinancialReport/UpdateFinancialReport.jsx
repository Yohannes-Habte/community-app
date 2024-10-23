import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { API } from "../../../utile/security/secreteKey";
import { toast } from "react-toastify";
import {
  fetchFinancialReportFailure,
  fetchFinancialReportStart,
  fetchFinancialReportSuccess,
  updateFinancialReportFailure,
  updateFinancialReportStart,
  updateFinancialReportSuccess,
} from "../../../redux/reducers/finance/financeReducer";
import axios from "axios";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import { FaMoneyBill } from "react-icons/fa";
import { CgCalendarDates } from "react-icons/cg";
import { useParams } from "react-router-dom";
import { Alert } from "@mui/material";
import "./UpdateFinancialReport.scss";

const UpdateFinancialReport = () => {
  const { id } = useParams();
  // Global state variables
  const { currentReport, loading, error } = useSelector(
    (state) => state.finance
  );
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    contribution: currentReport?.contribution || "",
    offer: currentReport?.offer || "",
    servicePayment: currentReport?.servicePayment || "",
    frekdasie: currentReport?.frekdasie || "",
    choirExpense: currentReport?.choirExpense || "",
    eventExpense: currentReport?.eventExpense || "",
    priestExpense: currentReport?.priestExpense || "",
    guestExpense: currentReport?.guestExpense || "",
    presentExpense: currentReport?.presentExpense || "",
    tripExpense: currentReport?.tripExpense || "",
    otherExpense: currentReport?.otherExpense || "",
    date: currentReport?.date || "",
  });
  console.log("Current Report :", formData);
  const {
    contribution,
    offer,
    servicePayment,
    frekdasie,
    choirExpense,
    eventExpense,
    priestExpense,
    guestExpense,
    presentExpense,
    tripExpense,
    otherExpense,
    date,
  } = formData;

  // Fetch the report to be updated
  useEffect(() => {
    const fetchFinancialReport = async () => {
      try {
        dispatch(fetchFinancialReportStart());
        const { data } = await axios.get(`${API}/reports/finances/${id}`, {
          withCredentials: true,
        });

        dispatch(fetchFinancialReportSuccess(setFormData(data.result)));
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch report";

        dispatch(fetchFinancialReportFailure(errorMessage));
        toast.error(errorMessage);
      }
    };

    fetchFinancialReport();
  }, []);

  // Update form data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form data

  const resetStates = () => {
    setFormData({
      contribution: "",
      offer: "",
      servicePayment: "",
      frekdasie: "",
      choirExpense: "",
      eventExpense: "",
      priestExpense: "",
      guestExpense: "",
      presentExpense: "",
      tripExpense: "",
      otherExpense: "",
      date: "",
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateFinancialReportStart());

      const updateReport = {
        contribution,
        offer,
        servicePayment,
        frekdasie,
        choirExpense,
        eventExpense,
        priestExpense,
        guestExpense,
        presentExpense,
        tripExpense,
        otherExpense,
        date,
      };

      const { data } = await axios.put(
        `${API}/reports/finances/${id}`,
        updateReport,
        {
          withCredentials: true,
        }
      );

      dispatch(updateFinancialReportSuccess(data.result));

      toast.success(data.message);
      resetStates();
    } catch (error) {
      dispatch(
        updateFinancialReportFailure(
          error.response?.data?.message || "Something went wrong"
        )
      );
      toast.error("Failed to submit report");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="update-financial-report-form">
      <div className="inputs-wrapper">
        {/* Date of Expense */}
        <div className="input-container">
          <CgCalendarDates className="input-icon" />

          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={handleChange}
            className="input-field"
            aria-label="Date of Expense"
          />

          <label htmlFor="date" className="input-label">
            Date of Expense
          </label>
        </div>

        {/* Offers */}
        <div className="input-container">
          <FaMoneyBill className="input-icon" />
          <input
            type="number"
            name="offer"
            id="offer"
            value={offer}
            onChange={handleChange}
            placeholder="Enter Offer"
            className="input-field"
            aria-label="Offer"
          />

          <label htmlFor="offer" className="input-label">
            Offer
          </label>
        </div>

        {/* Monthly Contribution */}
        <div className="input-container">
          <FaMoneyBill className="input-icon" />
          <input
            type="number"
            name="contribution"
            id="contribution"
            value={contribution}
            onChange={handleChange}
            placeholder="Monthly Contribution"
            className="input-field"
            aria-label="Monthly Contribution"
          />

          <label htmlFor="contribution" className="input-label">
            Monthly Contribution
          </label>
        </div>

        {/* Fire Kidasie */}
        <div className="input-container">
          <FaMoneyBill className="input-icon" />
          <input
            type="number"
            name="frekdasie"
            id="frekdasie"
            value={frekdasie}
            onChange={handleChange}
            placeholder="Enter Firekidasie"
            className="input-field"
            aria-label="Fire Kidasie"
          />

          <label htmlFor="frekdasie" className="input-label">
            Fire Kidasie
          </label>
        </div>

        {/* Event Expense */}
        <div className="input-container">
          <FaMoneyBill className="input-icon" />
          <input
            type="number"
            name="eventExpense"
            value={eventExpense}
            onChange={handleChange}
            id="eventExpense"
            placeholder="Enter Event Expense"
            className="input-field"
            aria-label="Event Expense"
          />

          <label htmlFor="eventExpense" className="input-label">
            Event Expense
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Service Payment */}
        <div className="input-container">
          <FaMoneyBill className="input-icon" />
          <input
            type="number"
            name="servicePayment"
            id="servicePayment"
            value={servicePayment}
            onChange={handleChange}
            placeholder="Enter service payment"
            className="input-field"
            aria-label="Service Payment"
          />

          <label htmlFor="servicePayment" className="input-label">
            Service Payment
          </label>
        </div>

        {/* Choir Expense */}
        <div className="input-container">
          <FaMoneyBill className="input-icon" />
          <input
            type="number"
            name="choirExpense"
            id="choirExpense"
            value={choirExpense}
            onChange={handleChange}
            placeholder="Enter Choir Expense"
            className="input-field"
            aria-label="Choir Expense"
          />

          <label htmlFor="frekdasie" className="input-label">
            Choir Expense
          </label>
        </div>

        {/* Priest Expense */}
        <div className="input-container">
          <FaMoneyBill className="input-icon" />
          <input
            type="number"
            name="priestExpense"
            value={priestExpense}
            onChange={handleChange}
            id="PriestExpense"
            placeholder="Enter Priest Expense"
            className="input-field"
            aria-label="Priest Expense"
          />

          <label htmlFor="PriestExpense" className="input-label">
            Priest Expense
          </label>
        </div>

        {/* Guest Expense */}
        <div className="input-container">
          <FaMoneyBill className="input-icon" />
          <input
            type="number"
            name="guestExpense"
            value={guestExpense}
            onChange={handleChange}
            id="guestExpense"
            placeholder="Enter Guest Expense"
            className="input-field"
            aria-label="Guest Expense"
          />

          <label htmlFor="guestExpense" className="input-label">
            Guest Expense
          </label>
        </div>

        {/* Present Expense */}
        <div className="input-container">
          <FaMoneyBill className="input-icon" />
          <input
            type="number"
            name="presentExpense"
            id="presentExpense"
            value={presentExpense}
            onChange={handleChange}
            placeholder="Enter Present Expense"
            className="input-field"
            aria-label="Present Expense"
          />

          <label htmlFor="presentExpense" className="input-label">
            Present Expense
          </label>
        </div>

        {/* Trip Expense */}
        <div className="input-container">
          <FaMoneyBill className="input-icon" />
          <input
            type="number"
            name="tripExpense"
            id="tripExpense"
            value={tripExpense}
            onChange={handleChange}
            placeholder="Enter Trip Expense"
            className="input-field"
            aria-label="Trip Expense"
          />

          <label htmlFor="tripExpense" className="input-label">
            Trip Expense
          </label>
        </div>

        {/* Other Expense */}

        <div className="input-container">
          <FaMoneyBill className="input-icon" />
          <input
            type="number"
            name="otherExpense"
            value={otherExpense}
            onChange={handleChange}
            id="otherExpense"
            placeholder="Other Expense"
            className="input-field"
            aria-label="Other Expense"
          />

          <label htmlFor="otherExpense" className="input-label">
            Other Expense
          </label>
        </div>
      </div>

      <button disabled={loading} className="add-btn">
        {loading ? (
          <ButtonLoader isLoading={loading} message="Loading..." size={24} />
        ) : (
          "Submit"
        )}
      </button>

      {error && (
        <Alert security="error" className="message-error">
          {error}
        </Alert>
      )}
    </form>
  );
};

export default UpdateFinancialReport;
