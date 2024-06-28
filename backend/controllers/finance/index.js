import createError from "http-errors";
import Finance from "../../models/finance/index.js";


//=======================================================
// Post new finance report
//=======================================================

export const createFinanceReport = async (req, res, next) => {
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
  } = req.body;

  try {
    const existingFinanceReport = await Finance.findOne({ date: date });

    if (existingFinanceReport) {
      return next(
        createError(400, "Finance report already exists. Please try again.")
      );
    }

    // If finance report is not found, create new finance report
    if (!existingFinanceReport) {
      const newFinanceReport = new Finance({
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
        total:
          Number(Number(contribution).toFixed(2)) +
          Number(Number(offer).toFixed(2)) +
          Number(Number(servicePayment).toFixed(2)) -
          (Number(Number(frekdasie).toFixed(2)) +
            Number(Number(choirExpense).toFixed(2)) +
            Number(Number(eventExpense).toFixed(2)) +
            Number(Number(priestExpense).toFixed(2)) +
            Number(Number(guestExpense).toFixed(2)) +
            Number(Number(presentExpense).toFixed(2)) +
            Number(Number(tripExpense).toFixed(2)) +
            Number(Number(otherExpense).toFixed(2))),
      });

      try {
        await newFinanceReport.save();
      } catch (err) {
        console.log(err);
        return next(
          createError(500, "Financial report is not saved. Please try again.")
        );
      }

      return res.status(201).json({
        success: true,
        report: newFinanceReport,
        message: "Financial report is successfully completed!",
      });
    }
  } catch (error) {
    console.log(error);
    return next(createError(500, "Server error. Please try again."));
  }
};

//==========================================================================
// Get Finance
//==========================================================================
export const getFinance = async (req, res, next) => {
  try {
    const report = await Finance.findById(req.params.id);

    if (report) {
      return next(
        createError(400, "Such report does not exists. Please try again.")
      );
    }

    return res.status(200).json({
      success: true,
      report: report,
    });
  } catch (error) {
    return next(
      createError(400, "The finance could not be accessed! Please try again")
    );
  }
};

//==========================================================================
// Get all Financial reports
//==========================================================================
export const financialReports = async (req, res, next) => {
  try {
    const financeReports = await Finance.find();

    if (!financeReports) {
      return next(
        createError(400, "Finance reports not found. Please try again.")
      );
    }

    return res.status(200).json({
      success: true,
      reports: financeReports,
    });
  } catch (error) {
    console.log(error);
    return next(
      createError(
        500,
        "Financial reports could not be accessed! Please try again"
      )
    );
  }
};

//==========================================================================
//! Get total financial report
//==========================================================================
export const totalIncome = async (req, res, next) => {
  try {
    const financialReport = await Finance.find();

    const annualTotalIncome = financialReport.reduce(
      (totalSumMonthlyReportIncome, monthlyFinancialReport) =>
        totalSumMonthlyReportIncome + monthlyFinancialReport.total,
      0
    );

    return res.status(200).json({
      success: true,
      totalSum: annualTotalIncome,
    });
  } catch (error) {
    console.log(error);
    return next(
      createError(
        400,
        "The monthly financial reports could not be accessed! Please try again"
      )
    );
  }
};

//==========================================================================
// Get Finance
//==========================================================================
export const deleteFinanceReport = async (req, res, next) => {
  try {
    const financialReportId = req.params.id;
    const report = await Finance.findByIdAndDelete(financialReportId);

    if (!report) {
      return next(
        createError(400, "Such report does not exists. Please try again.")
      );
    }

    return res.status(200).json({
      success: true,
      message: "Financial report is successfully deleted!",
    });
  } catch (error) {
    console.log(error);
    return next(
      createError(400, "The finance could not be accessed! Please try again")
    );
  }
};
