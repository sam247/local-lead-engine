import validator from "validator";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";

const UK_POSTCODE_REGEX = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i;

export function isValidEmail(s: string): boolean {
  if (typeof s !== "string" || !s.trim()) return false;
  return validator.isEmail(s.trim(), { require_tld: true });
}

export function isValidPhone(s: string, defaultCountry: string = "GB"): boolean {
  if (typeof s !== "string" || !s.trim()) return false;
  const parsed = parsePhoneNumberFromString(s.trim(), defaultCountry as "GB");
  return parsed != null && parsed.isValid();
}

export function isValidUkPostcode(s: string): boolean {
  if (typeof s !== "string" || !s.trim()) return false;
  return UK_POSTCODE_REGEX.test(s.trim());
}

const EMAIL_MSG = "Valid email required";
const PHONE_MSG = "Valid phone number required";
const POSTCODE_MSG = "Valid UK postcode required";

export const leadEmailField = z
  .string()
  .trim()
  .max(255)
  .refine(isValidEmail, EMAIL_MSG);

export const leadPhoneField = z
  .string()
  .trim()
  .max(30)
  .refine((v) => isValidPhone(v, "GB"), PHONE_MSG);

export const leadPostcodeField = z
  .string()
  .trim()
  .max(16)
  .refine(isValidUkPostcode, POSTCODE_MSG);
