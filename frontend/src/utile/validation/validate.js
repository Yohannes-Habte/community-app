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
  const passwordRegex = password.match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );
  return passwordRegex;
};

// ===============================================================
// Validate phone
// ===============================================================

export const validPhone = (phone) => {
  const sanitizedPhone = phone.replace(/\D/g, ""); // Remove non-digit characters
  const phoneRegex = /^\d{10,15}$/;

  return phoneRegex.test(sanitizedPhone);
};
