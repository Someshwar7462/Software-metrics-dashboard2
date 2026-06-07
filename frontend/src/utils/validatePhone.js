const PHONE_REGEX = /^\d{10}$/;

export function isValidPhone(phone) {
  if (!phone || typeof phone !== "string") return false;
  return PHONE_REGEX.test(phone.trim());
}

export function getPhoneError(phone) {
  if (!phone || !phone.trim()) {
    return "Phone number is required";
  }
  if (!/^\d+$/.test(phone.trim())) {
    return "Phone number must contain digits only";
  }
  if (!isValidPhone(phone)) {
    return "Please enter a valid 10-digit phone number";
  }
  return "";
}

export function sanitizePhoneInput(value) {
  return value.replace(/\D/g, "").slice(0, 10);
}
