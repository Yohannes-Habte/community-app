import createError from "http-errors";
import bcrypt from "bcryptjs";
import Committee from "../../models/committee/index.js";

//==========================================================================
// Register new committee member
//==========================================================================
export const createCommittee = async (req, res, next) => {
  try {
    const committeeAccount = new Committee(req.body);

    // Save new committee account
    try {
      await committeeAccount.save();
    } catch (error) {
      console.log(error);
      return next(createError(400, "Committee account is not saved!"));
    }

    return res.status(201).json({
      success: true,
      committee: committeeAccount,
      message: "Account is successfully created.",
    });
  } catch (error) {
    console.log(error);
    return next(
      createError(
        400,
        "Database has problem to create an account for a committee member! please try again!"
      )
    );
  }
};

//==========================================================================
// Get committee members
//==========================================================================
export const getAllCommitteeMembers = async (req, res, next) => {
  try {
    // Find all committees
    const committees = await Committee.find();

    if (!committees) {
      return next(createError(400, "Committees not found!"));
    }

    return res.status(200).json({ success: true, result: committees });
  } catch (error) {
    console.log(error);
    return next(
      createError(
        400,
        "Committee members could not be accessed! Please try again!"
      )
    );
  }
};

//==========================================================================
// Login committee member
//==========================================================================
export const loginCommitteeMember = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const committeeMember = await Committee.findOne({ email: email });
    if (!committeeMember) {
      return next(createError(400, "Email does not exist. Please signup!"));
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(createError(400, "Incorrect password!"));
    }

    if (committeeMember && isPasswordValid) {
      // To prevent password and adming sending to the frontend, you can do ....
      const { password, isAdmin, isPriest, ...userDetails } = user._doc;

      return res
        .status(201)
        .json({ details: { ...userDetails }, isAdmin, isPriest });
    }
  } catch (error) {
    console.log(error);
    return next(createError(400, "You are unable to login! please try again!"));
  }
};

//==========================================================================
// Update committee member details
//==========================================================================
export const updateCommitteeMember = async (req, res, next) => {
  const committeeId = req.params.id;
  try {
    const committeeMember = await Committee.findByIdAndUpdate(
      committeeId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!committeeMember) {
      return next(
        createError(400, "Committee member not found! please try again!")
      );
    }

    // save the updated user
    await committeeMember.save();

    return res.status(200).json({
      success: true,
      message: `${committeeMember.fullName} profile has been successfully updated`,
    });
  } catch (error) {
    console.log(error);
    return next(createError(400, "Server error! please try again!"));
  }
};

//==========================================================================
// Get single Committee Member
//==========================================================================
export const getCommitteeMember = async (req, res, next) => {
  try {
    const committeeMember = await Committee.findById(req.params.id);

    if (!committeeMember) {
      return next(createError(400, "Committee member not found!"));
    }

    return res.status(200).json({ success: true, result: committeeMember });
  } catch (error) {
    console.log(error);
    return next(createError(400, "Server error! please try again!"));
  }
};

//==========================================================================
// Delete a committee member
//==========================================================================
export const deleteCommitteeMember = async (req, res, next) => {
  try {
    const user = await Committee.findById(req.params.id);
    await Committee.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json(`${user.fullName} has been successfully deleted`);
  } catch (error) {
    console.log(error);
    return next(createError(400, "User is not deleted! please try again!"));
  }
};

//==========================================================================
// Get service facilitator for sacrament
//==========================================================================
export const serviceFacilitator = async (req, res, next) => {
  try {
    const user = await Committee.findById(req.params.id);
    if (user.title === "Parish Priest") {
      return res.status(200).json(user.fullName);
    } else {
      return res.status(200).json("Facilitator not found!");
    }
  } catch (error) {
    console.log(error);
    return next(
      createError(400, "Priest could not be accessed! please try again!")
    );
  }
};

// ============================================================================================
// Get committees by range of service years using two input values
// ============================================================================================
export const getCommitteesByServiceYearRange = async (req, res) => {
  const { startYear, endYear } = req.query;

  // Validate input
  if (!startYear || !endYear || isNaN(startYear) || isNaN(endYear)) {
    return res.status(400).json({ message: "Invalid year range" });
  }

  try {
    const startDate = new Date(`${startYear}-01-01`);
    const endDate = new Date(`${parseInt(endYear) + 1}-01-01`);

    const committees = await Committee.find({
      startingTime: { $gte: startDate },
      endingTime: { $lte: endDate },
    });

    res.status(200).json(committees);
  } catch (error) {
    console.error("Error fetching committees by service year range:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//============================================================================================
// How to get get a dropdown years to get a specific Committee using the two function below
//============================================================================================

export const getCommitteeMembers = async (req, res) => {
  const { startYear, endYear } = req.query;

  // Validate the query parameters
  if (!startYear || !endYear || isNaN(startYear) || isNaN(endYear)) {
    return res.status(400).json({ message: "Invalid startYear or endYear" });
  }

  try {
    const startDate = new Date(`${startYear}-01-01`);
    const endDate = new Date(`${endYear}-12-31`); // Ensure end date is the last day of the year

    if (startDate > endDate) {
      return res
        .status(400)
        .json({ message: "startYear must be less than or equal to endYear" });
    }

    // Query for committees that fall within the specified year range
    const committees = await Committee.find({
      startingTime: { $gte: startDate },
      endingTime: { $lte: endDate },
    });

    if (committees.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No committee members found" });
    }

    res.status(200).json({ success: true, result: committees });
  } catch (error) {
    console.error(
      "Error fetching committee members by service year range:",
      error
    );
    res.status(500).json({ message: "Server error" });
  }
};

export const getYearRanges = async (req, res) => {
  try {
    const query = [
      {
        $group: {
          _id: null,
          startYears: { $addToSet: { $year: "$startingTime" } },
          endYears: { $addToSet: { $year: "$endingTime" } },
        },
      },
      {
        $project: {
          allYears: { $setUnion: ["$startYears", "$endYears"] },
        },
      },
      {
        $unwind: "$allYears",
      },
      {
        $sort: { allYears: 1 },
      },
      {
        $group: {
          _id: null,
          allYears: { $push: "$allYears" },
        },
      },
    ];

    const years = await Committee.aggregate(query);

    if (!years.length || !years[0].allYears.length) {
      return res
        .status(404)
        .json({ success: false, message: "No years found" });
    }

    const yearRanges = [];
    const sortedYears = years[0].allYears;

    // Generate ranges like "2022-2023", "2024-2025", etc.
    for (let i = 0; i < sortedYears.length - 1; i += 2) {
      if (i + 1 < sortedYears.length) {
        yearRanges.push(`${sortedYears[i]}-${sortedYears[i + 1]}`);
      }
    }

    res.status(200).json({ success: true, result: yearRanges });
  } catch (error) {
    console.error("Error fetching distinct years:", error);
    res.status(500).json({ message: "Server error" });
  }
};
