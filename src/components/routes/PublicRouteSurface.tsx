"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { ActionFeedback, type FeedbackState } from "@/components/ui/ActionFeedback";
import { Button, type ButtonVariant } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import "./public-route-surface.css";

type PublicRouteAction =
  | {
      kind: "link";
      label: string;
      href: string;
      variant?: ButtonVariant;
    }
  | {
      kind: "button";
      label: string;
      variant?: ButtonVariant;
      loadingLabel?: string;
      successMessage?: string;
      blockedMessage?: string;
      errorMessage?: string;
      disabled?: boolean;
      blocked?: boolean;
      onPress?: () => void | Promise<void>;
      busyMs?: number;
    };

export interface PublicRouteSurfaceProps {
  eyebrow: string;
  title: string;
  description: string;
  summary?: string;
  note?: string;
  tone?: "surface" | "accent";
  actions?: ReadonlyArray<PublicRouteAction>;
  children?: ReactNode;
}

function toButtonClassName(variant: ButtonVariant = "secondary") {
  return `phekong-button phekong-button-${variant} phekong-button-medium`;
}

export function PublicRouteSurface({
  eyebrow,
  title,
  description,
  summary,
  note,
  tone = "accent",
  actions = [],
  children,
}: PublicRouteSurfaceProps) {
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [busyLabel, setBusyLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setFeedback(null);
    }, feedback.tone === "loading" ? 1000 : 2600);

    return () => window.clearTimeout(timeout);
  }, [feedback]);

  async function runButtonAction(action: Extract<PublicRouteAction, { kind: "button" }>) {
    if (action.disabled) {
      setFeedback({
        tone: "blocked",
        message: action.blockedMessage ?? `${action.label} is currently disabled.`,
      });
      return;
    }

    if (action.blocked) {
      setFeedback({
        tone: "blocked",
        message: action.blockedMessage ?? `${action.label} is currently blocked.`,
      });
      return;
    }

    setBusyLabel(action.label);
    setFeedback({
      tone: "loading",
      message: action.loadingLabel ?? `Processing ${action.label.toLowerCase()}...`,
    });

    try {
      await new Promise<void>((resolve) => {
        window.setTimeout(() => resolve(), action.busyMs ?? 380);
      });

      await action.onPress?.();

      setFeedback({
        tone: "success",
        message: action.successMessage ?? `${action.label} completed successfully.`,
      });
    } catch {
      setFeedback({
        tone: "error",
        message: action.errorMessage ?? `${action.label} could not be completed right now.`,
      });
    } finally {
      setBusyLabel(null);
    }
  }

  return (
    <section className="public-route">
      <Card className="public-route__card" eyebrow={eyebrow} title={title} tone={tone}>
        <p className="public-route__lede">{description}</p>
        {summary ? <p className="public-route__summary">{summary}</p> : null}
        {note ? <p className="public-route__note">{note}</p> : null}

        {actions.length > 0 ? (
          <div className="public-route__actions" aria-label={`${title} actions`}>
            {actions.map((action) =>
              action.kind === "link" ? (
                <Link key={action.label} className={toButtonClassName(action.variant)} href={action.href}>
                  {action.label}
                </Link>
              ) : (
                <Button
                  key={action.label}
                  variant={action.variant}
                  type="button"
                  loading={busyLabel === action.label}
                  disabled={action.disabled}
                  onClick={() => void runButtonAction(action)}
                >
                  {action.label}
                </Button>
              ),
            )}
          </div>
        ) : null}

        <ActionFeedback state={feedback} />
      </Card>

      {children ? <div className="public-route__children">{children}</div> : null}
    </section>
  );
}
