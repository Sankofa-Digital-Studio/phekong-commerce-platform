"use client";

import "./action-feedback.css";

export type FeedbackTone = "loading" | "success" | "error" | "blocked";

export interface FeedbackState {
  tone: FeedbackTone;
  message: string;
}

export function ActionFeedback({ state }: { state: FeedbackState | null }) {
  if (!state) {
    return null;
  }

  const role = state.tone === "error" || state.tone === "blocked" ? "alert" : "status";

  return (
    <div className={`action-feedback action-feedback--${state.tone}`} role={role} aria-live="polite">
      <span className="action-feedback__dot" aria-hidden="true" />
      <p>{state.message}</p>
    </div>
  );
}
