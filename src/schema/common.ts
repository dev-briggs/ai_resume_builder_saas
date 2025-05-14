import { z } from "zod";
import libphonenumber from "google-libphonenumber";

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

export const optionalStringSchema = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""));
export const optionalEmailSchema = z
  .string()
  .email()
  .optional()
  .or(z.literal(""));
export const phoneNumberSchema = z
  .string()
  .refine(
    (number) => {
      if (!number) return true;
      try {
        const phoneNumber = phoneUtil.parse(number);
        return phoneUtil.isValidNumber(phoneNumber);
      } catch {
        return false;
      }
    },
    { message: "Invalid mobile number" },
  )
  .optional();
