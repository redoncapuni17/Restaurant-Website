"use server";

import {
  DINING_STYLE_OPTIONS,
  PRIVATE_HIRE_CONTENT,
} from "@/lib/privateHire";

export type PrivateHireFormState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getField(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function submitPrivateHireEnquiry(
  _prev: PrivateHireFormState,
  formData: FormData
): Promise<PrivateHireFormState> {
  const firstName = getField(formData, "firstName");
  const lastName = getField(formData, "lastName");
  const email = getField(formData, "email");
  const phone = getField(formData, "phone");
  const preferredDate = getField(formData, "preferredDate");
  const preferredTime = getField(formData, "preferredTime");
  const guests = getField(formData, "guests");
  const budget = getField(formData, "budget");
  const message = getField(formData, "message");
  const newsletter = formData.get("newsletter") === "on";
  const diningStyles = DINING_STYLE_OPTIONS.filter(
    (option) => formData.get(`style_${option}`) === "on"
  );

  const fieldErrors: Record<string, string> = {};

  if (!firstName) fieldErrors.firstName = "First name is required.";
  if (!lastName) fieldErrors.lastName = "Last name is required.";
  if (!email) fieldErrors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) fieldErrors.email = "Enter a valid email address.";
  if (!preferredDate) fieldErrors.preferredDate = "Preferred date is required.";
  if (!guests) fieldErrors.guests = "Number of guests is required.";
  else if (Number.isNaN(Number(guests)) || Number(guests) < 1)
    fieldErrors.guests = "Enter a valid number of guests.";
  if (!budget) fieldErrors.budget = "Budget per person is required.";
  if (!message) fieldErrors.message = "Please tell us about your event.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: "Please check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const enquiryBody = [
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Newsletter: ${newsletter ? "Yes" : "No"}`,
    `Dining style: ${diningStyles.length ? diningStyles.join(", ") : "—"}`,
    `Preferred date: ${preferredDate}`,
    `Preferred time: ${preferredTime || "—"}`,
    `Guests: ${guests}`,
    `Budget per person: ${budget}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return {
      ok: false,
      message:
        "The enquiry form is not fully configured yet. Please email us directly at info@puparestaurant.com or call 0161 400 4830.",
    };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Private Hire Enquiry — ${firstName} ${lastName}`,
        from_name: `${firstName} ${lastName}`,
        email,
        phone,
        message: enquiryBody,
        replyto: email,
        to: PRIVATE_HIRE_CONTENT.email,
      }),
    });

    const result = (await response.json()) as { success?: boolean; message?: string };

    if (!response.ok || !result.success) {
      return {
        ok: false,
        message:
          result.message ||
          "Something went wrong sending your enquiry. Please try again or call us.",
      };
    }

    return {
      ok: true,
      message:
        "Thank you! Your enquiry has been sent. Our team will be in touch shortly.",
    };
  } catch {
    return {
      ok: false,
      message:
        "Unable to send your enquiry right now. Please email info@puparestaurant.com or call 0161 400 4830.",
    };
  }
}
