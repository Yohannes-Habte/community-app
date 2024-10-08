import mongoose from "mongoose";
const { Schema } = mongoose;

const videoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
  }, { timestamps: true });
  
  const Video = mongoose.model("Video", videoSchema);
  export default Video;
  