"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { DINING_STYLE_OPTIONS } from "@/lib/privateHire";
import { buildPrivateHireEnquiryEmail } from "@/lib/emails/privateHireEnquiryEmail";
import { checkRateLimit } from "@/lib/rateLimit";
import { SITE_CONTACT } from "@/lib/siteConfig";

export type PrivateHireFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  guests: string;
  budget: string;
  message: string;
  newsletter: boolean;
  diningStyles: string[];
};

export type PrivateHireFormState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
  values?: PrivateHireFormValues;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_GUESTS = 80;
/** Reject automated instant submits (honeypot companion). */
const MIN_SUBMIT_MS = 2500;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function getField(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

/** Local calendar date as YYYY-MM-DD (avoids UTC day-shift). */
function todayLocalISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function clientIp() {
  const h = headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return h.get("x-real-ip") || "unknown";
}

function readValues(formData: FormData): PrivateHireFormValues {
  return {
    firstName: getField(formData, "firstName"),
    lastName: getField(formData, "lastName"),
    email: getField(formData, "email"),
    phone: getField(formData, "phone"),
    preferredDate: getField(formData, "preferredDate"),
    preferredTime: getField(formData, "preferredTime"),
    guests: getField(formData, "guests"),
    budget: getField(formData, "budget"),
    message: getField(formData, "message"),
    newsletter: formData.get("newsletter") === "on",
    diningStyles: DINING_STYLE_OPTIONS.filter(
      (option) => formData.get(`style_${option}`) === "on"
    ),
  };
}

export async function submitPrivateHireEnquiry(
  _prev: PrivateHireFormState,
  formData: FormData
): Promise<PrivateHireFormState> {
  const values = readValues(formData);

  // Honeypot — bots often fill hidden fields; pretend success and skip Resend
  const honeypot = getField(formData, "company_website");
  if (honeypot) {
    return {
      ok: true,
      message:
        "Thank you! Your enquiry has been sent. Our team will be in touch shortly.",
    };
  }

  const startedRaw = getField(formData, "formStartedAt");
  const startedAt = Number(startedRaw);
  if (
    !startedRaw ||
    Number.isNaN(startedAt) ||
    Date.now() - startedAt < MIN_SUBMIT_MS
  ) {
    return {
      ok: false,
      message: "Please wait a moment and try again.",
      values,
    };
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    preferredDate,
    preferredTime,
    guests,
    budget,
    message,
    newsletter,
    diningStyles,
  } = values;

  const fieldErrors: Record<string, string> = {};

  if (!firstName) fieldErrors.firstName = "First name is required.";
  if (!lastName) fieldErrors.lastName = "Last name is required.";
  if (!email) fieldErrors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) fieldErrors.email = "Enter a valid email address.";

  if (!preferredDate) {
    fieldErrors.preferredDate = "Preferred date is required.";
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) {
    fieldErrors.preferredDate = "Enter a valid date.";
  } else if (preferredDate < todayLocalISO()) {
    fieldErrors.preferredDate = "Please choose today or a future date.";
  }

  if (!guests) {
    fieldErrors.guests = "Number of guests is required.";
  } else {
    const guestCount = Number(guests);
    if (!Number.isInteger(guestCount) || guestCount < 1) {
      fieldErrors.guests = "Enter a valid number of guests.";
    } else if (guestCount > MAX_GUESTS) {
      fieldErrors.guests = `Maximum ${MAX_GUESTS} guests. For larger parties, please call us.`;
    }
  }

  if (!budget) fieldErrors.budget = "Budget per person is required.";
  if (!message) fieldErrors.message = "Please tell us about your event.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "Please check the highlighted fields and try again.",
      fieldErrors,
      values,
    };
  }

  const rate = checkRateLimit(`private-hire:${clientIp()}`, {
    limit: RATE_LIMIT,
    windowMs: RATE_WINDOW_MS,
  });
  if (!rate.ok) {
    return {
      ok: false,
      message:
        "Too many enquiries from this connection. Please try again later, or call us.",
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail =
    process.env.PRIVATE_HIRE_TO_EMAIL ?? SITE_CONTACT.email;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "Pupa Restaurant <onboarding@resend.dev>";

  if (!apiKey) {
    return {
      ok: false,
      message: `The enquiry form is not fully configured yet. Please email us directly at ${SITE_CONTACT.email} or call ${SITE_CONTACT.phone}.`,
      values,
    };
  }

  const fullName = `${firstName} ${lastName}`;
  const diningStyleText = diningStyles.length ? diningStyles.join(", ") : "—";
  const { html, text } = buildPrivateHireEnquiryEmail({
    fullName,
    email,
    phone,
    newsletter,
    diningStyle: diningStyleText,
    preferredDate,
    preferredTime,
    guests,
    budget,
    message,
  });

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Private Hire Enquiry — ${fullName}`,
      text,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        ok: false,
        message:
          "Something went wrong sending your enquiry. Please try again or call us.",
        values,
      };
    }

    return {
      ok: true,
      message:
        "Thank you! Your enquiry has been sent. Our team will be in touch shortly.",
    };
  } catch (err) {
    console.error("Private hire enquiry failed:", err);
    return {
      ok: false,
      message: `Unable to send your enquiry right now. Please email ${SITE_CONTACT.email} or call ${SITE_CONTACT.phone}.`,
      values,
    };
  }
}
