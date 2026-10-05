"use client";

import { useMemo, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import {
  submitPrivateHireEnquiry,
  type PrivateHireFormState,
} from "@/app/actions/privateHireEnquiry";
import {
  DINING_STYLE_OPTIONS,
} from "@/lib/privateHire";
import { SITE_CONTACT } from "@/lib/siteConfig";

const initialState: PrivateHireFormState = { ok: false, message: "" };

const inputClass =
  "w-full px-4 py-3.5 bg-pupa-beige/50 border border-pupa-brown/10 rounded-sm font-sans text-base text-pupa-brown placeholder:text-pupa-brown/35 focus:outline-none focus:border-pupa-gold focus:ring-1 focus:ring-pupa-gold/30 transition-colors";

const labelClass =
  "block font-sans text-sm tracking-[0.15em] uppercase text-pupa-brown/70 mb-2";

function todayLocalISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 font-sans text-sm text-red-700/80">
      {message}
    </p>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-pupa-brown text-pupa-cream font-sans text-sm tracking-[0.2em] uppercase rounded-sm hover:bg-pupa-dark transition-colors disabled:opacity-60"
    >
      {pending ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          Sending…
        </>
      ) : (
        <>
          Submit Enquiry
          <Send size={14} />
        </>
      )}
    </button>
  );
}

export default function PrivateHireForm() {
  const [state, formAction] = useFormState(submitPrivateHireEnquiry, initialState);
  const [formStartedAt] = useState(() => Date.now());
  const errors = state.fieldErrors ?? {};
  const values = state.values;
  const minDate = useMemo(() => todayLocalISO(), []);

  // Remount after each response so defaultValue/defaultChecked restore submitted values
  const formKey = state.values
    ? `retry-${state.message}-${JSON.stringify(state.values)}`
    : "fresh";

  if (state.ok) {
    return (
      <div className="rounded-xl bg-white ring-1 ring-pupa-brown/8 p-8 sm:p-10 text-center shadow-[0_16px_50px_-24px_rgba(15,44,34,0.35)]">
        <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-pupa-gold/15 flex items-center justify-center">
          <CheckCircle2 className="text-pupa-gold" size={28} strokeWidth={1.5} />
        </div>
        <h3 className="font-serif text-3xl text-pupa-brown font-semibold mb-3">
          Enquiry sent
        </h3>
        <p className="font-sans text-pupa-brown/65 text-base leading-relaxed max-w-sm mx-auto">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form
      key={formKey}
      action={formAction}
      className="relative rounded-xl bg-white ring-1 ring-pupa-brown/8 p-6 sm:p-8 shadow-[0_16px_50px_-24px_rgba(15,44,34,0.35)]"
      noValidate
    >
      {/* Honeypot — hidden from people, filled by many bots */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input type="hidden" name="formStartedAt" value={String(formStartedAt)} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First name <span className="text-pupa-gold">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            defaultValue={values?.firstName ?? ""}
            className={inputClass}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
          <FieldError id="firstName-error" message={errors.firstName} />
        </div>

        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last name <span className="text-pupa-gold">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            defaultValue={values?.lastName ?? ""}
            className={inputClass}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
          <FieldError id="lastName-error" message={errors.lastName} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-pupa-gold">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={values?.email ?? ""}
            className={inputClass}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          <FieldError id="email-error" message={errors.email} />
          <label className="mt-3 flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="newsletter"
              defaultChecked={values?.newsletter ?? false}
              className="mt-0.5 h-4 w-4 rounded border-pupa-brown/20 text-pupa-gold focus:ring-pupa-gold/30"
            />
            <span className="font-sans text-base text-pupa-brown/60 group-hover:text-pupa-brown/80 transition-colors">
              Sign up for news and updates from Pupa
            </span>
          </label>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={values?.phone ?? ""}
            className={inputClass}
          />
        </div>

        <fieldset className="sm:col-span-2">
          <legend className={labelClass}>What dining style are you interested in?</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DINING_STYLE_OPTIONS.map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 px-4 py-3 rounded-sm border border-pupa-brown/10 bg-pupa-beige/30 cursor-pointer hover:border-pupa-gold/40 transition-colors"
              >
                <input
                  type="checkbox"
                  name={`style_${option}`}
                  defaultChecked={values?.diningStyles.includes(option) ?? false}
                  className="h-4 w-4 rounded border-pupa-brown/20 text-pupa-gold focus:ring-pupa-gold/30"
                />
                <span className="font-sans text-base text-pupa-brown/75">{option}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="preferredDate" className={labelClass}>
            Preferred date <span className="text-pupa-gold">*</span>
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            min={minDate}
            defaultValue={values?.preferredDate ?? ""}
            className={inputClass}
            aria-invalid={!!errors.preferredDate}
            aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined}
          />
          <FieldError id="preferredDate-error" message={errors.preferredDate} />
        </div>

        <div>
          <label htmlFor="preferredTime" className={labelClass}>
            Preferred time
          </label>
          <input
            id="preferredTime"
            name="preferredTime"
            type="time"
            defaultValue={values?.preferredTime ?? ""}
            className={inputClass}
          />
          <p className="mt-1.5 font-sans text-sm text-pupa-brown/40">
            Times are in UK local time (GMT/BST)
          </p>
        </div>

        <div>
          <label htmlFor="guests" className={labelClass}>
            Number of guests <span className="text-pupa-gold">*</span>
          </label>
          <input
            id="guests"
            name="guests"
            type="number"
            min={1}
            max={80}
            defaultValue={values?.guests ?? ""}
            className={inputClass}
            aria-invalid={!!errors.guests}
            aria-describedby={errors.guests ? "guests-error" : undefined}
          />
          <FieldError id="guests-error" message={errors.guests} />
        </div>

        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget per person (food) <span className="text-pupa-gold">*</span>
          </label>
          <input
            id="budget"
            name="budget"
            type="text"
            placeholder="e.g. £45"
            defaultValue={values?.budget ?? ""}
            className={inputClass}
            aria-invalid={!!errors.budget}
            aria-describedby={errors.budget ? "budget-error" : undefined}
          />
          <FieldError id="budget-error" message={errors.budget} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Message <span className="text-pupa-gold">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className={`${inputClass} resize-y min-h-[8rem]`}
            placeholder="Tell us about your occasion, dietary requirements, or anything else we should know…"
            defaultValue={values?.message ?? ""}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          <FieldError id="message-error" message={errors.message} />
        </div>
      </div>

      {state.message && !state.ok && (
        <p className="mt-5 font-sans text-base text-red-700/80 leading-relaxed" role="alert">
          {state.message}
        </p>
      )}

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SubmitButton />
        <p className="font-sans text-sm text-pupa-brown/45 leading-relaxed">
          Or call{" "}
          <a
            href={SITE_CONTACT.phoneHref}
            className="text-pupa-brown hover:text-pupa-gold transition-colors"
          >
            {SITE_CONTACT.phone}
          </a>
        </p>
      </div>
    </form>
  );
}
