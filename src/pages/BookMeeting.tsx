import { useState, useMemo } from "react";
import { bookingConfig } from "../data/booking";

const ALLOWED_NAME = "cody";
const PASSCODE = "SSSX-2015";

type Step = "name-gate" | "passcode-gate" | "form" | "submitting" | "success";

function generateTimeSlots(startHour: number, endHour: number, intervalMins: number): string[] {
  const slots: string[] = [];
  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += intervalMins) {
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      slots.push(`${hh}:${mm}`);
    }
  }
  return slots;
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

function getTomorrowDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function isWeekend(dateStr: string): boolean {
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDay();
  return day === 0 || day === 6;
}

export default function BookMeeting() {
  const [step, setStep] = useState<Step>("name-gate");
  const [nameInput, setNameInput] = useState("");
  const [nameError, setNameError] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");

  const timeSlots = useMemo(
    () =>
      generateTimeSlots(
        bookingConfig.availableHours.start,
        bookingConfig.availableHours.end,
        bookingConfig.slotIntervalMinutes
      ),
    []
  );

  function handleName(e: React.FormEvent) {
    e.preventDefault();
    if (nameInput.trim().toLowerCase() === ALLOWED_NAME) {
      setNameError(false);
      setStep("passcode-gate");
    } else {
      setNameError(true);
    }
  }

  function handlePasscode(e: React.FormEvent) {
    e.preventDefault();
    if (passcodeInput.trim() === PASSCODE) {
      setPasscodeError(false);
      setStep("form");
    } else {
      setPasscodeError(true);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    if (!name.trim() || !email.trim() || !date || !time) {
      setFormError("Please fill in all required fields.");
      return;
    }
    if (isWeekend(date)) {
      setFormError("Please select a weekday (Mon–Fri).");
      return;
    }
    if (!bookingConfig.webhookUrl) {
      setFormError(
        "Booking webhook not configured yet. Please contact Suraj directly."
      );
      return;
    }

    setStep("submitting");
    try {
      const res = await fetch(bookingConfig.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, date, time, message }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("success");
      } else {
        setFormError(data.error ?? "Something went wrong. Please try again.");
        setStep("form");
      }
    } catch {
      setFormError("Failed to send request. Please try again.");
      setStep("form");
    }
  }

  return (
    <main className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-rose-950 mb-2">Book a Meeting</h1>
          <p className="text-stone-500 text-sm">
            Schedule a 30-minute call with Suraj — Mon to Fri, 9 AM – 6 PM IST.
          </p>
        </div>

        {/* Step 1: Name gate */}
        {step === "name-gate" && (
          <div className="bg-white border border-rose-100 rounded-2xl p-8 shadow-sm">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h2 className="text-rose-950 font-semibold text-lg">Who are you?</h2>
              <p className="text-stone-400 text-sm mt-1">This page is for someone special.</p>
            </div>
            <form onSubmit={handleName} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => { setNameInput(e.target.value); setNameError(false); }}
                  placeholder="Enter your name"
                  autoComplete="off"
                  className={`w-full border rounded-xl px-4 py-3 text-sm text-rose-950 placeholder-stone-400 outline-none focus:ring-2 transition ${
                    nameError ? "border-red-300 focus:ring-red-200" : "border-rose-200 focus:ring-rose-200"
                  }`}
                />
                {nameError && (
                  <p className="text-red-500 text-xs mt-1">You are not lucky 🙁</p>
                )}
              </div>
              <button type="submit" className="w-full bg-rose-400 hover:bg-rose-500 text-white rounded-xl py-3 text-sm font-medium transition-colors">
                Continue
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Passcode gate */}
        {step === "passcode-gate" && (
          <div className="bg-white border border-rose-100 rounded-2xl p-8 shadow-sm">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h2 className="text-rose-950 font-semibold text-lg">Enter your passcode</h2>
              <p className="text-stone-400 text-sm mt-1">One last step, Cody.</p>
            </div>
            <form onSubmit={handlePasscode} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passcodeInput}
                  onChange={(e) => { setPasscodeInput(e.target.value); setPasscodeError(false); }}
                  placeholder="Passcode"
                  autoComplete="off"
                  className={`w-full border rounded-xl px-4 py-3 text-sm text-rose-950 placeholder-stone-400 outline-none focus:ring-2 transition ${
                    passcodeError ? "border-red-300 focus:ring-red-200" : "border-rose-200 focus:ring-rose-200"
                  }`}
                />
                {passcodeError && (
                  <p className="text-red-500 text-xs mt-1">You are not Cody 🤨</p>
                )}
              </div>
              <button type="submit" className="w-full bg-rose-400 hover:bg-rose-500 text-white rounded-xl py-3 text-sm font-medium transition-colors">
                Continue
              </button>
            </form>
          </div>
        )}

        {/* Step: Booking form */}
        {(step === "form" || step === "submitting") && (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-rose-100 rounded-2xl p-8 shadow-sm space-y-6"
          >
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-rose-950 mb-1">
                  Your Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full border border-rose-200 rounded-xl px-4 py-2.5 text-sm text-rose-950 placeholder-stone-400 outline-none focus:ring-2 focus:ring-rose-200 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-rose-950 mb-1">
                  Email <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full border border-rose-200 rounded-xl px-4 py-2.5 text-sm text-rose-950 placeholder-stone-400 outline-none focus:ring-2 focus:ring-rose-200 transition"
                  required
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-medium text-rose-950 mb-1">
                Date <span className="text-rose-400">*</span>
                <span className="text-stone-400 font-normal ml-1">(weekdays only)</span>
              </label>
              <input
                type="date"
                value={date}
                min={getTomorrowDate()}
                onChange={(e) => {
                  setDate(e.target.value);
                  setTime("");
                }}
                className="w-full border border-rose-200 rounded-xl px-4 py-2.5 text-sm text-rose-950 outline-none focus:ring-2 focus:ring-rose-200 transition"
                required
              />
              {date && isWeekend(date) && (
                <p className="text-red-500 text-xs mt-1">Please pick a weekday (Mon–Fri).</p>
              )}
            </div>

            {/* Time slots */}
            {date && !isWeekend(date) && (
              <div>
                <label className="block text-xs font-medium text-rose-950 mb-2">
                  Time slot <span className="text-rose-400">*</span>
                  <span className="text-stone-400 font-normal ml-1">IST</span>
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`text-xs py-2 rounded-lg border transition-colors ${
                        time === slot
                          ? "bg-rose-400 border-rose-400 text-white"
                          : "border-rose-200 text-stone-600 hover:border-rose-400 hover:text-rose-500"
                      }`}
                    >
                      {formatTime(slot)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block text-xs font-medium text-rose-950 mb-1">
                What's on your mind?
                <span className="text-stone-400 font-normal ml-1">(optional)</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Brief topic or reason for the meeting…"
                rows={3}
                className="w-full border border-rose-200 rounded-xl px-4 py-2.5 text-sm text-rose-950 placeholder-stone-400 outline-none focus:ring-2 focus:ring-rose-200 transition resize-none"
              />
            </div>

            {formError && (
              <p className="text-red-500 text-sm">{formError}</p>
            )}

            <button
              type="submit"
              disabled={step === "submitting" || !time}
              className="w-full bg-rose-400 hover:bg-rose-500 disabled:bg-rose-200 disabled:cursor-not-allowed text-white rounded-xl py-3 text-sm font-medium transition-colors"
            >
              {step === "submitting" ? "Booking…" : "Confirm Booking"}
            </button>
          </form>
        )}

        {/* Step: Success */}
        {step === "success" && (
          <div className="bg-white border border-rose-100 rounded-2xl p-10 shadow-sm text-center">
            <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-rose-950 font-semibold text-lg mb-2">Meeting booked!</h2>
            <p className="text-stone-500 text-sm">
              Your slot on <strong>{date}</strong> at <strong>{formatTime(time)} IST</strong> has been added to Suraj's calendar.
              A confirmation will be sent to <strong>{email}</strong>.
            </p>
            <button
              onClick={() => {
                setStep("name-gate");
                setNameInput(""); setPasscodeInput("");
                setName(""); setEmail(""); setDate(""); setTime(""); setMessage("");
              }}
              className="mt-6 text-sm text-rose-400 hover:text-rose-500 underline underline-offset-2"
            >
              Book another meeting
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
