import axios from "axios";
import { useEffect, useState } from "react";
import "./ExpenseReportForm.scss";
import { FaMoneyBill } from "react-icons/fa";
import { CgCalendarDates } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import {
  postFinancialReportFailure,
  postFinancialReportStart,
  postFinancialReportSuccess,
} from "../../../redux/reducers/finance/financeReducer";
import { API } from "../../../utile/security/secreteKey";

const initialState = {
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
};

const ExpenseReportForm = ({ setOpenAddFinancialReport }) => {
  // Global state variables
  const { loading } = useSelector((state) => state.finance);
  const dispatch = useDispatch();

  // Local state variables
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

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

  const updateData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const resetStates = () => {
    setFormData(initialState);
    setErrors({});
    setSuccess("");
  };

  const validateForm = () => {
    const newErrors = {};

    // Date Validation
    if (!date) {
      newErrors.date = "Date is required";
    }

    // Contribution Validation
    if (!contribution) {
      newErrors.contribution = "Contribution is required";
    } else if (contribution < 0) {
      newErrors.contribution = "Contribution cannot be negative";
    }

    // Offer Validation
    if (!offer) {
      newErrors.offer = "Offer is required";
    } else if (offer < 0) {
      newErrors.offer = "Offer cannot be negative";
    }

    // Service Payment Validation
    if (!servicePayment) {
      newErrors.servicePayment = "Service payment is required";
    } else if (servicePayment < 0) {
      newErrors.servicePayment = "Service payment cannot be negative";
    }

    // Frekdasie Validation
    if (!frekdasie) {
      newErrors.frekdasie = "Fire Kidasie is required";
    } else if (frekdasie < 0) {
      newErrors.frekdasie = "Fire Kidasie cannot be negative";
    }

    // Choir Expense Validation
    if (!choirExpense) {
      newErrors.choirExpense = "Choir expense is required";
    } else if (choirExpense < 0) {
      newErrors.choirExpense = "Choir expense cannot be negative";
    }

    // Event Expense Validation
    if (!eventExpense) {
      newErrors.eventExpense = "Event expense is required";
    } else if (eventExpense < 0) {
      newErrors.eventExpense = "Event expense cannot be negative";
    }

    // Priest Expense Validation
    if (!priestExpense) {
      newErrors.priestExpense = "Priest expense is required";
    } else if (priestExpense < 0) {
      newErrors.priestExpense = "Priest expense cannot be negative";
    }

    // Guest Expense Validation
    if (!guestExpense) {
      newErrors.guestExpense = "Guest expense is required";
    } else if (guestExpense < 0) {
      newErrors.guestExpense = "Guest expense cannot be negative";
    }

    // Present Expense Validation
    if (!presentExpense) {
      newErrors.presentExpense = "Present expense is required";
    } else if (presentExpense < 0) {
      newErrors.presentExpense = "Present expense cannot be negative";
    }

    // Trip Expense Validation
    if (!tripExpense) {
      newErrors.tripExpense = "Trip expense is required";
    } else if (tripExpense < 0) {
      newErrors.tripExpense = "Trip expense cannot be negative";
    }

    // Other Expense Validation
    if (!otherExpense) {
      newErrors.otherExpense = "Other expense is required";
    } else if (otherExpense < 0) {
      newErrors.otherExpense = "Other expense cannot be negative";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      dispatch(postFinancialReportStart());

      const newReport = {
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

      const { data } = await axios.post(
        `${API}/reports/new-report`,
        newReport,
        { withCredentials: true }
      );

      dispatch(postFinancialReportSuccess(data.report));
      toast.success(data.success);
      setSuccess("Report added successfully!");
      resetStates();
    } catch (error) {
      dispatch(
        postFinancialReportFailure(
          error.response?.data?.message || "Something went wrong"
        )
      );
      toast.error("Failed to submit report");
    }
  };

  useEffect(() => {
    return () => resetStates();
  }, []);

  return (
    <article className="add-financial-expense-modal">
      <section className="add-financial-expense-popup">
        <span
          onClick={() => setOpenAddFinancialReport(false)}
          className="close"
        >
          X
        </span>
        <h3 className="title"> Add New Monthly Report </h3>
        <form onSubmit={handleSubmit} action="" className="expense-form">
          <div className="inputs-wrapper">
            {/* Date of Expense */}
            <div className="input-container">
              <CgCalendarDates className="input-icon" />

              <input
                type="date"
                name="date"
                id="date"
                value={date}
                onChange={updateData}
                className="input-field"
                aria-label="Date of Expense"
              />

              <label htmlFor="date" className="input-label">
                Date of Expense
              </label>
              <span className="input-highlight"></span>
              {errors.date && (
                <small className="error-text">{errors.date}</small>
              )}
            </div>

            {/* Offers */}
            <div className="input-container">
              <FaMoneyBill className="input-icon" />
              <input
                type="number"
                name="offer"
                id="offer"
                value={offer}
                onChange={updateData}
                placeholder="Enter Offer"
                className="input-field"
                aria-label="Offer"
              />

              <label htmlFor="offer" className="input-label">
                Offer
              </label>
              <span className="input-highlight"></span>
              {errors.offer && (
                <small className="error-text">{errors.offer}</small>
              )}
            </div>

            {/* Monthly Contribution */}
            <div className="input-container">
              <FaMoneyBill className="input-icon" />
              <input
                type="number"
                name="contribution"
                id="contribution"
                value={contribution}
                onChange={updateData}
                placeholder="Monthly Contribution"
                className="input-field"
                aria-label="Monthly Contribution"
              />

              <label htmlFor="contribution" className="input-label">
                Monthly Contribution
              </label>

              <span className="input-highlight"></span>
              {errors.contribution && (
                <small className="error-text">{errors.contribution}</small>
              )}
            </div>

            {/* Fire Kidasie */}
            <div className="input-container">
              <FaMoneyBill className="input-icon" />
              <input
                type="number"
                name="frekdasie"
                id="frekdasie"
                value={frekdasie}
                onChange={updateData}
                placeholder="Enter Firekidasie"
                className="input-field"
                aria-label="Fire Kidasie"
              />

              <label htmlFor="frekdasie" className="input-label">
                Fire Kidasie
              </label>
              <span className="input-highlight"></span>
              {errors.frekdasie && (
                <small className="error-text">{errors.frekdasie}</small>
              )}
            </div>

            {/* Event Expense */}
            <div className="input-container">
              <FaMoneyBill className="input-icon" />
              <input
                type="number"
                name="eventExpense"
                value={eventExpense}
                onChange={updateData}
                id="eventExpense"
                placeholder="Enter Event Expense"
                className="input-field"
                aria-label="Event Expense"
              />

              <label htmlFor="eventExpense" className="input-label">
                Event Expense
              </label>
              <span className="input-highlight"></span>
              {errors.eventExpense && (
                <small className="error-text">{errors.eventExpense}</small>
              )}
            </div>

            {/* Service Payment */}
            <div className="input-container">
              <FaMoneyBill className="input-icon" />
              <input
                type="number"
                name="servicePayment"
                id="servicePayment"
                value={servicePayment}
                onChange={updateData}
                placeholder="Enter service payment"
                className="input-field"
                aria-label="Service Payment"
              />

              <label htmlFor="servicePayment" className="input-label">
                Service Payment
              </label>
              <span className="input-highlight"></span>
              {errors.servicePayment && (
                <small className="error-text">{errors.servicePayment}</small>
              )}
            </div>

            {/* Choir Expense */}
            <div className="input-container">
              <FaMoneyBill className="input-icon" />
              <input
                type="number"
                name="choirExpense"
                id="choirExpense"
                value={choirExpense}
                onChange={updateData}
                placeholder="Enter Choir Expense"
                className="input-field"
                aria-label="Choir Expense"
              />

              <label htmlFor="frekdasie" className="input-label">
                Choir Expense
              </label>
              <span className="input-highlight"></span>
              {errors.choirExpense && (
                <small className="error-text">{errors.choirExpense}</small>
              )}
            </div>

            {/* Priest Expense */}
            <div className="input-container">
              <FaMoneyBill className="input-icon" />
              <input
                type="number"
                name="priestExpense"
                value={priestExpense}
                onChange={updateData}
                id="PriestExpense"
                placeholder="Enter Priest Expense"
                className="input-field"
                aria-label="Priest Expense"
              />

              <label htmlFor="PriestExpense" className="input-label">
                Priest Expense
              </label>
              <span className="input-highlight"></span>
              {errors.priestExpense && (
                <small className="error-text">{errors.priestExpense}</small>
              )}
            </div>

            {/* Guest Expense */}
            <div className="input-container">
              <FaMoneyBill className="input-icon" />
              <input
                type="number"
                name="guestExpense"
                value={guestExpense}
                onChange={updateData}
                id="guestExpense"
                placeholder="Enter Guest Expense"
                className="input-field"
                aria-label="Guest Expense"
              />

              <label htmlFor="guestExpense" className="input-label">
                Guest Expense
              </label>
              <span className="input-highlight"></span>

              {errors.guestExpense && (
                <small className="error-text">{errors.guestExpense}</small>
              )}
            </div>

            {/* Present Expense */}
            <div className="input-container">
              <FaMoneyBill className="input-icon" />
              <input
                type="number"
                name="presentExpense"
                id="presentExpense"
                value={presentExpense}
                onChange={updateData}
                placeholder="Enter Present Expense"
                className="input-field"
                aria-label="Present Expense"
              />

              <label htmlFor="presentExpense" className="input-label">
                Present Expense
              </label>
              <span className="input-highlight"></span>
              {errors.presentExpense && (
                <small className="error-text">{errors.presentExpense}</small>
              )}
            </div>

            {/* Trip Expense */}
            <div className="input-container">
              <FaMoneyBill className="input-icon" />
              <input
                type="number"
                name="tripExpense"
                id="tripExpense"
                value={tripExpense}
                onChange={updateData}
                placeholder="Enter Trip Expense"
                className="input-field"
                aria-label="Trip Expense"
              />

              <label htmlFor="tripExpense" className="input-label">
                Trip Expense
              </label>
              <span className="input-highlight"></span>

              {errors.tripExpense && (
                <small className="error-text">{errors.tripExpense}</small>
              )}
            </div>

            {/* Other Expense */}

            <div className="input-container">
              <FaMoneyBill className="input-icon" />
              <input
                type="number"
                name="otherExpense"
                value={otherExpense}
                onChange={updateData}
                id="otherExpense"
                placeholder="Other Expense"
                className="input-field"
                aria-label="Other Expense"
              />

              <label htmlFor="otherExpense" className="input-label">
                Other Expense
              </label>
              <span className="input-highlight"></span>

              {errors.otherExpense && (
                <small className="error-text">{errors.otherExpense}</small>
              )}
            </div>
          </div>

          <button disabled={loading} className="add-btn">
            {loading ? (
              <ButtonLoader
                isLoading={success}
                message="Loading..."
                size={24}
              />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </section>
    </article>
  );
};

export default ExpenseReportForm;
