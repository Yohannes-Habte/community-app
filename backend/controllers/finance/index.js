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
      return next(createError(400, "Finance report already exists"));
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
// Get all Financial reports and sort by year and month
//==========================================================================

export const getAllFinancialReports = async (req, res, next) => {
  try {
    // Fetch all finance reports
    const financeReports = await Finance.find();

    if (!financeReports || financeReports.length === 0) {
      return next(
        createError(400, "Finance reports not found. Please try again.")
      );
    }

    // Sort finance reports by year and then by month
    financeReports.sort((a, b) => {
      const dateA = new Date(a.date); // Parse date string to Date object
      const dateB = new Date(b.date); // Parse date string to Date object

      // First, compare by year
      if (dateA.getFullYear() !== dateB.getFullYear()) {
        return dateA.getFullYear() - dateB.getFullYear(); // Sort by year
      }

      // If years are equal, compare by month
      return dateA.getMonth() - dateB.getMonth(); // Sort by month
    });

    // Return sorted reports
    return res.status(200).json({
      success: true,
      result: financeReports,
    });
  } catch (error) {
    return next(createError(500, "Server error! "));
  }
};
//==========================================================================
// Get total financial report for the year
//==========================================================================

export const totalIncome = async (req, res, next) => {
  try {
    const { year } = req.query;

    // Ensure year is provided and is a valid number
    if (!year || isNaN(year)) {
      return next(createError(400, "Please provide a valid year."));
    }

    // Use regex to find financial reports for the specified year
    const financialReports = await Finance.find({
      date: { $regex: new RegExp(`^${year}`) }, // Match the year at the beginning of the date string
    });

    // If no reports are found, return a response with 0 income
    if (financialReports.length === 0) {
      return res.status(200).json({
        success: true,
        result: 0,
        message: `No financial reports found for the year ${year}.`,
      });
    }

    // Calculate the total income for the specified year
    const annualTotalIncome = financialReports.reduce(
      (totalSum, report) => totalSum + (report.total || 0),
      0
    );

    console.log("Annual Total Income =", annualTotalIncome);

    return res.status(200).json({
      success: true,
      result: annualTotalIncome,
    });
  } catch (error) {
    console.log(error);
    return next(createError(500, "Server error! Please try again."));
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
