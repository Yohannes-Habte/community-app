import createError from "http-errors";
import Finance from "../../models/finance/index.js";
import mongoose from "mongoose";

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
    // Parse the provided date and extract month and year
    const reportDate = new Date(date);
    const reportMonth = reportDate.getMonth() + 1; // getMonth() is zero-based, so add 1
    const reportYear = reportDate.getFullYear();

    // Ensure that 'date' in the query is treated as a Date object by MongoDB
    const existingFinanceReport = await Finance.findOne({
      $expr: {
        $and: [
          { $eq: [{ $month: "$date" }, reportMonth] }, // Compare month
          { $eq: [{ $year: "$date" }, reportYear] }, // Compare year
        ],
      },
    });

    if (existingFinanceReport) {
      return next(
        createError(
          400,
          "A financial report for this month and year already exists."
        )
      );
    }

    // Calculate the total amount
    const total =
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
        Number(Number(otherExpense).toFixed(2)));

    // Create the new finance report
    const newFinanceReport = new Finance({
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
      date: reportDate, // Store the exact date for reference
      total,
    });

    // Save the new report
    await newFinanceReport.save();

    return res.status(201).json({
      success: true,
      result: newFinanceReport,
      message: "Financial report successfully completed!",
    });
  } catch (error) {
    console.log(error);
    return next(createError(500, "Server error. Please try again."));
  }
};

//==========================================================================
// Get Single Financial report
//==========================================================================
export const getFinance = async (req, res, next) => {
  const reportId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(reportId)) {
    return next(
      createError(400, "Invalid report ID format. Please provide a valid ID.")
    );
  }

  try {
    const report = await Finance.findById(reportId);

    if (!report) {
      return next(
        createError(
          404,
          "Financial report not found. Please verify the ID and try again."
        )
      );
    }

    return res.status(200).json({
      success: true,
      result: report,
    });
  } catch (error) {
    return next(
      createError(
        500,
        "An internal server error occurred. Please try again later."
      )
    );
  }
};

// ========================================================================
// Update finance report
// ========================================================================

export const updateFinanceReport = async (req, res, next) => {
  const reportId = req.params.id;

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

  // Validate the report ID
  if (!mongoose.Types.ObjectId.isValid(reportId)) {
    return next(
      createError(400, "Invalid report ID format. Please provide a valid ID.")
    );
  }

  try {
    // Check if the financial report exists
    const report = await Finance.findById(reportId);
    if (!report) {
      return next(
        createError(
          404,
          "Financial report not found. Please verify the ID and try again."
        )
      );
    }

    const total =
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
        Number(Number(otherExpense).toFixed(2)));

    console.log("Total =", total);

    // Prepare the fields to update
    const updateFields = {
      date,
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
      total: total,
    };

    // Update the financial report
    const updatedReport = await Finance.findByIdAndUpdate(
      reportId,
      { $set: updateFields },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      result: updatedReport,
      message: "Financial report successfully updated!",
    });
  } catch (error) {
    // Log the error for internal debugging
    console.error(
      `Error updating financial report with ID ${reportId}:`,
      error
    );

    return next(
      createError(
        500,
        "An internal server error occurred. Please try again later."
      )
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

/** 
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

    return res.status(200).json({
      success: true,
      result: annualTotalIncome,
    });
  } catch (error) {
    console.log(error);
    return next(createError(500, "Server error! Please try again."));
  }
};

*/

export const totalIncome = async (req, res, next) => {
  try {
    const { year } = req.query;

    // Ensure the year is provided and is a valid number
    if (!year || isNaN(year)) {
      return next(createError(400, "Please provide a valid year."));
    }

    // Create a date range for the start and end of the year
    const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
    const endOfYear = new Date(`${year}-12-31T23:59:59.999Z`);

    // Find financial reports within the specified year
    const financialReports = await Finance.find({
      date: {
        $gte: startOfYear,
        $lte: endOfYear,
      },
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
