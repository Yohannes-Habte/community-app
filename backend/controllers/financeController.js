import createError from 'http-errors';
import Finance from '../models/financeModel.js';

//=======================================================
// Post new finance report
//=======================================================

export const createExpense = async (req, res, next) => {
  const {
    offer,
    donation,
    frekdasie,
    choirExpense,
    eventExpense,
    priestExpense,
    otherExpense,
    date,
  } = req.body;

  let existingFinanceReport;

  try {
    existingFinanceReport = await Finance.findOne({ date: date });
  } catch (error) {
    console.log(error);
    return next(createError(500, 'Server error. Please try again.'));
  }

  // If finance report is found, return error
  if (existingFinanceReport)
    return next(
      createError(400, 'Finance report already exists. Please try again.')
    );

  // If finance report is not found, create new finance report
  if (!existingFinanceReport) {
    const newFinanceReport = new Finance({
      offer: offer,
      donation: donation,
      frekdasie: frekdasie,
      choirExpense: choirExpense,
      eventExpense: eventExpense,
      priestExpense: priestExpense,
      otherExpense: otherExpense,
      date: date,
      total:
        Number(offer) +
        Number(donation) -
        (Number(frekdasie) +
          Number(choirExpense) +
          Number(eventExpense) +
          Number(priestExpense) +
          Number(otherExpense)),
    });

    try {
      await newFinanceReport.save();
    } catch (err) {
      console.log(err);
      return next(createError(500, 'Server error. Please try again.'));
    }

    res.status(201).json(newFinanceReport);
  }
};

//==========================================================================
// Update Finance
//==========================================================================
export const updateFinance = async (req, res, next) => {
  try {
    const finance = await Finance.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    return res.status(200).json(finance);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'The finance could not be updated! Please try again')
    );
  }
};

//==========================================================================
// Get Finance
//==========================================================================
export const getFinance = async (req, res, next) => {
  try {
    const finance = await Finance.findById(req.params.id);
    return res.status(200).json(finance);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'The finance could not be accessed! Please try again')
    );
  }
};

//==========================================================================
// Delete Finance
//==========================================================================
export const deleteFinance = async (req, res, next) => {
  try {
    await Finance.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json(`The financial details have been successfully deleted.`);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'The sacrament could not be deleted! Please try again')
    );
  }
};

//==========================================================================
// Get all Finances
//==========================================================================
export const getAllFinance = async (req, res, next) => {
  try {
    const finance = await Finance.find();
    return res.status(200).json(finance);
  } catch (error) {
    console.log(error);
    return next(
      createError(
        400,
        'The monthly financial reports could not be accessed! Please try again'
      )
    );
  }
};

//==========================================================================
// Get total fincial report
//==========================================================================
export const totalIncome = async (req, res, next) => {
  try {
    const financialReport = await Finance.find();

    const annualTatalIncome = financialReport.reduce(
      (totalSumMonthlyReportIncome, monthlyFinancialReport) =>
        totalSumMonthlyReportIncome + monthlyFinancialReport.total,
      0
    );

    return res.status(200).json(annualTatalIncome);
  } catch (error) {
    console.log(error);
    return next(
      createError(
        400,
        'The monthly financial reports could not be accessed! Please try again'
      )
    );
  }
};

//==========================================================================
// Count all monthly financial reports
//==========================================================================
export const countFinancialReports = async (req, res, next) => {
  try {
    const counts = await Finance.countDocuments();
    return res.status(200).json(counts);
  } catch (error) {
    console.log(error);
    return next(
      createError(
        400,
        'The monthly financial reports count could not be accessed! Please try again'
      )
    );
  }
};

//==========================================================================
// Delete Finance
//==========================================================================
export const deleteAllFinance = async (req, res, next) => {
  try {
    await Finance.deleteMany();

    return res
      .status(200)
      .json(`All the financial details have been successfully deleted.`);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, 'The sacrament could not be deleted! Please try again')
    );
  }
};
