import axios from 'axios';
import React, { useState } from 'react';
import './ExpenseReportForm.scss';
import { FaMoneyBill } from 'react-icons/fa';
import { CgCalendarDates } from 'react-icons/cg';

const ExpenseReportForm = ({ setOpen }) => {
  // Local state variables
  const [offer, setOffer] = useState('');
  const [donation, setDonation] = useState('');
  const [frekdasie, setFrekdasie] = useState('');
  const [choirExpense, setChoirExpense] = useState('');
  const [eventExpense, setEventExpense] = useState('');
  const [priestExpense, setPriestExpense] = useState('');
  const [otherExpense, setOtherExpense] = useState('');
  const [date, setDate] = useState('');

  // Function to update login user data
  const updateData = (event) => {
    switch (event.target.name) {
      case 'offer':
        setOffer(event.target.value);
        break;
      case 'donation':
        setDonation(event.target.value);
        break;
      case 'frekdasie':
        setFrekdasie(event.target.value);
        break;
      case 'choirExpense':
        setChoirExpense(event.target.value);
        break;
      case 'eventExpense':
        setEventExpense(event.target.value);
        break;
      case 'priestExpense':
        setPriestExpense(event.target.value);
        break;
      case 'otherExpense':
        setOtherExpense(event.target.value);
        break;
      case 'date':
        setDate(event.target.value);
        break;
      default:
        break;
    }
  };

  // Reset all state variables for the login form
  const reset = () => {
    setOffer('');
    setDonation('');
    setFrekdasie('');
    setChoirExpense('');
    setEventExpense('');
    setPriestExpense('');
    setOtherExpense('');
    setDate('');
  };

  // Submit new financial expense
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // The body
      const newFinance = {
        donation: donation,
        offer: offer,
        frekdasie: frekdasie,
        choirExpense: choirExpense,
        eventExpense: eventExpense,
        priestExpense: priestExpense,
        otherExpense: otherExpense,
        date: date,
      };

      const { data } = await axios.post(
        'http://localhost:4000/api/finances/new-expense',
        newFinance
      );
      reset();
    } catch (error) {
      console.log(error);
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
            {/* Monthly Donation */}
            <div className="input-container">
              <FaMoneyBill className="input-icon" />
              <input
                type="number"
                name="donation"
                id="donation"
                value={donation}
                onChange={updateData}
                placeholder="Enter Donation"
                className="input-field"
              />

              <label htmlFor="donation" className="input-label">
                Monthly Donation
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
          </div>

          <button className="add-btn"> Submit </button>
        </form>
      </section>
    </div>
  );
};

export default ExpenseReportForm;
