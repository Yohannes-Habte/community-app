import Video from "../../models/video/index.js";
import createError from "http-errors";

// Create a new video
export const createVideo = async (req, res, next) => {
  try {
    const { title, description, videoUrl } = req.body;
    const video = new Video({ title, description, videoUrl });
    await video.save();
    res.status(201).json({
      success: true,
      result: video,
      message: "Video uploaded successfully.",
    });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Get the last video
export const getLastVideo = async (req, res, next) => {
  try {
    const video = await Video.findOne().sort({ createdAt: -1 });
    res.status(200).json({ success: true, result: video });
  } catch (error) {
    next(createError(400, error.message));
  }
};
