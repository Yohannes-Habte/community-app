import axios from "axios";
import { useState } from "react";
import "./ExpenseReportForm.scss";
import { FaMoneyBill } from "react-icons/fa";
import { CgCalendarDates } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { API } from "../../../utiles/securitiy/secreteKey";
import ButtonLoader from "../../../utiles/loader/buttonLoader/ButtonLoader";
import {
} from "../../../redux/reducers/financeReducer";
import { postCommitteeFailure, postCommitteeStart, postCommitteeSuccess } from "../../../redux/reducers/committeeReducer";

const ExpenseReportForm = ({ setOpen }) => {
  // Global state variables
  const { loading } = useSelector((state) => state.finance);
  const dispatch = useDispatch();

  // Local state variables
  const [contribution, setContribution] = useState("");
  const [offer, setOffer] = useState("");
  const [servicePayment, setServicePayment] = useState("");
  const [frekdasie, setFrekdasie] = useState("");
  const [choirExpense, setChoirExpense] = useState("");
  const [eventExpense, setEventExpense] = useState("");
  const [priestExpense, setPriestExpense] = useState("");
  const [guestExpense, setGuestExpense] = useState("");
  const [presentExpense, setPresetExpense] = useState("");
  const [tripExpense, setTripExpense] = useState("");
  const [otherExpense, setOtherExpense] = useState("");
  const [date, setDate] = useState("");

  // Function to update login user data
  const updateData = (event) => {
    switch (event.target.name) {
      case "contribution":
        setContribution(event.target.value);
        break;
      case "offer":
        setOffer(event.target.value);
        break;
      case "servicePayment":
        setServicePayment(event.target.value);
        break;
      case "frekdasie":
        setFrekdasie(event.target.value);
        break;
      case "choirExpense":
        setChoirExpense(event.target.value);
        break;
      case "eventExpense":
        setEventExpense(event.target.value);
        break;
      case "priestExpense":
        setPriestExpense(event.target.value);
        break;
      case "guestExpense":
        setGuestExpense(event.target.value);
        break;
      case "presentExpense":
        setPresetExpense(event.target.value);
        break;
      case "tripExpense":
        setTripExpense(event.target.value);
        break;
      case "otherExpense":
        setOtherExpense(event.target.value);
        break;
      case "date":
        setDate(event.target.value);
        break;
      default:
        break;
    }
  };

  // Reset all state variables for the login form
  const reset = () => {
    setContribution("");
    setOffer("");
    setServicePayment("");
    setFrekdasie("");
    setChoirExpense("");
    setEventExpense("");
    setPriestExpense("");
    setGuestExpense("");
    setPresetExpense("");
    setTripExpense("");
    setOtherExpense("");
    setDate("");
  };

  // Submit new financial expense
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(postCommitteeStart());
      // The body
      const newReport = {
        contribution: contribution,
        offer: offer,
        servicePayment: servicePayment,
        frekdasie: frekdasie,
        choirExpense: choirExpense,
        eventExpense: eventExpense,
        priestExpense: priestExpense,
        guestExpense: guestExpense,
        presentExpense: presentExpense,
        tripExpense: tripExpense,
        otherExpense: otherExpense,
        date: date,
      };

      const { data } = await axios.post(`${API}/reports/new-report`, newReport);

      dispatch(postCommitteeSuccess(data.report));
      toast.success(data.success);

      reset();
    } catch (error) {
      dispatch(postCommitteeFailure(error.response.data.message));
    }
  };
  return (
    <div className="add-financial-expense">
      <section className="modal">
        <span onClick={() => setOpen(false)} className="close">
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
              />

              <label htmlFor="date" className="input-label">
                Date of Expense
              </label>
              <span className="input-highlight"></span>
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
              />

              <label htmlFor="offer" className="input-label">
                Offer
              </label>
              <span className="input-highlight"></span>
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
              />

              <label htmlFor="contribution" className="input-label">
                Monthly Contribution
              </label>

              <span className="input-highlight"></span>
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
              />

              <label htmlFor="frekdasie" className="input-label">
                Fire Kidasie
              </label>
              <span className="input-highlight"></span>
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
                onChange={updateData}
                placeholder="Enter service payment"
                className="input-field"
              />

              <label htmlFor="servicePayment" className="input-label">
                Service Payment
              </label>
              <span className="input-highlight"></span>
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
              />

              <label htmlFor="frekdasie" className="input-label">
                Choir Expense
              </label>
              <span className="input-highlight"></span>
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
              />

              <label htmlFor="PriestExpense" className="input-label">
                Priest Expense
              </label>
              <span className="input-highlight"></span>
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
              />

              <label htmlFor="guestExpense" className="input-label">
                Guest Expense
              </label>
              <span className="input-highlight"></span>
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
              />

              <label htmlFor="presentExpense" className="input-label">
                Present Expense
              </label>
              <span className="input-highlight"></span>
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
              />

              <label htmlFor="tripExpense" className="input-label">
                Trip Expense
              </label>
              <span className="input-highlight"></span>
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
              />

              <label htmlFor="otherExpense" className="input-label">
                Other Expense
              </label>
              <span className="input-highlight"></span>
            </div>
          </div>

          <button disabled={loading} className="add-btn">
            {loading ? (
              <span className="loading">
                <ButtonLoader /> Loading...
              </span>
            ) : (
              "Submit"
            )}{" "}
          </button>
        </form>
      </section>
    </div>
  );
};

export default ExpenseReportForm;
