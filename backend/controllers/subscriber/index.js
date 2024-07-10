import createError from "http-errors";
import Subscriber from "../../models/subscriber/index.js";
import sendEmail from "../../utils/sendGrid/sendEmail.js";

//===========================================================================================
// Create a a new subscriber
//===========================================================================================
export const createSubscriber = async (req, res, next) => {
  const { email } = req.body;

  try {
    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      return next(createError(400, "Subscriber already exists"));
    }

    subscriber = new Subscriber({
      email,
    });

    await subscriber.save();
    res.json({ success: true, message: "Subscribed successfully" });
  } catch (err) {
    return next(createError(500, "Server error"));
  }
};

//===========================================================================================
// Create a function to fetch all subscribers and send them a notification email (auth admin)
//===========================================================================================

const notifySubscribers = async (subject, text) => {
  try {
    const subscribers = await Subscriber.find();

    subscribers.forEach((subscriber) => {
      sendEmail(subscriber.email, subject, text);
    });

    console.log("Notifications sent to all subscribers");
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
};

export const sendNotifications = async (req, res) => {
  const { subject, text } = req.body;

  try {
    await notifySubscribers(subject, text);
    res.json({ message: "Visit our website or store to get new featured product at 20% discount!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
