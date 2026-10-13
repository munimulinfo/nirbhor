"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const LAUNCH_DATE = new Date("2026-12-15T00:00:00+06:00").getTime();

export default function Home() {
  const [email, setEmail] = useState("");
  const [remaining, setRemaining] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      setRemaining(Math.max(0, LAUNCH_DATE - Date.now()));
    };

    updateCountdown();

    const timer = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining / 3600000) % 24);
  const minutes = Math.floor((remaining / 60000) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  const countdown = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim()) return;

    // Connect your API or email marketing service here.
    setSubmitted(true);
  }

  return (
    <main className="hero">
      <div className="hero-bg" aria-hidden="true" />

      <header className="nav">
        <a href="#" className="logo" aria-label="Nirbhor Impex home">
          <svg
            width="40"
            height="30"
            viewBox="0 0 40 30"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0 4h8l16 14V4h6v22h-8L6 12v14H0z"
              fill="white"
            />
            <path
              d="M18 0h22v10C37 4 30 0 18 0z"
              fill="#d4170a"
            />
            <path d="M22 26c8 0 14-4 18-12v12z" fill="white" />
          </svg>

          <span className="logo-text">NIRBHOR IMPEX</span>
        </a>

        <a href="#waitlist" className="btn-red">
          Join the waitlist
          <ArrowRight size={20} />
        </a>
      </header>

      <section className="content">
        {/* <div className="badge">
          <span className="badge-icon">
            <Sparkles size={16} />
          </span>
          Early access starts here
        </div> */}

        <h1 className="title">
          Something Exciting Is
          <br className="desktop-break" />
          <span className="mobile-break"> </span>
          On Its Way
        </h1>

        <p className="subtitle">
          Nirbhor Impex is preparing something fresh, bold, and worth the wait.
        </p>

        <form
          id="waitlist"
          className="waitlist-form"
          onSubmit={handleSubmit}
        >
          <input
            className="form-input"
            type="email"
            placeholder="your@email.com"
            aria-label="Email address"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSubmitted(false);
            }}
          />

          <button className="form-button" type="submit">
            Get notified
          </button>
        </form>

        {submitted && (
          <p className="success-message" role="status">
            Thanks for your interest! Email collection needs an API connection
            before your signup can be saved.
          </p>
        )}

        <div className="proof">
          <div className="avatars" aria-hidden="true">
            <span className="avatar avatar-one" />
            <span className="avatar avatar-two" />
            <span className="avatar avatar-three" />
          </div>

          <span>Be among the first to discover what&apos;s next.</span>
        </div>

        <div
          className="countdown"
          aria-label={`Time remaining: ${days} days, ${hours} hours, ${minutes} minutes`}
        >
          {countdown.map((item, index) => (
            <div className="countdown-part" key={item.label}>
              <div className="countdown-item">
                <span className="countdown-number">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="countdown-label">{item.label}</span>
              </div>

              {index < countdown.length - 1 && (
                <span className="countdown-separator">:</span>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}