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


// ============================================================================================
// Get committees by service year range
// ============================================================================================

async function fetchCommitteesBetweenYears(startingYear, endingYear) {
  try {
    // Convert startingYear and endingYear to numbers for comparison
    const startYearNum = Number(startingYear);
    const endYearNum = Number(endingYear);

    // Ensure that endingYear is not less than startingYear
    if (startYearNum > endYearNum) {
      throw new Error("Starting year cannot be greater than ending year");
    }

    // Query the database for committees where the year part of startingTime and endingTime falls within the specified range
    const committees = await Committee.find({
      $expr: {
        $and: [
          // Ensure that startingTime's year is within the range of startingYear and endingYear
          {
            $and: [
              { $gte: [{ $year: "$startingTime" }, startYearNum] },
              { $lte: [{ $year: "$startingTime" }, endYearNum] },
            ],
          },
          // Ensure that endingTime's year is within the range of startingYear and endingYear
          {
            $and: [
              { $gte: [{ $year: "$endingTime" }, startYearNum] },
              { $lte: [{ $year: "$endingTime" }, endYearNum] },
            ],
          },
        ],
      },
    });

    return committees;
  } catch (error) {
    console.error("Error fetching committees:", error);
    throw error;
  }
}



export const groupCommitteeByYear = async (req, res) => {
  const { startingTime, endingTime } = req.body;

  if (!startingTime || !endingTime) {
    return res
      .status(400)
      .json({ error: "startingTime and endingTime are required" });
  }

  try {
    const committees = await fetchCommitteesBetweenTimes(
      startingTime,
      endingTime
    );
    return res.status(200).json(committees);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// ============================================================================================
// Get committees by range of service years
// ============================================================================================
export const getCommitteesByServiceYearRange = async (req, res) => {
  const { startYear, endYear } = req.query;

  try {
    const startDate = new Date(`${startYear}-01-01`);
    const endDate = new Date(`${parseInt(endYear) + 1}-01-01`);

    const committees = await Committee.find({
      startingTime: { $gte: startDate },
      endingTime: { $lte: endDate }
    });

    res.status(200).json(committees);
  } catch (error) {
    console.error('Error fetching committees by service year range:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// ============================================================================================
// Get committees by service year
// ============================================================================================
export const getCommitteesByServiceYear = async (req, res) => {
  const { year } = req.query;

  try {
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${parseInt(year) + 2}-01-01`);

    const committees = await Committee.find({
      startingTime: { $gte: startDate },
      endingTime: { $lt: endDate },
    });

    res.status(200).json(committees);
  } catch (error) {
    console.error("Error fetching committees by service year:", error);
    res.status(500).json({ message: "Server error" });
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
  try {
    const user = await Committee.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json("Update is successful", user);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, "User is unable to update! please try again!")
    );
  }
};

//==========================================================================
// Get single Committe Member
//==========================================================================
export const getCommitteeMember = async (req, res, next) => {
  try {
    const user = await Committee.findById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return next(
      createError(400, "You ar unable to get the user info! please try again!")
    );
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
