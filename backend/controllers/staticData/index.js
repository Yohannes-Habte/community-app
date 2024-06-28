import {
  aboutPageData,
  hawkaAbeyAllo,
  headerImages,
  parishPriest,
  serviceData,
  shepherds,
} from "../../data/Data.js";
import createError from "http-errors";
//====================================================================
// Header images
//====================================================================

export const getHeaderData = async (req, res, next) => {
  try {
    const data = await headerImages;
    if (!data) {
      return next(createError(404, "Data not found"));
    }
    res.status(200).json({ data });
  } catch (error) {
    next(createError(500, "Server error"));
  }
};

//====================================================================
// Bishops
//====================================================================

export const getShepherds = async (req, res, next) => {
  try {
    const data = await shepherds;
    if (!data) {
      return next(createError(404, "Data not found"));
    }
    res.status(200).json({ data });
  } catch (error) {
    next(createError(500, "Server error"));
  }
};

//====================================================================
// Hawka abey alo
//====================================================================

export const getHawkaAbeyAllo = async (req, res, next) => {
  try {
    const data = await hawkaAbeyAllo;
    if (!data) {
      return next(createError(404, "Data not found"));
    }
    res.status(200).json({ data });
  } catch (error) {
    next(createError(500, "Server error"));
  }
};

//====================================================================
// Parish Priest
//====================================================================
export const getParishPriest = async (req, res, next) => {
  try {
    const data = await parishPriest;
    if (!data) {
      return next(createError(404, "Data not found"));
    }
    res.status(200).json({ data });
  } catch (error) {
    next(createError(500, "Server error"));
  }
};

//====================================================================
// Home about page
//====================================================================

export const getAboutData = async (req, res, next) => {
  try {
    const data = await aboutPageData;
    if (!data) {
      return next(createError(404, "Data not found"));
    }
    res.status(200).json({ data });
  } catch (error) {
    next(createError(500, "Server error"));
  }
};

//====================================================================
// Service Page Data
//====================================================================

export const getServiceData = async (req, res, next) => {
  try {
    const data = await serviceData;
    if (!data) {
      return next(createError(404, "Data not found"));
    }
    res.status(200).json({ data });
  } catch (error) {
    next(createError(500, "Server error"));
  }
};
