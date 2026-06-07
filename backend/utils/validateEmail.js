const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed.length > 254) return false;
  return EMAIL_REGEX.test(trimmed);
}

function getEmailError(email) {
  if (!email || !email.trim()) {
    return "Email is required";
  }
  if (!isValidEmail(email)) {
    return "Please enter a valid email address (e.g. you@example.com)";
  }
  return "";
}

module.exports = { isValidEmail, getEmailError };
