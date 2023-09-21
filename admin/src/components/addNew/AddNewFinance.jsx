import axios from 'axios';
import React, { useState } from 'react';
import './AddNew.scss';

const AddNewFinance = ({ setOpen }) => {
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
  const submitNewFinancialExpense = async (e) => {
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
    <div className="add">
      <section className="modal">
        <span onClick={() => setOpen(false)} className="close">
          X
        </span>
        <h3 className="title"> Add New Report </h3>
        <form onSubmit={submitNewFinancialExpense} action="" className="form">

        <div className="input-container">
            <label htmlFor="donation" className="input-label">
              Monthly Donation
            </label>
            <input
              type="number"
              name="donation"
              id="donation"
              value={donation}
              onChange={updateData}
              placeholder="Enter Donation"
              className="input-field"
            />
          </div>
          <div className="input-container">
            <label htmlFor="offer" className="input-label">
              Offer
            </label>
            <input
              type="number"
              name="offer"
              id="offer"
              value={offer}
              onChange={updateData}
              placeholder="Enter Offer"
              className="input-field"
            />
          </div>

          <div className="input-container">
            <label htmlFor="frekdasie" className="input-label">
              Fire Kidasie
            </label>
            <input
              type="number"
              name="frekdasie"
              id="frekdasie"
              value={frekdasie}
              onChange={updateData}
              placeholder="Enter Firekidasie"
              className="input-field"
            />
          </div>

          <div className="input-container">
            <label htmlFor="frekdasie" className="input-label">
              Choir Expense
            </label>
            <input
              type="number"
              name="choirExpense"
              id="choirExpense"
              value={choirExpense}
              onChange={updateData}
              placeholder="Enter Choir Expense"
              className="input-field"
            />
          </div>

          <div className="input-container">
            <label htmlFor="eventExpense" className="input-label">
              Event Expense
            </label>
            <input
              type="number"
              name="eventExpense"
              value={eventExpense}
              onChange={updateData}
              id="eventExpense"
              placeholder="Enter Event Expense"
              className="input-field"
            />
          </div>

          <div className="input-container">
            <label htmlFor="PriestExpense" className="input-label">
              Priest Expense
            </label>
            <input
              type="number"
              name="priestExpense"
              value={priestExpense}
              onChange={updateData}
              id="PriestExpense"
              placeholder="Enter Priest Expense"
              className="input-field"
            />
          </div>

          <div className="input-container">
            <label htmlFor="otherExpense" className="input-label">
              Other Expense
            </label>
            <input
              type="number"
              name="otherExpense"
              value={otherExpense}
              onChange={updateData}
              id="otherExpense"
              placeholder="Other Expense"
              className="input-field"
            />
          </div>

          <div className="input-container">
            <label htmlFor="date" className="input-label">
              Date of Expense
            </label>
            <input
              type="text"
              name="date"
              id="date"
              value={date}
              onChange={updateData}
              placeholder="Date/Month/year"
              className="input-field"
            />
          </div>

          <button className="add-btn"> Submit </button>
        </form>
      </section>
    </div>
  );
};

export default AddNewFinance;
