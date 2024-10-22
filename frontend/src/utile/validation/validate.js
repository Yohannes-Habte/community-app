// ===============================================================
// Validate Email
// ===============================================================
export const validEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// ===============================================================
// Validate password
// ===============================================================

export const validPassword = (password) => {
  if (typeof password !== "string") {
    throw new TypeError("Password must be a string");
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

  return passwordRegex.test(password);
};

// ===============================================================
// Validate phone
// ===============================================================

export const validPhone = (phone) => {
  const sanitizedPhone = phone.replace(/\D/g, ""); // Remove non-digit characters
  const phoneRegex = /^\d{10,15}$/;

  return phoneRegex.test(sanitizedPhone);
};

// ===============================================================
// Validate zip code
// ===============================================================
export const validZipCode = (zipCode) => {
  const zipCodeRegex = /^\d{5}(-\d{4})?$/;

  return zipCodeRegex.test(zipCode);
};

// ===============================================================
// Validate text message
// ===============================================================
export const validTextMessage = (message) => {
  const messageRegex = /^[a-zA-Z0-9\s\-.,?!()'"]+$/;

  return messageRegex.test(message);
};

// ===============================================================
// Validate full name
// ===============================================================

export const isValidFullName = (name) => {
  if (typeof name !== "string") {
    throw new TypeError("Name must be a string");
  }

  const fullNameRegex = /^[a-zA-Z\s]+$/;

  return fullNameRegex.test(name.trim());
};

// ===============================================================
// Validate image url
// ===============================================================
export const validImage = (url) => {
  const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i;

  return urlRegex.test(url);
};

// ===============================================================
// MongoDB ObjectId
// ===============================================================
export const isValidObjectId = (id) => {
  const mongoDBObjectIdRegex = /^[a-fA-F\d]{24}$/;

  return mongoDBObjectIdRegex.test(id);
};

// ===============================================================
// Validate time
// ===============================================================

export const validTime = (time) => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  return timeRegex.test(time);
};
